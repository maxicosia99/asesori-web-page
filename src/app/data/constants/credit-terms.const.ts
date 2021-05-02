import { ICreditTerms } from "../interfaces/icredit.metadata";

export const CREDIT_TERMS_DATA_ITEMS: ICreditTerms[] = [
    {   
        "id": 10,
        "credit_name": "Educativo",
        "url_photo": "assets/img/services/credito-educacion.jpg",
        "beneficiaries": [
            "Personas Naturales.",
            "Personas Jurídicas."
        ],
        "destination": [
            "Formación y capacitación profesional o técnica propia.",
            "Formación y capacitación profesional o técnica de su talento humano."
        ],
        "terms": [
            "INCLUYE: consumos y saldos con tarjetas de crédito en los establecimientos educativos."
        ]
    },
    {
        "id": 9,
        "credit_name": "Consumo Prioritario",
        "url_photo": "assets/img/services/credito-consumo-prioritario.jpg",
        "beneficiaries": [
            "Personas Naturales."
        ],
        "destination": [
            "Compra de bienes, servicios o gastos no relacionados con una actividad productiva"
        ],
        "terms": [
            "INCLUYE: créditos prendarios de joyas y consumos en establecimientos médicos cuyo saldo adeudado sea superior a USD 5.000.00 .",
            "INCLUYE: anticios de efectivo y consumos con tarjetas de crédito (coporativas y de personas naturales) cuyo saldo adeudado sea inferior a USD 5.000.00.",
            "EXCEPCIONES: créditos efectuados en establecimientos educativos."
        ]
    },
    {
        "id":11,
        "credit_name": "Inmobiliario",
        "url_photo": "assets/img/services/credito-inmobiliario.jpg",
        "beneficiaries": [
            "Personas Naturales."
        ],
        "destination": [
            "Adquirir bienes inmuebles.",
            "Construcción de vivienda propia.",
            "Construcción, reparación, remodelación y mejora de inmuebles propios."
        ],
        "terms": [
            "Se otorga con garantía hipotecaria."
        ]
    }
]