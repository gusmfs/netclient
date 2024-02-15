import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrate1707283117131 implements MigrationInterface {
    name = 'InitialMigrate1707283117131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "phone" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE ("phone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE ("phone")`);
    }

}
