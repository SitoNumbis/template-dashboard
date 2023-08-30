// @ts-check
const Router = require("./router");

// auth
const { validator } = require("../utils/secure");

const userRouter = new Router("users", [validator]);

module.exports = userRouter.router;
