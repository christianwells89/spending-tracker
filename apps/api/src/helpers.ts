import { DateTime } from 'luxon';
import { Container } from 'typedi';
import { getRepository } from 'typeorm';

import { MonthInYear } from '@st/types';

type ParamOrPropDecorator = (object: object, propertyName: string, index?: number) => void;

/**
 * Minimal reproduction from the decorator in typeorm-typedi-extensions because that one just
 * refused to work. It would try to get a custom repository rather then the generic one.
 */
export function InjectRepository(entityType: Function): ParamOrPropDecorator {
  return (object: object, propertyName: string, index?: number): void => {
    Container.registerHandler({ index, object, value: () => getRepository(entityType) });
  };
}

export function parseMonthInYearToDate(monthInYear: MonthInYear): Date {
  return parseMonthInYearToDateTime(monthInYear).toJSDate();
}

export function parseMonthInYearToDateTime(monthInYear: MonthInYear): DateTime {
  return DateTime.fromISO(monthInYear, { zone: 'utc' });
}
