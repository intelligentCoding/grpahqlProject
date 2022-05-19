import { Migration } from '@mikro-orm/migrations';

export class Migration20220519211313 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "donation" ("id" serial primary key, "created_at" timestamptz(0) not null, "donation" int not null, "tip" int not null);');

    this.addSql('drop table if exists "post" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');

    this.addSql('drop table if exists "donation" cascade;');
  }

}
