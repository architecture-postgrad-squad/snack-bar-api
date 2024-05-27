export class Payment {
  readonly id: string;
  readonly value: number;
  readonly method: string;
  readonly createdAt: Date;

  constructor(id: string, value: number, method: string, createdAt?: Date) {
    this.id = id;
    this.value = value;
    this.method = method;
    this.createdAt = createdAt;
  }
}
