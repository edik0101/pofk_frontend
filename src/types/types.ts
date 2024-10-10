export interface User extends FetchedUser {
  PhoneNumber: number | null;
  CompanyName: string;
}

export interface FetchedUser {
  FirstName: string;
  LastName: string;
  Email: string;
  Roles: string[];
  IsActive: boolean;
}

export interface FetchedRole {
  Id: string;
  Name: string;
  NormalizedName: string;
  ConcurrencyStamp: null;
}
