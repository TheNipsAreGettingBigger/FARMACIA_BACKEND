"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus = exports.HttpStatus || (exports.HttpStatus = {}));
class HttpResponse {
    Ok(res, data) {
        return res.status(HttpStatus.OK).json({
            ok: true,
            status: HttpStatus.OK,
            statusMsg: "success",
            data
        });
    }
    BadRequest(res, data) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            ok: false,
            status: HttpStatus.BAD_REQUEST,
            statusMsg: "Bad request",
            data
        });
    }
    NotFound(res, data) {
        return res.status(HttpStatus.NOT_FOUND).json({
            ok: false,
            status: HttpStatus.NOT_FOUND,
            statusMsg: "Not Found",
            error: data,
        });
    }
    Unauthorized(res, data) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            ok: false,
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: "Unauthorized",
            error: data,
        });
    }
    Forbidden(res, data) {
        return res.status(HttpStatus.FORBIDDEN).json({
            ok: false,
            status: HttpStatus.FORBIDDEN,
            statusMsg: "Forbidden",
            error: data,
        });
    }
    Error(res, data) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            ok: false,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: "Internal server error",
            error: data,
        });
    }
}
exports.HttpResponse = HttpResponse;
