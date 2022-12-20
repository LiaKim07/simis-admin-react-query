import { ProjectDto } from './services/project.types';
import { CustomerCategories } from './services/clients.type';
export interface ICreateEmployee {
    "profileUrl": string,
    "firstName": string,
    "lastName": string,
    "phone": string,
    "email": string,
    "socialSecurityNumber": string,
    "nationalityId": string,
    "personalIdentificationNumber": string,
    "personalEmail": string,
    "personalPhone": string,
    "address": string,
    "postalCode": string,
    "city": string,
    "country": string,
    "bankCode": string,
    "bankAccountNumber": string,
    "drivingLicenseCategoryId": string,
    "isActive": boolean,
    "contractNumber": string,
    "employeeRoleId": string,
    "employmentTypeId": string,
    "employmentTermId": string,
    "workingWeekTypeId": string,
    "salary": number | string,
    "signedOn": string,
    "startOn": string,
    "endOn": string,
    "inactivatedOn": string | null,
    "inactivatedBy": string,
    "note": string,
    "createdBy": string
}
export interface IUpdateEmployee extends ICreateEmployee {
    id: string;
}
export interface ICreateEmployeeRole {
    note: string;
    name: string;
    createdBy: string;
}
export interface ICreateDriverLicense {
    name: string;
    createdBy: string;
}
export interface ICreateUser {
    companyContactId: string;
    accessLevelId: string;
}
export interface ICreateProductCategory {
    imageUrl: string;
    name: string;
    note: string;
    createdBy: string;
}
export interface IUpdateProductCategory extends ICreateProductCategory {
    id: string;
}
export interface ICreateProductGroup {
    imageUrl: string;
    name: string;
    productCategoryId: string;
    note: string;
    createdBy: string;
}
export interface IUpdateProductGroup extends ICreateProductGroup {
    id: string;
}
export interface ICreateProduct {
    "name": string,
    "number": string,
    "unit": string,
    "note": string,
    "isEcommerce": boolean,
    "isActive": boolean,
    "imageUrl": string,
    "height": number | string;
    "width": number | string;
    "length": number | string;
    "weight": number | string;
    "area": number | string;
    "volym": number | string;
    "productCategoryId": string,
    "productGroupId": string,
    "productTypeId": string,
    "createdBy": string,
}
export interface IUpdateProduct extends ICreateProduct {
    id: string;
}
export interface ICreateWarehouseProduct {
    warehouseId: string,
    productId: string,
    margin: number | string;
    createdBy: string,
}
export interface ICreateProducttype {
    id: string;
    imageUrl: string;
    name: string;
    note: string;
    productGroupId: string;
}
export interface IUpdateProductType extends ICreateProducttype {
    id: string;
}
export interface ICreateProject extends ProjectDto {
    id: string;
}
export interface IUpdateProject extends ProjectDto {
    id: string;
}
export interface ICreateClient {
    "name": string,
    "number": string,
    "vatNumber": string,
    "address": string,
    "postalCode": string,
    "city": string,
    "country": string,
    "phone": string,
    "email": string,
    "website": string,
    "payee": string,
    "bankName": string,
    "bankCode": string,
    "bankAccount": string,
    "managerId": string,
    "isActive": boolean,
    "customerTypeId": string,
    "customerStatusId": string,
    "customerSolvencyId": string,
    "note": string,
    "createdBy": string,
    "companyTypePrefix": string,
    "noteForRentOrders": string,
    "noteForReturnOrders": string,
    "noteForAgreementAnnex": string,
}
export interface IUpdateClients extends ICreateClient {
    id: string;
}
export interface ICreateContract {
    "customerId": string,
    "isActive": boolean,
    "prefix": string,
    "number": string,
    "customerPaymentMethodId": string,
    "customerAgreementTerminationTermId": string,
    "maxOrderValue": string | number,
    "advancedPaymentAmount": string | number,
    "employeeId": string,
    "note": string,
    "createdBy": string,
}
export interface ICreatePeople {
    "profileUrl": string,
    "firstName": string,
    "lastName": string,
    "phone": string,
    "email": string,
    "isNotDirector": boolean,
    "customerId": string,
    "position": string,
    "note": string,
    "createdBy": string,
}
export interface ICreateServices {
    "name": string,
    "number": string,
    "unit": string,
    "note": string,
    "serviceCategoryId": string,
    "serviceSubCategoryId": string,
    "basePrice": number | string,
    "createdBy": string,
}
export interface IUpdateServices extends ICreateServices {
    id: string;
}
export interface ICreateWarehouse {
    "name": string,
    "address": string,
    "postalCode": string,
    "city": string,
    "country": string,
    "email": string,
    "phone": string,
    "employeeId": string,
    "createdBy": string
}
export interface IUpdateWarehouse extends ICreateWarehouse {
    id: string;
}
export interface ICreateVehicles {
    id: string;
    name: string;
    plateNumber: string;
    milage: number | string,
    insurance: string;
    service: string;
    inspection: string;
    employeeId: string;
    type: string;
    liftingCapacity: number | string;
}
export interface IUpdateVehicles extends ICreateVehicles {
    id: string;
}
export interface ICreateCustomerContacts {
    "profileUrl": string;
    "firstName": string;
    "lastName": string;
    "phone": string;
    "email": string;
    "isNotDirector": boolean;
    "customerId": string;
    "position": string;
    "note": string;
    "createdBy": string;
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
export interface IUpdateCustomerContacts extends CustomerContact {
    id: string;
}
export interface CustomerAgreement {
    agreementPrefix: string;
    agreementNumber: string;
    createdOn: string;
    id: string;
    isActive: boolean;
    paymentTerm: number | string;
    agreementTerminationTermId: string;
    customAgreementTerminationTerm: string;
    createdByEmployeeId: string;
    approvedByEmployeeId: string;
    customerId: string;
}
export interface IUpdateCustomerAgreements extends CustomerAgreement {
    id: string;
}
export interface ICreateCustomerCategory {
    name: string;
    id: string;
}
export interface ICreateCustomerAgreement {
    "customerId": string;
    "isActive": boolean,
    "prefix": string;
    "customerPaymentDueTermId": string;
    "number": string;
    "validUntil": string;
    "customerPaymentMethodId": string;
    "customerAgreementTerminationTermId": string;
    "maxOrderValue": number | string;
    "advancedPaymentAmount": number | string;
    "employeeId": string;
    "note": string;
    "createdBy": string;
}
export interface IUpdateCustomerCategories extends CustomerCategories {
    id: string;
}