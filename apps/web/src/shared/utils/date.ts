import { DateTime } from 'luxon';

import { MonthInYear } from '@st/types';

/**
 * Checks month against a naive regex (just validates length of parts) and then determines if it is
 * a possible month with Luxon.
 */
export function isMonthValid(month: MonthInYear): boolean {
  const regex = /^\d{4}-\d{2}$/;
  const isMatch = regex.test(month);

  const date = DateTime.fromISO(month);

  return isMatch && date.isValid;
}
