import { Creditos } from './creditos';

export interface CreditInformation {
    user_id: number;
    name: string;
    last_name: string;
    cedula: string;
    phone: string;
    email: string;
    address: string;
    amount_required: number;
    monthly_income: number;
    initial_amount: number;
    term: number;
    id_credit: number;
    city: string;
    region_name:string;
    country_name: string;
    destination: string;
    creditos: Creditos[];
    payments_cards: number;
    rental:number;
    payment_loans: number;
    payment_services: number;
    housing_type: string;
    mortgage_payment: number;
    total_possessions: number;
}
