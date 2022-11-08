"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readFileList = (dir, filesList, fileSuffix) => {
    const files = fs_1.default.readdirSync(dir);
    fileSuffix
        ? files
            .filter((e) => fileSuffix && e.indexOf(fileSuffix) !== -1)
            .forEach((item, index) => {
            const fullPath = path_1.default.join(dir, item);
            const stat = fs_1.default.statSync(fullPath);
            if (stat.isDirectory()) {
                readFileList(path_1.default.join(dir, item), filesList, fileSuffix);
            }
            else {
                filesList.push(fullPath);
            }
        })
        : files.forEach((item, index) => {
            const fullPath = path_1.default.join(dir, item);
            const stat = fs_1.default.statSync(fullPath);
            if (stat.isDirectory()) {
                readFileList(path_1.default.join(dir, item), filesList, fileSuffix);
            }
            else {
                filesList.push(fullPath);
            }
        });
    return filesList;
};
/**
 *
 * @param path  folder absolute path
 * @param fileSuffix file suffix
 * @param outFile out file name
 */
const mergeAllText = (path, outFile, fileSuffix, callback) => {
    let filesList = [];
    readFileList(path, filesList, fileSuffix);
    filesList.map((e) => {
        fs_1.default.readFile(e, "utf-8", (err, dataStr) => {
            fs_1.default.appendFile(outFile !== null && outFile !== void 0 ? outFile : `out`, dataStr + "\r\n", (err) => {
                if (err) {
                    callback("err");
                }
                callback("ok");
            });
        });
    });
};
exports.default = mergeAllText;
