import { useEffect, useState } from 'react';

export const useCanHover = (): boolean => {
	const [value, setValue] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
		const update = () => setValue(mq.matches);

		update();
		mq.addEventListener('change', update);

		return () => mq.removeEventListener('change', update);
	}, []);

	return value;
};
