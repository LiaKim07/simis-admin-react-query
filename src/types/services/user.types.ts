
export interface IUser {
   id: string;
   username: string;
   email: string;
   profileUrl: string;
   seqNumber: string;
   firstName: string;
   lastName: string;
   currentUserRoles: IRole[]
}

export interface ICreateUser {
   id: string;
   username: string;
   email: string;
   password: string;
   userRoleId: string;
}

export type IRole = 'SystemAdmin' | 'User' | 'SuperUser' | 'Admin' | 'Guest';