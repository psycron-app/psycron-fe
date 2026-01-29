export const getPathError = (
	errors: unknown,
	path: string
): { message?: unknown } | null => {
	if (!errors) return null;
	const parts = path.split('.');
	let cur: unknown = errors;

	for (const key of parts) {
		if (typeof cur !== 'object' || cur === null) return null;
		cur = (cur as Record<string, unknown>)[key];
	}

	if (typeof cur === 'object' && cur !== null)
		return cur as { message?: unknown };
	return null;
};
