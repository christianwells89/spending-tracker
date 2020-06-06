import {MigrationInterface, QueryRunner} from "typeorm";

export class DecimalPrecision1579490113783 implements MigrationInterface {
    name = 'DecimalPrecision1579490113783'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `goal` CHANGE `amount` `amount` decimal(20,2) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `transaction` CHANGE `amount` `amount` decimal(20,2) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `expected_transaction` CHANGE `amount` `amount` decimal(20,2) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `reconciliation` CHANGE `amount` `amount` decimal(20,2) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `account` CHANGE `type` `type` enum ('checking', 'savings', 'creditCard', 'cash', 'retirement', 'investment', 'property', 'loan') NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account` CHANGE `type` `type` enum ('checking', 'savings', 'creditCard', 'cash', 'retirement', 'investment', 'property') NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `reconciliation` CHANGE `amount` `amount` decimal(10,0) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `expected_transaction` CHANGE `amount` `amount` decimal(10,0) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `transaction` CHANGE `amount` `amount` decimal(10,0) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `goal` CHANGE `amount` `amount` decimal(10,0) NOT NULL", undefined);
    }

}
