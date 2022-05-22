import { Migration } from '@mikro-orm/migrations';

export class Migration20220519195433 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "first_name" text not null, add column "last_name" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "first_name";');
    this.addSql('alter table "user" drop column "last_name";');
  }

}
