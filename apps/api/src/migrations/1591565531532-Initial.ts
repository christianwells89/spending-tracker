import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1591565531532 implements MigrationInterface {
    name = 'Initial1591565531532'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `investment` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uid` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `code` varchar(255) NOT NULL, `units` decimal(20,3) NOT NULL, `date` datetime NOT NULL, `portfolioId` int NULL, UNIQUE INDEX `IDX_09d0dbc02508d0fdee2791b03b` (`uid`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `property_valuation` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uid` varchar(255) NOT NULL, `date` datetime NOT NULL, `value` decimal(20,2) NOT NULL, `propertyId` int NULL, UNIQUE INDEX `IDX_ed745ebe0e24cc5b93b1e73619` (`uid`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `envelope_group` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `order` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `envelope_month` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uid` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `month` datetime NOT NULL, `allocated` decimal(20,2) NOT NULL, `envelopeId` int NULL, UNIQUE INDEX `IDX_66962de7caae5c85ca76823939` (`uid`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `goal` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uid` varchar(255) NOT NULL, `amount` decimal(20,2) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `fromDate` datetime NOT NULL, `dueDate` datetime NULL, `isComplete` tinyint NOT NULL DEFAULT 0, `envelopeId` int NULL, UNIQUE INDEX `IDX_5825b386ae5a0b5b1bc6c6a887` (`uid`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `scheduled_transaction` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uid` varchar(255) NOT NULL, `amount` decimal(20,2) NOT NULL, `date` datetime NOT NULL, `payee` varchar(255) NOT NULL, `detail` varchar(255) NOT NULL, `cleared` tinyint NOT NULL, `isTransfer` tinyint NOT NULL, `envelopeId` int NOT NULL, `rrule` varchar(255) NOT NULL, `accountId` int NOT NULL, UNIQUE INDEX `IDX_419c1f26d78a507d8011a7f2af` (`uid`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `transaction` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uid` varchar(255) NOT NULL, `amount` decimal(20,2) NOT NULL, `date` datetime NOT NULL, `payee` varchar(255) NOT NULL, `detail` varchar(255) NOT NULL, `cleared` tinyint NOT NULL, `isTransfer` tinyint NOT NULL, `envelopeId` int NOT NULL, `accountId` int NOT NULL, `scheduledTransactionId` int NULL, UNIQUE INDEX `IDX_7b5ae73d3d63f24cc6b32cbfd8` (`uid`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `envelope` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uid` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `order` int NOT NULL, `isIntake` tinyint NOT NULL, `groupId` int NOT NULL, `budgetId` int NULL, UNIQUE INDEX `IDX_e7cef1d8b46e3b8fd1bad6d860` (`uid`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `timezone` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `budget` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uid` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `categories` enum ('aud', 'usd') NOT NULL, `timezone` varchar(255) NULL, `userId` int NOT NULL, UNIQUE INDEX `IDX_9b036dd5b8472b3e57a9a41514` (`uid`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `reconciliation` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `amount` decimal(20,2) NOT NULL, `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `accountId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `account` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uid` varchar(255) NOT NULL, `type` enum ('checking', 'savings', 'creditCard', 'cash', 'retirement', 'investment', 'portfolio', 'property', 'loan') NOT NULL, `description` varchar(255) NOT NULL, `institution` varchar(255) NULL, `identifier` varchar(255) NULL, `notes` varchar(255) NULL, `budgetId` int NOT NULL, UNIQUE INDEX `IDX_402c2e1486caf21fd72ee7c5b1` (`uid`), INDEX `IDX_3c76f178c5065d1ab304b5832e` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `investment` ADD CONSTRAINT `FK_66417df36be8f47bb31a91ae297` FOREIGN KEY (`portfolioId`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `property_valuation` ADD CONSTRAINT `FK_8408e6a6d12c9a6033d7532e2cd` FOREIGN KEY (`propertyId`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `envelope_month` ADD CONSTRAINT `FK_783caf057c209cfa532cc75638c` FOREIGN KEY (`envelopeId`) REFERENCES `envelope`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `goal` ADD CONSTRAINT `FK_a17bc9f8f1828c0a8a183323592` FOREIGN KEY (`envelopeId`) REFERENCES `envelope`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `scheduled_transaction` ADD CONSTRAINT `FK_f9936c78cdb8047a1dba53ea27f` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_3d6e89b14baa44a71870450d14d` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_ff86b6c1a9910dc65cdfb591e95` FOREIGN KEY (`scheduledTransactionId`) REFERENCES `scheduled_transaction`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `envelope` ADD CONSTRAINT `FK_de9a5959c885abcfea0362904a4` FOREIGN KEY (`groupId`) REFERENCES `envelope_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `envelope` ADD CONSTRAINT `FK_1d4aea44e15c9192d6b12bc208f` FOREIGN KEY (`budgetId`) REFERENCES `budget`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `budget` ADD CONSTRAINT `FK_8ed65c868c97a5fb471d85efb01` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `reconciliation` ADD CONSTRAINT `FK_41aa201397aecdbee5cccec00ff` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `account` ADD CONSTRAINT `FK_4f5278cf08fcbfe9b77f5d6a17f` FOREIGN KEY (`budgetId`) REFERENCES `budget`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account` DROP FOREIGN KEY `FK_4f5278cf08fcbfe9b77f5d6a17f`", undefined);
        await queryRunner.query("ALTER TABLE `reconciliation` DROP FOREIGN KEY `FK_41aa201397aecdbee5cccec00ff`", undefined);
        await queryRunner.query("ALTER TABLE `budget` DROP FOREIGN KEY `FK_8ed65c868c97a5fb471d85efb01`", undefined);
        await queryRunner.query("ALTER TABLE `envelope` DROP FOREIGN KEY `FK_1d4aea44e15c9192d6b12bc208f`", undefined);
        await queryRunner.query("ALTER TABLE `envelope` DROP FOREIGN KEY `FK_de9a5959c885abcfea0362904a4`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_ff86b6c1a9910dc65cdfb591e95`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_3d6e89b14baa44a71870450d14d`", undefined);
        await queryRunner.query("ALTER TABLE `scheduled_transaction` DROP FOREIGN KEY `FK_f9936c78cdb8047a1dba53ea27f`", undefined);
        await queryRunner.query("ALTER TABLE `goal` DROP FOREIGN KEY `FK_a17bc9f8f1828c0a8a183323592`", undefined);
        await queryRunner.query("ALTER TABLE `envelope_month` DROP FOREIGN KEY `FK_783caf057c209cfa532cc75638c`", undefined);
        await queryRunner.query("ALTER TABLE `property_valuation` DROP FOREIGN KEY `FK_8408e6a6d12c9a6033d7532e2cd`", undefined);
        await queryRunner.query("ALTER TABLE `investment` DROP FOREIGN KEY `FK_66417df36be8f47bb31a91ae297`", undefined);
        await queryRunner.query("DROP INDEX `IDX_3c76f178c5065d1ab304b5832e` ON `account`", undefined);
        await queryRunner.query("DROP INDEX `IDX_402c2e1486caf21fd72ee7c5b1` ON `account`", undefined);
        await queryRunner.query("DROP TABLE `account`", undefined);
        await queryRunner.query("DROP TABLE `reconciliation`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9b036dd5b8472b3e57a9a41514` ON `budget`", undefined);
        await queryRunner.query("DROP TABLE `budget`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e7cef1d8b46e3b8fd1bad6d860` ON `envelope`", undefined);
        await queryRunner.query("DROP TABLE `envelope`", undefined);
        await queryRunner.query("DROP INDEX `IDX_7b5ae73d3d63f24cc6b32cbfd8` ON `transaction`", undefined);
        await queryRunner.query("DROP TABLE `transaction`", undefined);
        await queryRunner.query("DROP INDEX `IDX_419c1f26d78a507d8011a7f2af` ON `scheduled_transaction`", undefined);
        await queryRunner.query("DROP TABLE `scheduled_transaction`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5825b386ae5a0b5b1bc6c6a887` ON `goal`", undefined);
        await queryRunner.query("DROP TABLE `goal`", undefined);
        await queryRunner.query("DROP INDEX `IDX_66962de7caae5c85ca76823939` ON `envelope_month`", undefined);
        await queryRunner.query("DROP TABLE `envelope_month`", undefined);
        await queryRunner.query("DROP TABLE `envelope_group`", undefined);
        await queryRunner.query("DROP INDEX `IDX_ed745ebe0e24cc5b93b1e73619` ON `property_valuation`", undefined);
        await queryRunner.query("DROP TABLE `property_valuation`", undefined);
        await queryRunner.query("DROP INDEX `IDX_09d0dbc02508d0fdee2791b03b` ON `investment`", undefined);
        await queryRunner.query("DROP TABLE `investment`", undefined);
    }

}
