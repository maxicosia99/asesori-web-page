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

export interface Credit {
	id: number;
	loanRate: number;
	financing: number;
	loanAmount: number;
	bankBorrow: number;
	userInitialAmount: number;
	borrowedAmount: number;
	initialAmountNeeded: number;
	monthlyPayment: number;
	numericalTerm: number;
	textTerm: string;
	financialentityId: number;
	financialentityName: string;
	financialentityType: number;
	photoUrl: string;
	info: string;
	paymentTermination: string;
	priority: number;
}
