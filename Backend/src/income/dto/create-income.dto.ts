export class CreateIncomeDto {
    readonly description: string;
    readonly amount: number;
    readonly currency: string;
    readonly category: string[];
    readonly rfcReceiver: string;
    readonly product: string;
    readonly paymentMethod: string;
    readonly isPaid: boolean;
    readonly date: Date;
  }