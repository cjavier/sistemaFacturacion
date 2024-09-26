export class CreateExpenseDto {
    readonly description: string;
    readonly amount: number;
    readonly currency: string;
    readonly category: string[];
    readonly rfcSender: string;
    readonly date: Date;
  }