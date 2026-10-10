/**
 * Prefixes a /public asset path with the build's basePath.
 *
 * Next rewrites its own bundle URLs for a basePath, but a plain <img src> and
 * next/image in `unoptimized` mode both pass the path through untouched. This
 * keeps /public references correct in every build mode. Empty in a normal
 * deploy, so it costs nothing there.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
