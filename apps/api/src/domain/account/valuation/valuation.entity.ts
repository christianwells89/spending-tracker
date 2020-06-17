import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntityWithUid } from 'domain/base.entity';
import { Property } from '../account.entity';

@Entity({ name: 'account_property_valuation' })
export class Valuation extends BaseEntityWithUid {
  @Column()
  date: Date;

  /**
   * The estimated value of the property. Used in net worth calculations, where the balance of the
   * account is assumed to be the mortgage amount
   */
  @Column('decimal', { precision: 20, scale: 2 })
  value: number;

  @ManyToOne(() => Property, (property) => property.valuations)
  property: Property;
}
