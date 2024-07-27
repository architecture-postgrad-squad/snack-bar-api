export abstract class UpdatePaymentServicePort {
  abstract execute(id: string): Promise<any>;
}
