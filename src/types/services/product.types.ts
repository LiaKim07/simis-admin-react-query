export interface ProductDto {
    id: string;
    isActive: boolean;
    imageUrl: string;
    number: string;
    name: string;
    unit: string;
    height: number;
    width: number;
    length: number;
    weight: number;
    area: number;
    volym: number;
    productTypeId: string;
    productGroupId: string;
    productCategoryId: string;
    note: string,
    isEcommerce: boolean,
    createdBy: string
}

export interface ProductItemDto {
    id: string;
    projectId: string;
    "Numeris": string;
    "Pavadinimas": string;
    "Svoris": number;
    "Plotas": number;
    "Tipas": string;
    "Grupė": string;
}
