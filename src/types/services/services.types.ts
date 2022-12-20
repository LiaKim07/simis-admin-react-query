export interface ServicesDto {
    id: string;
    name: string;
    number: string;
    unit: string;
    note: string,
    serviceCategoryId: string,
    serviceSubCategoryId: string,
    basePrice: number | string,
    createdBy: string,
}

export interface ServicesTableDto {
    id: string;
    "Pavadinimas": string;
    "Paslaugos kodas": string;
    "Matavimo vienetai": string;
    "Kategorija": string;
    "Tipas": string;
}
