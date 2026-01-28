const CDN_BASE_URL = import.meta.env.VITE_ASSETS_CDN_URL as string | undefined;

export const toCdnUrl = (keyOrUrl?: string | null): string | undefined => {
	if (!keyOrUrl) return undefined;

	if (keyOrUrl.startsWith('http://') || keyOrUrl.startsWith('https://')) {
		return keyOrUrl;
	}

	if (!CDN_BASE_URL) return undefined;
	return `${CDN_BASE_URL.replace(/\/$/, '')}/${keyOrUrl.replace(/^\//, '')}`;
};
