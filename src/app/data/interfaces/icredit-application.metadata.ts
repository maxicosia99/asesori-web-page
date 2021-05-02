export interface ICreditAplication {
    creditapplication_id: number;
    credittype_name:      string;
    application_date:     string;
    amount_required:      number;
    request_city:         string;
    term:                 number;
    formatted_term:       string;
    time_elapsed:         string;
    credit_destination:   string;
    url_credittype_photo: string;
}

export interface IEntity {
    financialEntity_id:        number;
    financialEntity_name:      string;
    steps_number:              number;
    substeps_number:           number;
    substeps_checked_number:   number;
    url_financialEntity_photo: string;
    info:                      string;
}