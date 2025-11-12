export const addSuffixToImage = (imagePath: string, suffix: string) => {
    const lastDotIndex = imagePath.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return imagePath + suffix;
    }
    return imagePath.substring(0, lastDotIndex) + suffix + imagePath.substring(lastDotIndex);
};

// Prefix a public asset path with the correct base URL at runtime (works under subpaths)
export const withBase = (p: string): string => {
    if (!p) return p;
    // Skip absolute URLs and data URLs
    if (/^(https?:)?\/\//i.test(p) || p.startsWith('data:')) return p;
    const base = (import.meta as ImportMeta).env?.BASE_URL ?? '/';
    const normBase = base.endsWith('/') ? base : base + '/';
    // If already prefixed with base, return as-is
    if (p.startsWith(normBase)) return p;
    // If it starts with a leading slash, join to base without duplicating
    if (p.startsWith('/')) return normBase + p.slice(1);
    // Otherwise, just prefix
    return normBase + p;
};

// Build an image URL, optionally appending a suffix before the extension, and prefix with base
export const buildImageUrl = (imagePath: string, suffix?: string): string => {
    const path = suffix ? addSuffixToImage(imagePath, suffix) : imagePath;
    return withBase(path);
};