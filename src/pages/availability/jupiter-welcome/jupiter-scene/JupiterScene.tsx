import { Suspense, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

import { SceneContainer } from './JupiterScene.styles';

const BLINK_DURATION = 120; // ms — how long the blink takes

const blink = (splineApp: Application) => {
	const eyeL = splineApp.findObjectByName('EyeL');
	const eyeR = splineApp.findObjectByName('EyeR');
	if (!eyeL || !eyeR) return;

	const close = () => {
		eyeL.scale.y = 0.1;
		eyeR.scale.y = 0.1;
	};
	const open = () => {
		eyeL.scale.y = 1;
		eyeR.scale.y = 1;
	};

	close();
	setTimeout(open, BLINK_DURATION);
};

const scheduleNextBlink = (splineApp: Application): ReturnType<typeof setTimeout> => {
	// Random interval between 2s and 5s
	const delay = 2000 + Math.random() * 3000;
	return setTimeout(() => {
		blink(splineApp);
		scheduleNextBlink(splineApp);
	}, delay);
};

export const JupiterScene = () => {
	const splineRef = useRef<Application | null>(null);
	const animFrameRef = useRef<number>(0);
	const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const targetRotation = useRef({ x: 0, y: 0 });
	const currentRotation = useRef({ x: 0, y: 0 });
	const eyeOrigin = useRef<{ lx: number; ly: number; rx: number; ry: number } | null>(null);

	const onLoad = (splineApp: Application) => {
		splineRef.current = splineApp;
		blinkTimerRef.current = scheduleNextBlink(splineApp);

		const eyeL = splineApp.findObjectByName('EyeL');
		const eyeR = splineApp.findObjectByName('EyeR');
		if (eyeL && eyeR) {
			eyeOrigin.current = {
				lx: eyeL.position.x,
				ly: eyeL.position.y,
				rx: eyeR.position.x,
				ry: eyeR.position.y,
			};
		}
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const { innerWidth, innerHeight } = window;
			targetRotation.current = {
				x: ((e.clientY / innerHeight) - 0.5) * 0.6,
				y: ((e.clientX / innerWidth) - 0.5) * 0.6,
			};
		};

		const animate = () => {
			if (splineRef.current) {
				currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
				currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

				const head = splineRef.current.findObjectByName('Group');
				if (head) {
					head.rotation.x = currentRotation.current.x;
					head.rotation.y = currentRotation.current.y;
				}

				if (eyeOrigin.current) {
					const eyeL = splineRef.current.findObjectByName('EyeL');
					const eyeR = splineRef.current.findObjectByName('EyeR');
					// Move eyes slightly toward cursor (max 4 units)
					const offsetX = currentRotation.current.y * 8;
					const offsetY = -currentRotation.current.x * 8;
					if (eyeL) {
						eyeL.position.x = eyeOrigin.current.lx + offsetX;
						eyeL.position.y = eyeOrigin.current.ly + offsetY;
					}
					if (eyeR) {
						eyeR.position.x = eyeOrigin.current.rx + offsetX;
						eyeR.position.y = eyeOrigin.current.ry + offsetY;
					}
				}
			}
			animFrameRef.current = requestAnimationFrame(animate);
		};

		window.addEventListener('mousemove', handleMouseMove);
		animFrameRef.current = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(animFrameRef.current);
			if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
		};
	}, []);

	return (
		<SceneContainer>
			<Suspense fallback={null}>
				<Spline
					scene='https://prod.spline.design/lEJJWzHhKj7t3vE4/scene.splinecode'
					onLoad={onLoad}
				/>
			</Suspense>
		</SceneContainer>
	);
};

export default JupiterScene;
