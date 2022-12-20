export interface VehiclesDto {
    "name": string,
    "plateNumber": string,
    "milage": number | string,
    "insurance": string,
    "service": string,
    "inspection": string,
    "manufactory": string,
    "employeeId": string,
    "type": string,
    "liftingCapacity": number | string,
    "drivingLicenseCategoryId": string,
    "createdBy": string
}

export interface VehiclesTableDto {
    id: string;
    subData: any;
    "name": string,
    "plateNumber": string,
    "milage": number | string,
    "insurance": string,
    "service": string,
    "inspection": string,
    "manufactory": string,
    "employeeId": string,
    "type": string,
    "liftingCapacity": number | string,
    "drivingLicenseCategoryId": string,
    "createdBy": string
}
