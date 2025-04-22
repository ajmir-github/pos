"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Query.ts
const lodash_1 = __importDefault(require("lodash"));
class Query {
    constructor(documents) {
        this.documents = documents;
    }
    where(predicate) {
        this.documents = lodash_1.default.filter(this.documents, predicate);
        return this;
    }
    count() {
        return this.documents.length;
    }
    orderBy(key, direction = "asc") {
        this.documents = lodash_1.default.orderBy(this.documents, [key], [direction]);
        return this;
    }
    select(...keys) {
        const selected = this.documents.map((doc) => lodash_1.default.pick(doc, keys));
        return new Query(selected);
    }
    limit(n) {
        this.documents = lodash_1.default.take(this.documents, n);
        return this;
    }
    skip(n) {
        this.documents = lodash_1.default.drop(this.documents, n);
        return this;
    }
    paginate(page, pageSize) {
        const start = (page - 1) * pageSize;
        this.documents = lodash_1.default.chain(this.documents).drop(start).take(pageSize).value();
        return this;
    }
    groupBy(key) {
        return lodash_1.default.groupBy(this.documents, (doc) => String(doc[key]));
    }
    // One-to-One relationship
    populateOneToOne(localKey, foreignKey, relatedCollection, as) {
        this.documents = this.documents.map((doc) => {
            const related = relatedCollection.find((relatedDoc) => relatedDoc[foreignKey] === doc[localKey]);
            return Object.assign(Object.assign({}, doc), { [as]: related !== null && related !== void 0 ? related : null });
        });
        return this;
    }
    // One-to-Many relationship
    populateOneToMany(localKey, foreignKey, relatedCollection, as) {
        this.documents = this.documents.map((doc) => {
            const related = relatedCollection.filter((relatedDoc) => relatedDoc[foreignKey] === doc[localKey]);
            return Object.assign(Object.assign({}, doc), { [as]: related });
        });
        return this;
    }
    // Many-to-Many relationship
    populateManyToMany(localKey, foreignKey, relatedCollection, as) {
        this.documents = this.documents.map((doc) => {
            const related = relatedCollection.filter((relatedDoc) => relatedDoc[foreignKey] === doc[localKey]);
            return Object.assign(Object.assign({}, doc), { [as]: related });
        });
        return this;
    }
    toArray() {
        return this.documents;
    }
    first() {
        return lodash_1.default.first(this.documents);
    }
    findOne(predicate) {
        return lodash_1.default.find(this.documents, predicate);
    }
}
exports.default = Query;
