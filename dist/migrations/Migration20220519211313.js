"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220519211313 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220519211313 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "donation" ("id" serial primary key, "created_at" timestamptz(0) not null, "donation" int not null, "tip" int not null);');
        this.addSql('drop table if exists "post" cascade;');
    }
    async down() {
        this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');
        this.addSql('drop table if exists "donation" cascade;');
    }
}
exports.Migration20220519211313 = Migration20220519211313;
//# sourceMappingURL=Migration20220519211313.js.map