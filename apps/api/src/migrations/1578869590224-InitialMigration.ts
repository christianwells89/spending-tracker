import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1578869590224 implements MigrationInterface {
    name = 'InitialMigration1578869590224'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `budget` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `amount` int NOT NULL, `categories` text NOT NULL, `tags` text NOT NULL, `excludedTags` text NOT NULL, `fromDate` datetime NOT NULL, `toDate` datetime NULL, `rrule` varchar(255) NULL, `shouldRollOver` tinyint NOT NULL DEFAULT 0, `userId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `identifier` varchar(255) NOT NULL, `description` varchar(255) NULL, `group` text NOT NULL, `userId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `goal` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `amount` decimal NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `fromDate` datetime NOT NULL, `dueDate` datetime NULL, `isComplete` tinyint NOT NULL DEFAULT 0, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `transaction` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `amount` decimal NOT NULL, `type` enum ('expense', 'income') NOT NULL, `date` datetime NOT NULL, `location` varchar(255) NULL, `description` varchar(255) NOT NULL, `category` varchar(255) NOT NULL, `tags` text NOT NULL, `userId` int NOT NULL, `accountId` int NOT NULL, `expectedTransactionId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `timezone` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `expected_transaction` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `amount` decimal NOT NULL, `type` enum ('expense', 'income') NOT NULL, `date` datetime NOT NULL, `location` varchar(255) NULL, `description` varchar(255) NOT NULL, `category` varchar(255) NOT NULL, `tags` text NOT NULL, `rrule` varchar(255) NOT NULL, `userId` int NOT NULL, `accountId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `reconciliation` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `amount` decimal NOT NULL, `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `accountId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `account` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `type` enum ('checking', 'savings', 'creditCard', 'cash', 'retirement', 'investment', 'property') NOT NULL, `description` varchar(255) NOT NULL, `institution` varchar(255) NULL, `identifier` varchar(255) NULL, `tags` text NOT NULL, `userId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `goal_accounts_account` (`goalId` int NOT NULL, `accountId` int NOT NULL, INDEX `IDX_c8db5894c9f4f1dcfaa137d4f6` (`goalId`), INDEX `IDX_410b3caa83552c3287a18f24c4` (`accountId`), PRIMARY KEY (`goalId`, `accountId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `budget` ADD CONSTRAINT `FK_8ed65c868c97a5fb471d85efb01` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `category` ADD CONSTRAINT `FK_32b856438dffdc269fa84434d9f` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `goal` ADD CONSTRAINT `FK_40bd308ea814964cec7146c6dce` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_605baeb040ff0fae995404cea37` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_3d6e89b14baa44a71870450d14d` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_8288764505c09c8e8e75f681e07` FOREIGN KEY (`expectedTransactionId`) REFERENCES `expected_transaction`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `expected_transaction` ADD CONSTRAINT `FK_b0b2ce4f858cf5ddbe5f61e99eb` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `expected_transaction` ADD CONSTRAINT `FK_50ca2e38ee0acacc1cce6d45f63` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `reconciliation` ADD CONSTRAINT `FK_41aa201397aecdbee5cccec00ff` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `account` ADD CONSTRAINT `FK_60328bf27019ff5498c4b977421` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `goal_accounts_account` ADD CONSTRAINT `FK_c8db5894c9f4f1dcfaa137d4f64` FOREIGN KEY (`goalId`) REFERENCES `goal`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `goal_accounts_account` ADD CONSTRAINT `FK_410b3caa83552c3287a18f24c41` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `goal_accounts_account` DROP FOREIGN KEY `FK_410b3caa83552c3287a18f24c41`", undefined);
        await queryRunner.query("ALTER TABLE `goal_accounts_account` DROP FOREIGN KEY `FK_c8db5894c9f4f1dcfaa137d4f64`", undefined);
        await queryRunner.query("ALTER TABLE `account` DROP FOREIGN KEY `FK_60328bf27019ff5498c4b977421`", undefined);
        await queryRunner.query("ALTER TABLE `reconciliation` DROP FOREIGN KEY `FK_41aa201397aecdbee5cccec00ff`", undefined);
        await queryRunner.query("ALTER TABLE `expected_transaction` DROP FOREIGN KEY `FK_50ca2e38ee0acacc1cce6d45f63`", undefined);
        await queryRunner.query("ALTER TABLE `expected_transaction` DROP FOREIGN KEY `FK_b0b2ce4f858cf5ddbe5f61e99eb`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_8288764505c09c8e8e75f681e07`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_3d6e89b14baa44a71870450d14d`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_605baeb040ff0fae995404cea37`", undefined);
        await queryRunner.query("ALTER TABLE `goal` DROP FOREIGN KEY `FK_40bd308ea814964cec7146c6dce`", undefined);
        await queryRunner.query("ALTER TABLE `category` DROP FOREIGN KEY `FK_32b856438dffdc269fa84434d9f`", undefined);
        await queryRunner.query("ALTER TABLE `budget` DROP FOREIGN KEY `FK_8ed65c868c97a5fb471d85efb01`", undefined);
        await queryRunner.query("DROP INDEX `IDX_410b3caa83552c3287a18f24c4` ON `goal_accounts_account`", undefined);
        await queryRunner.query("DROP INDEX `IDX_c8db5894c9f4f1dcfaa137d4f6` ON `goal_accounts_account`", undefined);
        await queryRunner.query("DROP TABLE `goal_accounts_account`", undefined);
        await queryRunner.query("DROP TABLE `account`", undefined);
        await queryRunner.query("DROP TABLE `reconciliation`", undefined);
        await queryRunner.query("DROP TABLE `expected_transaction`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `transaction`", undefined);
        await queryRunner.query("DROP TABLE `goal`", undefined);
        await queryRunner.query("DROP TABLE `category`", undefined);
        await queryRunner.query("DROP TABLE `budget`", undefined);
    }

}
