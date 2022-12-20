export interface ProjectDto {
    "number": string,
    "name": string,
    "address": string,
    "postalCode": string,
    "city": string,
    "country": string,
    "customerId": string,
    "customerContactId": string,
    "employeeId": string,
    "createdBy": string,
    "sequenceNumber": string,
    "isActive": boolean,
    "note": string,

}

export interface ProjectTableDto {
    id: string;
    "Pavadinimas": string;
    "number": string;
    "Klientas": string;
    "Address": string;
    subData: any;
}