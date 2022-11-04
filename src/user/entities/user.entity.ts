export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  isAdmin: boolean;
  isManager: boolean;
  isAuth: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
