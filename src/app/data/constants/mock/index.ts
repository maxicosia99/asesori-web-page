import { Benefit, Item, Option, Ranking, Service } from '@data/interfaces';

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
    image:
      '/assets/images/financial-entities/cooperativa-jardinAzuayo-188x100.png',
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
    description:
      'Deja atrás lo lento y tedioso que resulta el trámite para poder contar con tu tarjeta de crédito.',
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
    description:
      'Una vez que nos envíes tus datos nosotros te avisaremos cuando exista una tasa menor de interés',
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
    description:
      'Actuamos de forma independiente al no ser una entidad financiera, ofreciéndote información gratuita.',
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
