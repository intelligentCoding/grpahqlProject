"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationResolver = void 0;
const Donation_1 = require("../entities/Donation");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("../auth");
const typeorm_1 = require("typeorm");
let DonationResolver = class DonationResolver {
    async donations(limit, cursor) {
        const customLimit = Math.min(25, limit);
        const qb = (0, typeorm_1.getConnection)()
            .getRepository(Donation_1.Donation)
            .createQueryBuilder("d")
            .orderBy('"createdAt"', "DESC")
            .take(customLimit);
        if (cursor) {
            qb.where('"createdAt" < :cursor', {
                cursor: new Date(parseInt(cursor))
            });
        }
        return qb.getMany();
    }
    donationById(id) {
        return Donation_1.Donation.findOne(id);
    }
    async updateDonation(id, donation) {
        const donationByUser = await Donation_1.Donation.findOne(id);
        if (!donationByUser)
            return null;
        if (donation) {
            await Donation_1.Donation.update({ id }, { donation });
        }
        return donationByUser;
    }
    async createDonation(tip, donation, { req }) {
        return Donation_1.Donation.create({
            tip,
            donation,
            donatorId: req.session.userId,
        }).save();
    }
    async deleteDonation(id) {
        await Donation_1.Donation.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Donation_1.Donation]),
    __param(0, (0, type_graphql_1.Arg)('limit', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('cursor', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DonationResolver.prototype, "donations", null);
__decorate([
    (0, type_graphql_1.Query)(() => Donation_1.Donation, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationResolver.prototype, "donationById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Donation_1.Donation),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("donation", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DonationResolver.prototype, "updateDonation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Donation_1.Donation),
    (0, type_graphql_1.UseMiddleware)(auth_1.auth),
    __param(0, (0, type_graphql_1.Arg)("tip", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("donation", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], DonationResolver.prototype, "createDonation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationResolver.prototype, "deleteDonation", null);
DonationResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], DonationResolver);
exports.DonationResolver = DonationResolver;
//# sourceMappingURL=donation.js.map