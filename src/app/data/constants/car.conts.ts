import { IBrand, IDescription, IModel, IYear } from "../interfaces/icar.metadata";

export const BRANDS_DATA_ITEMS: IBrand[] = [
    {
        "id": 1,
        "brandId": 1,
        "brandName": "ALFA ROMEO",
        "categoryId": 1
    }
];

export const YEAR_DATA_ITEMS: IYear[] = [
    {
        "id": 1,
        "brandId": 1,
        "year": 2010
    }
];

export const MODEL_DATA_ITEMS: IModel[] = [
    {
        "id": 1,
        "brandId": 1,
        "year": 2010,
        "modelId": 3,
        "modelName": "159"
    }
];

export const DESCRIPTION_DATA_ITEMS: IDescription[] = [
    {
        "id": 4,
        "carId": 2,
        "priceId": 2,
        "brandId": 1,
        "year": 2010,
        "modelId": 3,
        "description": "159 3.2L 4P 6T/M A/A JTS 260HP "
    }
];