import { MigrationInterface, QueryRunner } from "typeorm";

export class initDB1671989553718 implements MigrationInterface {
    name = 'initDB1671989553718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firstname\` varchar(500) NOT NULL, \`lastname\` varchar(500) NOT NULL, \`email\` varchar(500) NOT NULL, \`age\` int NOT NULL, \`dni\` varchar(8) NOT NULL, \`username\` varchar(250) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('ADMIN', 'SELLER', 'CASHIER') NOT NULL, UNIQUE INDEX \`IDX_b97823bf100e01f4325ed7c1c3\` (\`username\`, \`email\`, \`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`laboratory\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`address\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`lng\` varchar(255) NOT NULL, \`lat\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0d8f3e07f3eba9e858c3081587\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`therapeutic_description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, \`expiration_date\` datetime NOT NULL, \`laboratory_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`purchase_detail\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`quantity_product\` int NOT NULL, \`total_price\` int NOT NULL, \`purchase_id\` varchar(36) NULL, \`product_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`purchase\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`description\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`payment_method\` varchar(255) NOT NULL, \`customer_id\` varchar(36) NULL, \`employee_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firstname\` varchar(500) NOT NULL, \`lastname\` varchar(500) NOT NULL, \`email\` varchar(500) NOT NULL, \`age\` int NOT NULL, \`dni\` varchar(8) NOT NULL, UNIQUE INDEX \`IDX_82c2d0dca0a87300c738be9a88\` (\`email\`, \`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_76c3ee596f4a0b49af493d22cbe\` FOREIGN KEY (\`laboratory_id\`) REFERENCES \`laboratory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_detail\` ADD CONSTRAINT \`FK_28f8b3d42bcff4501d7a60c61d8\` FOREIGN KEY (\`purchase_id\`) REFERENCES \`purchase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_detail\` ADD CONSTRAINT \`FK_4c0d5cb87dca1bc0bd0267e1d80\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase\` ADD CONSTRAINT \`FK_2248a331258d17d204ccfe9497c\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase\` ADD CONSTRAINT \`FK_a243212193f01678bce0b29507e\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchase\` DROP FOREIGN KEY \`FK_a243212193f01678bce0b29507e\``);
        await queryRunner.query(`ALTER TABLE \`purchase\` DROP FOREIGN KEY \`FK_2248a331258d17d204ccfe9497c\``);
        await queryRunner.query(`ALTER TABLE \`purchase_detail\` DROP FOREIGN KEY \`FK_4c0d5cb87dca1bc0bd0267e1d80\``);
        await queryRunner.query(`ALTER TABLE \`purchase_detail\` DROP FOREIGN KEY \`FK_28f8b3d42bcff4501d7a60c61d8\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_76c3ee596f4a0b49af493d22cbe\``);
        await queryRunner.query(`DROP INDEX \`IDX_82c2d0dca0a87300c738be9a88\` ON \`customer\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`purchase\``);
        await queryRunner.query(`DROP TABLE \`purchase_detail\``);
        await queryRunner.query(`DROP INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_0d8f3e07f3eba9e858c3081587\` ON \`laboratory\``);
        await queryRunner.query(`DROP TABLE \`laboratory\``);
        await queryRunner.query(`DROP INDEX \`IDX_b97823bf100e01f4325ed7c1c3\` ON \`employee\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
    }

}
