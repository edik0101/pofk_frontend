type Roles = "Administrator";

export interface User {
  FirstName: string;
  LastName: string;
  PhoneNumber: number | null;
  Email: string;
  CompanyName: string;
  Roles: Roles[];
  IsActive: boolean;
}
