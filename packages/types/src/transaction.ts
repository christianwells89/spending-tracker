// import { AccountDTO } from 'account';

export interface TransactionDTO {
  amount: number;
  date: Date;
  payee: string;
  detail?: string;
  envelopeId: number;
  userId: number;
  accountId: number;
  accountName?: string;
  accountIdentifier?: string;
}
