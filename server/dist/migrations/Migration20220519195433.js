"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220519195433 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220519195433 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add column "first_name" text not null, add column "last_name" text not null;');
    }
    async down() {
        this.addSql('alter table "user" drop column "first_name";');
        this.addSql('alter table "user" drop column "last_name";');
    }
}
exports.Migration20220519195433 = Migration20220519195433;
//# sourceMappingURL=Migration20220519195433.js.map