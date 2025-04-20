import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewsPostsTable1745035898974 implements MigrationInterface {
    name = 'CreateNewsPostsTable1745035898974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_posts" ADD "uuid" character varying`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "ord_in_thread" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "published" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "text" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "highlightText" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "highlightTitle" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "highlightThreadTitle" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "language" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "sentiment" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "categories" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "external_links" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "external_images" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "entities" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "crawled" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "updated" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "thread" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "thread" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "updated" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "crawled" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "entities" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "external_images" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "external_links" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "categories" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "sentiment" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "language" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "highlightThreadTitle" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "highlightTitle" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "highlightText" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "text" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "published" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "ord_in_thread" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" ALTER COLUMN "url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_posts" DROP COLUMN "uuid"`);
    }

}
