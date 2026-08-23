import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const staticRoot = path.join(currentDirectory, "out");
const port = Number(process.env.PORT || 8080);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"]
]);

function safePathname(rawUrl) {
  try {
    const pathname = decodeURIComponent(new URL(rawUrl, "http://localhost").pathname);
    const normalized = path.posix.normalize(pathname);
    if (normalized.includes("..") || normalized.includes("\0")) {
      return null;
    }
    return normalized;
  } catch {
    return null;
  }
}

async function existingFile(candidates) {
  for (const candidate of candidates) {
    const absolutePath = path.join(staticRoot, candidate);
    if (!absolutePath.startsWith(staticRoot)) {
      continue;
    }

    try {
      const fileStat = await stat(absolutePath);
      if (fileStat.isFile()) {
        return absolutePath;
      }
    } catch {
      // Try the next static-export candidate.
    }
  }

  return null;
}

function candidatesFor(pathname) {
  const clean = pathname.replace(/^\/+/, "");
  if (!clean) {
    return ["index.html"];
  }
  if (pathname.endsWith("/")) {
    return [path.join(clean, "index.html")];
  }
  return [clean, path.join(clean, "index.html"), `${clean}.html`];
}

function cacheControl(filePath) {
  if (filePath.includes(`${path.sep}_next${path.sep}static${path.sep}`)) {
    return "public, max-age=31536000, immutable";
  }
  if (path.extname(filePath) === ".html") {
    return "no-cache";
  }
  return "public, max-age=3600";
}

function sendFile(request, response, filePath, statusCode = 200) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", contentTypes.get(path.extname(filePath)) || "application/octet-stream");
  response.setHeader("Cache-Control", cacheControl(filePath));
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method Not Allowed");
    return;
  }

  const pathname = safePathname(request.url || "/");
  if (!pathname) {
    response.writeHead(400);
    response.end("Bad Request");
    return;
  }

  const filePath = await existingFile(candidatesFor(pathname));
  if (filePath) {
    sendFile(request, response, filePath);
    return;
  }

  const notFoundPath = await existingFile(["404.html"]);
  if (notFoundPath) {
    sendFile(request, response, notFoundPath, 404);
    return;
  }

  response.writeHead(404);
  response.end("Not Found");
});

server.listen(port, "0.0.0.0", () => {
  process.stdout.write(`Static blog available on port ${port}\n`);
});
