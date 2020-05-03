import { Creditos } from './creditos';

export interface CreditInformation {
    credittype_id: number;
    credit_destination: string;
    required_amount: number;
    initial_amount: number;
    monthly_income: number;
    credit_term: number;
    applicant_mail: string;
    request_city_id: string;

    applicant_dni: string;
    applicant_civil_status: string;
    applicant_name: string;
    applicant_lastname: string;
    applicant_birthdate: string;

    home_city_id: number;
    applicant_home_address: string;
    applicant_home_address_reference: string;
    applicant_home_address_sector: string;

    applicant_phone1: string;
    applicant_phone2: string;

    company_name: string;
    company_position: string;
    monthly_salary: number;
    other_monthly_value: number;
    detail_other_monthly_value: string;
    company_city_id: number;
    company_address: string;
    company_phone: string;

    applicant_ruc: string;
    commercial_sector: string;
    average_monthly_sales: number;

    monthly_expenses: number;
    payment_capacity: number;

    cards_payment: number;
    mortgage_payment: number;
    loans_payment: number;
    total_assets_appraisal: number;
    services_payment: number;
    housing_type: string;
    rental_payment:number;

    selected_credits: Creditos[];
}
