import { INationality } from "./nationalities.types";

export interface IClothingType {
  id: number;
  name: string;
}

export interface IClothingInfo {
  id: string;
  size: string;
  type: IClothingType;
}

export interface EmployeeDto {
  id: string;
  isActive: boolean;
  profileUrl: string | null;
  firstName: string;
  lastName: string;
  seqNumber: string;
  contractNumber: string;
  socialSecurityNumber: string;
  nationalityId: string;
  personalIdentificationNumber: string;
  employeeRoleId: string;
  employmentTypeId: string;
  employmentTermId: string;
  workingWeekId: string;
  salary: number;
  start: string;
  end: string;
  registered: string;
  inactivated: string | null;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  bankCode: string;
  bankAccountNumber: string;
  drivingLicenseId: string;
  otherInfo: string;
}
export interface EmployeeRoleDto {
  id: string;
  name: string;
}

export interface WorkActionSummary {
  id: string;
  totDays: number;
  totHours: number;
  workAction: {
    id: string;
    name: string;
    code: string;
  };
}

export interface EmployeeSummaryDto {
  id: string;
  year: number;
  month: number;
  totDays: number;
  totHours: number;
  totHoursByContract: number;
  workActionSummary: WorkActionSummary[];
}

export interface EmployeeTableDto {
  id: string;
  "Sutarties Nr.": string;
  "Vardas Pavardė": string;
  "Pareigos": string;
  "Telefonas": string;
  "El. paštas": string;
}

export interface EmployeeRoleTableDto {
  id: string;
  name: string;
}

export interface UserTableDto {
  id: string;
  username: string;
  // email: string;
  higherRole: string;
}

export interface LoginRes {
  token: string;
  expiration: number;
}

export interface ForgotPasswordInfo {
  username: string;
}

export interface IChangePassword {
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IResetPassword {
  username: string;
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}

export interface IEmployee {
  "Sutarties Nr.": number;
  "Grafiko Nr.": string;
  "Vardas Pavardė": string;
  "Pareigos": string;
  "Statusas": string;
}

export interface ICreateEmployeeRole {
  note: string;
  name: string;
  createdBy: string;
}

export interface IUpdateEmployeeRole extends ICreateEmployeeRole {
  id: string;
}

export interface IEmployeeRole extends ICreateEmployeeRole {
  id: string;
}

export interface IEmploymentTypeInfo extends IEmployeeRole {
  multiplyer: number;
}
