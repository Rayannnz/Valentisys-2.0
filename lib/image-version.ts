import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/* `/images/x.jpg` -> `/images/x.jpg?v=<hash of the file>`. A replaced photo gets a new URL, so
   neither the image optimizer's cache nor a browser or CDN can keep serving the old one.
   Server components only: it reads from disk. */
export function img(path: string): string {
  const hash = createHash("md5").update(readFileSync(join(process.cwd(), "public", path))).digest("hex").slice(0, 8);
  return `${path}?v=${hash}`;
}
