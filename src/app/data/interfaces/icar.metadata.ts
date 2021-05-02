export interface IBrand {
    id:      number;
    brandId:    number;
    brandName:  string;
    categoryId: number;
}

export interface IYear {
    id:      number;
    brandId:    number;
    year:  number;
}

export interface IModel {
    id:      number;
    brandId:    number;
    year:  number;
    modelId: number;
    modelName: string;
}

export interface IDescription {
    id:          number;
    carId:       number;
    priceId:     number;
    brandId:     number;
    year:        number;
    modelId:     number;
    description: string;
}