import type { To } from 'react-router-dom';

export type INavigateLinkProps =
	| {
			isBack: true;
			nextPage?: null;
			to: To;
	  }
	| {
			isBack: false;
			nextPage: string;
			to?: null;
	  };
