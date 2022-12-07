import { Benefit, Ranking, Service } from '@data/interfaces';

export const STEPS_DATA_ITEMS: string[] = [
  'Selecciona el crédito al que deseas aplicar',
  'Ingresa el monto, entrada y plazo',
  'Ingresa tus datos para una solicitud',
  'Presentar las mejores opciones de crédito',
];

export const RANKING_DATA_ITEMS: Ranking[] = [
  {
    image: '/assets/images/financial-entities/banco-guayaquil-188x100.png',
    interestRate: 9.81,
    approvalTime: 72,
    procedures: 'corto',
    rating: 99,
    entity: 'Banco Guayaquil',
  },
  {
    image: '/assets/images/financial-entities/banco-pichincha-188x100.png',
    interestRate: 8.65,
    approvalTime: 52,
    procedures: 'extenso',
    rating: 85,
    entity: 'Banco Pichincha',
  },
  {
    image: '/assets/images/financial-entities/banco-austro-188x100.png',
    interestRate: 12.81,
    approvalTime: 100,
    procedures: 'normal',
    rating: 75,
    entity: 'Banco del Austro',
  },
  {
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
    title: 'Múltiples opciones de créditos',
    description:
      'Tu solicitud será revisada por las insituciones Financieras, y Asesori te mostrará cual es la mejor para ti.',
  },
  {
    title: 'Transparencia con tus créditos',
    description:
      'Asesori es transparente, no te cobramos por nuestro servicio, nosotros queremos que siempre obtengas la mejor tasa de interés.',
  },
  {
    title: 'Rapidez de respuesta',
    description:
      'Cuando dejes tu solicitud en línea, aproximadamente tendrás un tiempo de respuesta de unas 48horas, luego nosotros te enviaremos un email con las diferentes opciones de insituciones financieras a las que ya puedes aplicar.',
  },
  {
    title: 'Reduce el tiempo',
    description:
      'Una vez que nos envíes tus datos nosotros te avisaremos cuando exista una tasa menor de interés',
  },
  {
    title: 'Ahorra dinero',
    description:
      'Comparamos el costo de un crédito, sus plazos y requisitos adicionales. Por lo que podrás elegir el préstamo.',
  },
  {
    title: 'Transparencia',
    description:
      'Actuamos de forma independiente al no ser una entidad financiera, ofreciéndote información gratuita.',
  },
];
