export class Client {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly cpf?: string;

  constructor(id: string, name?: string, email?: string, cpf?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.cpf = cpf;
  }

  public isValid() {
    return this.cpf || (this.email && this.name);
  }
}
