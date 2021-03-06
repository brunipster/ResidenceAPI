module.exports = {
    ProfileGenerateVPEnum : Object.freeze({"GUEST":1, "ADMIN":2, "GUARD":3, "MEMBER":4}),
    UserRoles : Object.freeze({"GUEST":1, "ADMIN":2, "GUARD":3, "MEMBER":4}),
    UserStates : Object.freeze({ACTIVE:1, INACTIVE:2, BLOCKED:3, SUSPENDED:4}),
    VPStates : Object.freeze({PENDING: 1, REJECTED: 2, DEPRECATED: 3, APPROVED: 4, CHECKIN: 5, CHECKOUT:6}),
    JWTSecret : process.env.JWT_SECRET || "shhhh",
    JWTExpire : process.env.JWT_EXPIRE || "10m",
    MemberType : Object.freeze({CHILD:1, COUPLE:2, PARENT:3, OTHER:0}),
    GenreConst : Object.freeze({MALE:"M", FEMALE:"F", OTHER:"O"}),
    TypesActionLogs : Object.freeze({CREATE:1, UPDATE:2, DELETE:3})
}