"use client";

import { useState } from "react";

export function CopyHelpMessage({ message }: { message: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className="copy-action">
      <button type="button" onClick={copyMessage}>
        {status === "copied" ? "已经复制" : "复制这段话"}
      </button>
      <span aria-live="polite">
        {status === "failed" ? "复制失败，请长按上方文字复制。" : ""}
      </span>
    </div>
  );
}
