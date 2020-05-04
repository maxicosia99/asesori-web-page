import { Insurance } from './insurance';

export interface InsuranceInformation {
    car_id: number;
    car_year: number;
    applicant_mail: string;
    request_city_id: number;

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

    car_color: string;
    car_license: string;
    car_details: string;

    selected_options: Insurance[];
}
