"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// JSONFile.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
class JSONFile {
    constructor(name, options) {
        var _a;
        this.name = name;
        this.filePath = path_1.default.join(process.cwd(), "source", name + ".jsd");
        this.cache = (_a = options === null || options === void 0 ? void 0 : options.cache) !== null && _a !== void 0 ? _a : false;
        this.cachedData = null;
        this.defaultData = options === null || options === void 0 ? void 0 : options.defaultData;
    }
    clearCache() {
        this.cachedData = null;
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cache && this.cachedData)
                return lodash_1.default.cloneDeep(this.cachedData);
            try {
                const buffer = yield fs_1.default.promises.readFile(this.filePath, "utf-8");
                const { data } = JSON.parse(buffer);
                if (this.cache)
                    this.cachedData = data;
                return lodash_1.default.cloneDeep(data);
            }
            catch (err) {
                if (err.code === "ENOENT") {
                    yield this.write(this.defaultData || {});
                    return this.read();
                }
                throw err;
            }
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = JSON.stringify({ data }, null, 2);
            yield fs_1.default.promises.writeFile(this.filePath, buffer, "utf-8");
            if (this.cache)
                this.cachedData = data;
            return lodash_1.default.cloneDeep(data);
        });
    }
}
exports.default = JSONFile;
