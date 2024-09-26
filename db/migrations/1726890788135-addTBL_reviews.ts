import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLReviews1726890788135 implements MigrationInterface {
    name = 'AddTBLReviews1726890788135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "ratings" integer NOT NULL, "comment" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer NOT NULL, "product" integer NOT NULL, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_13ad24867eac69d496aca2d1b56" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_978e9062da82d669c78c85dc0be" FOREIGN KEY ("product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_978e9062da82d669c78c85dc0be"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_13ad24867eac69d496aca2d1b56"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
