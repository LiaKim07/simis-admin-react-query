export interface ClientsDto {
    companyName: string;
    companyNumber: string;
    vatNumber: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    website: string;
    payee: string;
    bankName: string;
    bankCode: string;
    bankAccount: string;
    companyManagerFirstName: string;
    companyManagerLastName: string;
    companyManagerEmail: string;
    companyManagerPhone: string;
    id: string;
    isActive: boolean;
    customerNumber: string;
    paymentMethodId: string;
    maxCredit: number;
    creditTerm: number;
    creditValue: number;
    customerTypeId: string;
    customerStatusId: string;
    customerCategoryId: string;
    customerSolvencyId: string;
    margin: number;
    discount: number;
}

export interface CustomerAgreement {
    agreementPrefix: string;
    agreementNumber: string;
    createdOn: string;
    id: string;
    isActive: boolean;
    paymentTerm: number;
    agreementTerminationTermId: string;
    customAgreementTerminationTerm: string;
    createdByEmployeeId: string;
    approvedByEmployeeId: string;
    customerId: string;
}

export interface CustomerContact {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    note: string;
    id: string;
    isActive: boolean;
    position: string;
    customerId: string;
}

export interface CustomerCategories {
    name: string;
    id: string;
}

export interface ClientsTableDto {
    id: string;
    "pavadinimas": string;
    "imonės kodas": string;
    "pvm Kodas": string;
    "adresas": string;
    "telefonas": string;
}

export interface ICustomerSolvenciesInfo {
    name: string;
    id: string;
}

export interface ICustomerStatusesInfo {
    name: string;
    id: string;
}

export interface ICustomerTypesInfo {
    name: string;
    id: string;
}
