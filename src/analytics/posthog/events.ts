import posthog from 'posthog-js';

import type { PostHogEvent, PostHogEventProps } from './types';

type PropsFor<E extends PostHogEvent> = PostHogEventProps[E];

export function capture<E extends PostHogEvent>(
	event: E,
	...args: PropsFor<E> extends never ? [] : [props: PropsFor<E>]
): void {
	const props = args[0] as PropsFor<E> | undefined;
	posthog.capture(event, props);
}
