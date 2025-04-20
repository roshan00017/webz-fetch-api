import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewsPostsTable1745035601310 implements MigrationInterface {
    name = 'CreateNewsPostsTable1745035601310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "ord_in_thread" integer NOT NULL, "parent_url" character varying, "author" character varying, "published" character varying NOT NULL, "title" character varying NOT NULL, "text" text NOT NULL, "highlightText" text NOT NULL, "highlightTitle" text NOT NULL, "highlightThreadTitle" text NOT NULL, "language" character varying NOT NULL, "sentiment" character varying NOT NULL, "categories" text array NOT NULL, "external_links" text array NOT NULL, "external_images" text array NOT NULL, "entities" jsonb NOT NULL, "rating" character varying, "crawled" character varying NOT NULL, "updated" character varying NOT NULL, "thread" jsonb NOT NULL, CONSTRAINT "PK_95a44578e2b4bb7ca42e3ef4de6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news_posts"`);
    }

}
