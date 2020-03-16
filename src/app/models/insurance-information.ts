import { Insurance } from './insurance';

export interface InsuranceInformation {
    user_id: number,
    name: string;
    last_name: string;
    cedula: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    carprice_id: number,
    options: Insurance[];
}
