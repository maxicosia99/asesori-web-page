export interface CarInsuranceRequest {
    insured_dni : string, 
	insured_age : number,
	insured_name : string,
	insured_lastname : string,
	insured_gender : string,
	insured_marital_status : string,
	region : string,
	city : string,
	car_year : number,
	car_brand : string,
	car_model : string,
	car_description : string,
	carprice_id : number,
	car_color : string,
	car_license_plate : string,
	insurancecompany_id : number
}