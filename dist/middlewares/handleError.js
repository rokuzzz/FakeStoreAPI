"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const CustomError_1 = require("../models/CustomError");
const handleError = (err, req, res, next) => {
    if (err instanceof CustomError_1.CustomError) {
        return res
            .status(err.status)
            .json({ status: err.status, message: err.message });
    }
    else {
        return res.status(500).send(err.message);
    }
};
exports.handleError = handleError;
//# sourceMappingURL=handleError.js.map