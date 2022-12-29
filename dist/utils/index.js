"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectEmpty = void 0;
const isObjectEmpty = (obj) => Object.values(obj).every(value => value === 0);
exports.isObjectEmpty = isObjectEmpty;
