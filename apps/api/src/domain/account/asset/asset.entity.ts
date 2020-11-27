import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntityWithUid } from 'domain/base.entity';
import { Portfolio } from '../account.entity';

@Entity({ name: 'account_portfolio_asset' })
export class Asset extends BaseEntityWithUid {
  /**
   * Class of asset eg. US shares, bonds ets.
   */
  @Column()
  type: string; // TODO: convert this to an enum

  @Column()
  code: string;

  /**
   * Amount of the asset held eg. number of shares.
   */
  @Column('decimal', { precision: 20, scale: 3 })
  units: number;

  /**
   * Date the asset was purchased. Used in historical net worth calculations.
   */
  @Column()
  date: Date;

  @Column('decimal', { precision: 20, scale: 2 })
  purchasePrice: number;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.securities)
  portfolio: Portfolio;
}
