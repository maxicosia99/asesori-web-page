export interface ICreditFee {
    can_access_credit:    ICreditInformation[];
    cannot_access_credit: ICreditInformation[];
    credit_unavailable:   ICreditInformation[];
}

export interface ICreditInformation {
    id:                    number | null;
    loan_rate:             number | null;
    financing:             number | null;
    loan_amount:           number;
    bank_borrow:           number | null;
    user_initial_amount:   number | null;
    borrowed_amount:       number | null;
    initial_amount_needed: number | null;
    monthly_payment:       number | null;
    numerical_term:        number | null;
    text_term:             null | string;
    financialentity_id:    number;
    financialentity_name:  string;
    financialentity_type:  number;
    photo_url:             string;
    info:                  string;
    payment_termination:   null | string;
    priority:              number;
}

export interface ICreditTerms {
    id: number;
    credit_name:   string;
    url_photo:     string;
    beneficiaries: string[];
    destination:   string[];
    terms:         string[];
}