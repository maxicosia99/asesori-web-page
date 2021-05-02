import { ICreditAplication, IEntity } from "../interfaces/icredit-application.metadata";

export const CREDITAPLICATIONS_DATA_ITEMS: ICreditAplication[] = [
    {
        "creditapplication_id": 7,
        "credittype_name": "Inmobiliario",
        "application_date": "2020-09-15T16:48:57.443Z",
        "amount_required": 41386,
        "request_city": "Cuenca",
        "term": 122,
        "formatted_term": "10 años y 2 meses.",
        "time_elapsed": "hace 8 meses.",
        "credit_destination": "Para tu casa",
        "url_credittype_photo": "assets/img/services/credito-inmobiliario.jpg"
    },
    {
        "creditapplication_id": 5,
        "credittype_name": "Inmobiliario",
        "application_date": "2020-09-15T16:19:28.609Z",
        "amount_required": 52599,
        "request_city": "Biblián",
        "term": 100,
        "formatted_term": "8 años y 4 meses.",
        "time_elapsed": "hace 8 meses.",
        "credit_destination": "Para tu casa",
        "url_credittype_photo": "assets/img/services/credito-inmobiliario.jpg"
    },
    {
        "creditapplication_id": 4,
        "credittype_name": "Inmobiliario",
        "application_date": "2020-09-15T16:19:08.340Z",
        "amount_required": 52599,
        "request_city": "Biblián",
        "term": 100,
        "formatted_term": "8 años y 4 meses.",
        "time_elapsed": "hace 8 meses.",
        "credit_destination": "Para tu casa",
        "url_credittype_photo": "assets/img/services/credito-inmobiliario.jpg"
    },
];


export const CREDIT_APLICATIONS_ENTITIES_DATA_ITEMS: IEntity[] = [
    {
        "financialEntity_id": 2,
        "financialEntity_name": "Cooperativa de Ahorro y Crédito JEP",
        "steps_number": 0,
        "substeps_number": 0,
        "substeps_checked_number": 0,
        "url_financialEntity_photo": "assets/img/credit/cooperativa-jep.png",
        "info": "No necesitarás una entrada para acceder a este crédito"
    },
    {
        "financialEntity_id": 3,
        "financialEntity_name": "Banco Pichincha",
        "steps_number": 0,
        "substeps_number": 0,
        "substeps_checked_number": 0,
        "url_financialEntity_photo": "assets/img/credit/banco-pichincha.png",
        "info": "Necesitas 41,386 $. Banco Pichincha te puede prestar 28,970.2 $. Necesitaras una entrada de 12,415.8 $ para completar la cantidad que necesitas"
    },
    {
        "financialEntity_id": 4,
        "financialEntity_name": "Banco Guayaquil",
        "steps_number": 0,
        "substeps_number": 0,
        "substeps_checked_number": 0,
        "url_financialEntity_photo": "assets/img/credit/banco-guayaquil.png",
        "info": "Necesitas 41,386 $. Banco Guayaquil te puede prestar 33,108.8 $. Necesitaras una entrada de 8,277.2 $ para completar la cantidad que necesitas"
    },
];