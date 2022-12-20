export interface WarehouseDto {
    "name": "string",
    "address": "string",
    "postalCode": "string",
    "city": "string",
    "country": "string",
    "email": "string",
    "phone": "string",
    "employeeId": "string",
    "createdBy": "string"
}

export interface WarehouseTableDto {
    id: string;
    "Adresas"?: string;
    "Atsakingas": string;
    "Telefonas": string;
    "El. paštas": string;
    "Sandėlio pavadinimas": string;
}
