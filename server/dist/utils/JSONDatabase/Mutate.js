"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Mutate.ts
const lodash_1 = __importDefault(require("lodash"));
class Mutate {
    constructor(documents) {
        this.documents = documents;
    }
    create(doc) {
        this.documents.push(lodash_1.default.cloneDeep(doc));
        return this;
    }
    createMany(docs) {
        this.documents.push(...lodash_1.default.cloneDeep(docs));
        return this;
    }
    update(predicate, updater) {
        this.documents = this.documents.map((doc) => predicate(doc) ? Object.assign(Object.assign({}, doc), updater) : doc);
        return this;
    }
    replace(id, newDoc) {
        this.documents = this.documents.map((doc) => doc.id === id ? lodash_1.default.cloneDeep(newDoc) : doc);
        return this;
    }
    delete(predicate) {
        this.documents = lodash_1.default.reject(this.documents, predicate);
        return this;
    }
}
exports.default = Mutate;
