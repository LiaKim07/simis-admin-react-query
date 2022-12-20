export interface ContractDto {
    "agreementPrefix": string,
    "agreementNumber": string,
    "createdOn": string,
    "id": string,
    "isActive": boolean,
    "paymentTerm": number,
    "agreementTerminationTermId": string,
    "customAgreementTerminationTerm": string,
    "createdByEmployeeId": string,
    "approvedByEmployeeId": string,
    "customerId": string
}

export interface ContractTableDto {
    id: string;
    contractNumber: string;
    date_signature: string;
    paymentTerms: number;
    TerminationNotice: string;
    warning_termination: boolean;
    ConsistedOf: string;
    SingedBy: string;
    status: boolean;
}
