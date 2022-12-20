export interface ProductTypeDto {
    id: string;
    productGroupId: string;
    imageUrl: string;
    name: string;
    note: string;
    createdBy: string;
}

export interface ProductTypeTableDto {
    id: string;
    createdBy: string;
    imageUrl: string;
    "Pavadinimas": string;
    "Pastaba": string;
    "Grupė": string;
}
