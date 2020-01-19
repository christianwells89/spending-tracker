import { TransactionDTO } from './transaction';

export interface ExpectedTransactionDTO extends TransactionDTO {
  rrule: string;
}
