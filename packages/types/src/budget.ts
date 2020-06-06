export class BudgetDTO {
  categories: string[];
  tags: string[];
  excludedTags: string[];
  fromDate: Date;
  toDate?: Date;
  rrule?: string;
  userId: number;
}