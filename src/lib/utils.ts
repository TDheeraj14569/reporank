/* eslint-disable */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function formatTimeMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function getLanguageFromFilename(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    java: "java",
    py: "python",
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    go: "go",
    cpp: "cpp",
    hpp: "cpp",
    c: "cpp",
    h: "cpp",
    sql: "sql",
    json: "json",
    xml: "xml",
    yaml: "yaml",
    yml: "yaml",
    md: "markdown",
    html: "html",
    css: "css",
    sh: "shell",
    bash: "shell",
    dockerfile: "dockerfile",
    properties: "properties",
    gradle: "groovy",
    toml: "toml",
    rs: "rust",
    rb: "ruby",
    txt: "plaintext",
  };
  return map[ext || ""] || "plaintext";
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "easy":
      return "text-green-500 bg-green-500/10 border-green-500/20";
    case "medium":
      return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    case "hard":
      return "text-orange-500 bg-orange-500/10 border-orange-500/20";
    case "expert":
      return "text-red-500 bg-red-500/10 border-red-500/20";
    default:
      return "text-muted-foreground bg-muted";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "solved":
      return "text-green-500";
    case "attempted":
    case "in-progress":
      return "text-yellow-500";
    case "failed":
      return "text-red-500";
    default:
      return "text-muted-foreground";
  }
}

export function getStatusIcon(status: string): string {
  switch (status) {
    case "solved":
      return "✓";
    case "attempted":
    case "in-progress":
      return "●";
    case "failed":
      return "✗";
    case "bookmarked":
      return "★";
    default:
      return "○";
  }
}
