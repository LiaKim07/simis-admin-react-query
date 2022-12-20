export interface ProductGroupDto {
    id: string;
    imageUrl: string;
    name: string;
    productCategoryId: string;
    note: string;
    createdBy: string;
}

export interface ProductGroupTableDto {
    id: string;
    imageUrl: string;
    "Pavadinimas": string;
    "Aprašymas": string;
    "Prekių tipas": string;
}
