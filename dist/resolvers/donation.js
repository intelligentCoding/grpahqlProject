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
exports.PostResolver = void 0;
const Donation_1 = require("../entities/Donation");
const type_graphql_1 = require("type-graphql");
let PostResolver = class PostResolver {
    donations({ em }) {
        return em.find(Donation_1.Donation, {});
    }
    donationById(id, { em }) {
        return em.findOne(Donation_1.Donation, { id });
    }
    async updateDonation(id, donation, { em }) {
        const userDonation = await em.findOne(Donation_1.Donation, { id });
        if (!userDonation) {
            return null;
        }
        if (typeof donation !== "undefined") {
            userDonation.donation = donation;
            await em.persistAndFlush(userDonation);
        }
        return userDonation;
    }
    async createDonation(donation, tip, { em, req }) {
        const userId = req.session.userId ? req.session.userId : null;
        const post = em.create(Donation_1.Donation, {
            creatorId: userId,
            tip,
            donation,
            donator: userId,
            createdAt: new Date(),
        });
        await em.persistAndFlush(post);
        return post;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Donation_1.Donation]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "donations", null);
__decorate([
    (0, type_graphql_1.Query)(() => Donation_1.Donation, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "donationById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Donation_1.Donation),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("donation", { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updateDonation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Donation_1.Donation),
    __param(0, (0, type_graphql_1.Arg)("donation")),
    __param(1, (0, type_graphql_1.Arg)("tip")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createDonation", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=donation.js.map