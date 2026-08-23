#!/bin/sh

set -eu

script_directory=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
project_directory=$(dirname -- "$script_directory")
release_directory="$project_directory/dist"
staging_directory=$(mktemp -d "$project_directory/.dist-export.XXXXXX")
backup_directory=""

cleanup() {
  if [ -n "$staging_directory" ] && [ -d "$staging_directory" ]; then
    rm -rf -- "$staging_directory"
  fi
  if [ -n "$backup_directory" ] && [ -d "$backup_directory" ]; then
    if [ ! -e "$release_directory" ]; then
      mv "$backup_directory" "$release_directory"
    else
      rm -rf -- "$backup_directory"
    fi
  fi
}

trap cleanup EXIT HUP INT TERM

cd "$project_directory"

docker compose up --build -d

container_id=$(docker compose ps -q web)
if [ -z "$container_id" ]; then
  printf '%s\n' "构建完成后仍未找到 web 容器。" >&2
  exit 1
fi

container_running=$(docker inspect --format '{{.State.Running}}' "$container_id")
if [ "$container_running" != "true" ]; then
  printf '%s\n' "构建完成后 web 容器没有运行。" >&2
  exit 1
fi

health_attempt=0
container_health=$(docker inspect --format '{{.State.Health.Status}}' "$container_id")
while [ "$container_health" = "starting" ] && [ "$health_attempt" -lt 30 ]; do
  sleep 1
  health_attempt=$((health_attempt + 1))
  container_health=$(docker inspect --format '{{.State.Health.Status}}' "$container_id")
done

if [ "$container_health" != "healthy" ]; then
  printf '%s\n' "web 容器健康检查未通过：$container_health" >&2
  exit 1
fi

docker compose cp web:/app/out/. "$staging_directory/"

if [ ! -f "$staging_directory/index.html" ]; then
  printf '%s\n' "导出失败：静态产物中没有 index.html。" >&2
  exit 1
fi

if [ ! -f "$staging_directory/CNAME" ] || [ "$(tr -d '\r\n' < "$staging_directory/CNAME")" != "blog.deesuu.com" ]; then
  printf '%s\n' "导出失败：CNAME 缺失或内容不是 blog.deesuu.com。" >&2
  exit 1
fi

if [ ! -f "$staging_directory/.nojekyll" ]; then
  printf '%s\n' "导出失败：静态产物中没有 .nojekyll。" >&2
  exit 1
fi

if [ ! -f "$staging_directory/robots.txt" ] || ! cmp -s "$project_directory/public/robots.txt" "$staging_directory/robots.txt"; then
  printf '%s\n' "导出失败：robots.txt 缺失或与 public/robots.txt 不一致。" >&2
  exit 1
fi

if [ ! -f "$staging_directory/LICENSE" ] || ! cmp -s "$project_directory/LICENSE" "$staging_directory/LICENSE"; then
  printf '%s\n' "导出失败：MIT LICENSE 缺失或与仓库根目录的 LICENSE 不一致。" >&2
  exit 1
fi

if [ -L "$release_directory" ]; then
  printf '%s\n' "导出失败：dist 不能是符号链接。" >&2
  exit 1
fi

if [ -e "$release_directory" ]; then
  backup_directory=$(mktemp -d "$project_directory/.dist-backup.XXXXXX")
  rmdir "$backup_directory"
  mv "$release_directory" "$backup_directory"
fi

if ! mv "$staging_directory" "$release_directory"; then
  if [ -n "$backup_directory" ] && [ -d "$backup_directory" ]; then
    mv "$backup_directory" "$release_directory"
    backup_directory=""
  fi
  exit 1
fi

staging_directory=""

if [ -n "$backup_directory" ] && [ -d "$backup_directory" ]; then
  rm -rf -- "$backup_directory"
  backup_directory=""
fi

printf '%s\n' "静态文件已导出到：$release_directory"
