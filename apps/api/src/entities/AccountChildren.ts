import { Column, Entity, ManyToOne } from 'typeorm';

import { Portfolio, Property } from './Account';
import { BaseEntityWithUid } from './Base';

@Entity()
export class Investment extends BaseEntityWithUid {
  /**
   * Class of investment eg. US shares, bonds ets.
   */
  @Column()
  type: string; // TODO: convert this to an enum

  @Column()
  code: string;

  /**
   * Amount of the investment held eg. number of shares.
   */
  @Column('decimal', { precision: 20, scale: 3 })
  units: number;

  /**
   * Date the investment was purchased. Used in historical net worth calculations.
   */
  @Column()
  date: Date;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.investments)
  portfolio: Portfolio;
}

@Entity()
export class PropertyValuation extends BaseEntityWithUid {
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
