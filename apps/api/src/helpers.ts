import { Container } from 'typedi';
import { getRepository } from 'typeorm';

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
