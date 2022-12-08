export interface Ranking {
	id: number;
	image: string;
	interestRate: number;
	approvalTime: number;
	procedures: string;
	rating: number;
	entity: string;
}

export interface Service {
	id: string;
	title: string;
	description: string;
	image: string;
}

export interface Benefit {
	id: number;
	title: string;
	description: string;
}

export interface Option {
	id: string;
	name: string;
	icon: string;
}

export interface Item {
	id: number;
	name: string;
	description: string;
}

export interface SelectOption {
	id: number;
	name: string;
}
