import { Benefit, Credit, Item, Option, Ranking, SelectOption, Service } from '@data/interfaces';

export const STEPS_DATA_ITEMS: string[] = [
	'Selecciona el crédito al que deseas aplicar',
	'Ingresa el monto, entrada y plazo',
	'Ingresa tus datos para una solicitud',
	'Presentar las mejores opciones de crédito',
];

export const RANKING_DATA_ITEMS: Ranking[] = [
	{
		id: 1,
		image: '/assets/images/financial-entities/banco-guayaquil-188x100.png',
		interestRate: 9.81,
		approvalTime: 72,
		procedures: 'corto',
		rating: 99,
		entity: 'Banco Guayaquil',
	},
	{
		id: 2,
		image: '/assets/images/financial-entities/banco-pichincha-188x100.png',
		interestRate: 8.65,
		approvalTime: 52,
		procedures: 'extenso',
		rating: 85,
		entity: 'Banco Pichincha',
	},
	{
		id: 3,
		image: '/assets/images/financial-entities/banco-austro-188x100.png',
		interestRate: 12.81,
		approvalTime: 100,
		procedures: 'normal',
		rating: 75,
		entity: 'Banco del Austro',
	},
	{
		id: 4,
		image: '/assets/images/financial-entities/cooperativa-jardinAzuayo-188x100.png',
		interestRate: 10.81,
		approvalTime: 70,
		procedures: 'corto',
		rating: 45,
		entity: 'Coop. Jardin Azuayo',
	},
];

export const SERVICES_DATA_ITEMS: Service[] = [
	{
		id: 'credits',
		title: 'créditos',
		description:
			'Obtén el crédito que necesitas en donde tu eligas de manera más rápida y ágil, asegurando confianza y confiabilidad.',
		image: '/assets/images/services/14910@3x.png',
	},
	{
		id: 'credits-card',
		title: 'tarjetas de crédito',
		description: 'Deja atrás lo lento y tedioso que resulta el trámite para poder contar con tu tarjeta de crédito.',
		image: '/assets/images/services/3108488@3x.png',
	},
	{
		id: 'investment',
		title: 'inversiones',
		description:
			'Sabias que puedes obtener dinero al acumular tus ahorros a plazo fijo, obtén información de las tasas más seguras y efectivas para ti.',
		image: '/assets/images/services/2906247@3x.png',
	},
];

export const BENEFITS_DATA_ITEMS: Benefit[] = [
	{
		id: 1,
		title: 'Múltiples opciones de créditos',
		description:
			'Tu solicitud será revisada por las insituciones Financieras, y Asesori te mostrará cual es la mejor para ti.',
	},
	{
		id: 2,
		title: 'Transparencia con tus créditos',
		description:
			'Asesori es transparente, no te cobramos por nuestro servicio, nosotros queremos que siempre obtengas la mejor tasa de interés.',
	},
	{
		id: 3,
		title: 'Rapidez de respuesta',
		description:
			'Cuando dejes tu solicitud en línea, aproximadamente tendrás un tiempo de respuesta de unas 48horas, luego nosotros te enviaremos un email con las diferentes opciones de insituciones financieras a las que ya puedes aplicar.',
	},
	{
		id: 4,
		title: 'Reduce el tiempo',
		description: 'Una vez que nos envíes tus datos nosotros te avisaremos cuando exista una tasa menor de interés',
	},
	{
		id: 5,
		title: 'Ahorra dinero',
		description:
			'Comparamos el costo de un crédito, sus plazos y requisitos adicionales. Por lo que podrás elegir el préstamo.',
	},
	{
		id: 6,
		title: 'Transparencia',
		description: 'Actuamos de forma independiente al no ser una entidad financiera, ofreciéndote información gratuita.',
	},
];

export const OPTIONS_DATA_ITEMS: Option[] = [
	{
		id: 'credit',
		name: 'Crédito',
		icon: '/assets/images/iconos/money.png',
	},
	{
		id: 'insurance',
		name: 'Seguros',
		icon: '/assets/images/iconos/family.png',
	},
	{
		id: 'card',
		name: 'Tarjetas de crédito',
		icon: '/assets/images/iconos/credit-card.png',
	},
	{
		id: 'investment',
		name: 'Inversiones',
		icon: '/assets/images/iconos/graph.png',
	},
];

export const CREDITS_DATA_ITEMS: Item[] = [
	{ id: 11, name: 'Inmobiliario', description: 'Para tu casa' },
	{ id: 9, name: 'Viaje', description: 'Para el viaje de tu sueños' },
	{ id: 9, name: 'Vehicular', description: 'Para el auto nuevo que quieres' },
	{ id: 9, name: 'Deudas', description: 'Para consolidar las deudas' },
	{
		id: 9,
		name: 'Arreglos del hogar',
		description: 'Para hacer arreglos en tu casa o local comercial',
	},
	{ id: 10, name: 'Curso o postgrado', description: 'Créditos de estudio' },
	{ id: 9, name: 'Préstamo rápido', description: 'Cualquier necesitad' },
	{ id: 9, name: 'Urgencias', description: 'Crédito por emergencias' },
];

export const INSURANCE_DATA_ITEMS: Item[] = [
	{ id: 1, name: 'Vehicular', description: 'Para tu auto público o privado' },
];

export const FILTER_DATA_ITEMS: SelectOption[] = [
	{ id: 1, name: 'Todos' },
	{ id: 2, name: 'Bancos' },
	{ id: 3, name: 'Cooperativas' },
];

export const ORDER_DATA_ITEMS: SelectOption[] = [
	{ id: 1, name: 'Calificación' },
	{ id: 2, name: 'tasa' },
];

export const CREDIT_DATA_ITEMS: Credit[] = [
	{
		id: 4,
		loanRate: 8.65,
		financing: 100.0,
		loanAmount: 40000,
		bankBorrow: 40000.0,
		userInitialAmount: 2000,
		borrowedAmount: 40000.0,
		initialAmountNeeded: 0.0,
		monthlyPayment: 447.36369616528367,
		numericalTerm: 12,
		textTerm: 'años',
		financialentityId: 5,
		financialentityName: 'BIESS',
		financialentityType: 1,
		photoUrl: 'assets/images/credit/banco-biess.png',
		info: 'Necesitas 40,000 $. BIESS te puede prestar 40,000 $. Tu entrada de 2,000 $ te permite completar tu crédito y solo te será necesario pedir al banco 38,000 $ para completar la cantidad que necesitas',
		paymentTermination: '2033-05-01T21:22:11.651+0000',
		priority: 2,
	},
	{
		id: 9,
		loanRate: 10.5,
		financing: 100.0,
		loanAmount: 40000,
		bankBorrow: 40000.0,
		userInitialAmount: 2000,
		borrowedAmount: 40000.0,
		initialAmountNeeded: 0.0,
		monthlyPayment: 489.65627373492975,
		numericalTerm: 12,
		textTerm: 'años',
		financialentityId: 2,
		financialentityName: 'Cooperativa de Ahorro y Crédito JEP',
		financialentityType: 2,
		photoUrl: 'assets/images/credit/cooperativa-jep.png',
		info: 'Necesitas 40,000 $. Cooperativa de Ahorro y Crédito JEP te puede prestar 40,000 $. Tu entrada de 2,000 $ te permite completar tu crédito y solo te será necesario pedir al banco 38,000 $ para completar la cantidad que necesitas',
		paymentTermination: '2033-05-01T21:22:11.676+0000',
		priority: 8,
	},
	{
		id: 2,
		loanRate: 8.95,
		financing: 70.0,
		loanAmount: 40000,
		bankBorrow: 28000.0,
		userInitialAmount: 2000,
		borrowedAmount: 28000.0,
		initialAmountNeeded: 10000.0,
		monthlyPayment: 317.8606397284537,
		numericalTerm: 12,
		textTerm: 'años',
		financialentityId: 3,
		financialentityName: 'Banco Pichincha',
		financialentityType: 1,
		photoUrl: 'assets/images/credit/banco-pichincha.png',
		info: 'Necesitas 40,000 $. Banco Pichincha te puede prestar 28,000 $. Necesitaras una entrada de 10,000 $ además de los 2,000 $ que tienes para completar la cantidad que necesitas',
		paymentTermination: '2033-05-01T21:22:11.640+0000',
		priority: 11,
	},
	{
		id: 6,
		loanRate: 10.78,
		financing: 70.0,
		loanAmount: 40000,
		bankBorrow: 28000.0,
		userInitialAmount: 2000,
		borrowedAmount: 28000.0,
		initialAmountNeeded: 10000.0,
		monthlyPayment: 347.3595443784965,
		numericalTerm: 12,
		textTerm: 'años',
		financialentityId: 7,
		financialentityName: 'Banco del Austro',
		financialentityType: 1,
		photoUrl: 'assets/images/credit/banco-austro.png',
		info: 'Necesitas 40,000 $. Banco del Austro te puede prestar 28,000 $. Necesitaras una entrada de 10,000 $ además de los 2,000 $ que tienes para completar la cantidad que necesitas',
		paymentTermination: '2033-05-01T21:22:11.661+0000',
		priority: 1,
	},
	{
		id: 7,
		loanRate: 10.78,
		financing: 70.0,
		loanAmount: 40000,
		bankBorrow: 28000.0,
		userInitialAmount: 2000,
		borrowedAmount: 28000.0,
		initialAmountNeeded: 10000.0,
		monthlyPayment: 347.3595443784965,
		numericalTerm: 12,
		textTerm: 'años',
		financialentityId: 11,
		financialentityName: 'Banco General Rumiñahui',
		financialentityType: 1,
		photoUrl: 'assets/images/credit/banco-rumiñahui.png',
		info: 'Necesitas 40,000 $. Banco General Rumiñahui te puede prestar 28,000 $. Necesitaras una entrada de 10,000 $ además de los 2,000 $ que tienes para completar la cantidad que necesitas',
		paymentTermination: '2033-05-01T21:22:11.666+0000',
		priority: 6,
	},
	{
		id: 1,
		loanRate: 8.5,
		financing: 80.0,
		loanAmount: 40000,
		bankBorrow: 32000.0,
		userInitialAmount: 2000,
		borrowedAmount: 32000.0,
		initialAmountNeeded: 6000.0,
		monthlyPayment: 355.2177805806431,
		numericalTerm: 12,
		textTerm: 'años',
		financialentityId: 1,
		financialentityName: 'Banco del Pacífico',
		financialentityType: 1,
		photoUrl: 'assets/images/credit/banco-pacifico.png',
		info: 'Necesitas 40,000 $. Banco del Pacífico te puede prestar 32,000 $. Necesitaras una entrada de 6,000 $ además de los 2,000 $ que tienes para completar la cantidad que necesitas',
		paymentTermination: '2033-05-01T21:22:11.635+0000',
		priority: 10,
	},
	{
		id: 5,
		loanRate: 10.78,
		financing: 75.0,
		loanAmount: 40000,
		bankBorrow: 30000.0,
		userInitialAmount: 2000,
		borrowedAmount: 30000.0,
		initialAmountNeeded: 8000.0,
		monthlyPayment: 372.170940405532,
		numericalTerm: 12,
		textTerm: 'años',
		financialentityId: 6,
		financialentityName: 'Produbanco',
		financialentityType: 1,
		photoUrl: 'assets/images/credit/banco-produbanco.png',
		info: 'Necesitas 40,000 $. Produbanco te puede prestar 30,000 $. Necesitaras una entrada de 8,000 $ además de los 2,000 $ que tienes para completar la cantidad que necesitas',
		paymentTermination: '2033-05-01T21:22:11.656+0000',
		priority: 12,
	},
];
