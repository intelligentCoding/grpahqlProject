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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let LoginInput = class LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
let RegisterInput = class RegisterInput extends LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "lastName", void 0);
RegisterInput = __decorate([
    (0, type_graphql_1.InputType)()
], RegisterInput);
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    async user({ req }) {
        if (!req.session.userId) {
            return null;
        }
        return User_1.User.findOne(req.session.userId);
    }
    async register(options, { req }) {
        if (options.username.length <= 2) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "very short user name.",
                    },
                ],
            };
        }
        if (options.password.length <= 2) {
            return {
                errors: [
                    {
                        field: "login",
                        message: "invalid login",
                    },
                ],
            };
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(options.password, salt);
        let user;
        try {
            const results = await (0, typeorm_1.getConnection)().createQueryBuilder().insert().into(User_1.User).values({
                firstName: options.firstName,
                lastName: options.lastName,
                username: options.username,
                password: hashedPassword,
            }).returning('*').execute();
            user = results.raw[0];
        }
        catch (error) {
            if (error.detail.includes("already exists")) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "username already exist",
                        },
                    ],
                };
            }
        }
        req.session.userId = user.id;
        return { user };
    }
    async login(options, { req }) {
        const user = await User_1.User.findOne({ where: { username: options.username } });
        if (!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "User Name not found",
                    },
                ],
            };
        }
        try {
            console.log(options.password);
            const valid = bcrypt_1.default.compareSync(options.password, user.password);
            if (!valid)
                return {
                    errors: [
                        {
                            field: "username",
                            message: "login not valid",
                        },
                    ],
                };
        }
        catch (error) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "login not valid",
                    },
                ],
            };
        }
        req.session.userId = user.id;
        return {
            user,
        };
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy(err => {
            res.clearCookie('tid');
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options", () => RegisterInput)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map