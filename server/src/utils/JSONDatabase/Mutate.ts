// Mutate.ts
import _ from "lodash";

export default class Mutate<Document extends { id: string }> {
  private documents: Document[];

  constructor(documents: Document[]) {
    this.documents = documents;
  }

  create(doc: Document): this {
    this.documents.push(_.cloneDeep(doc));
    return this;
  }

  createMany(docs: Document[]): this {
    this.documents.push(..._.cloneDeep(docs));
    return this;
  }

  update(
    predicate: (doc: Document) => boolean,
    updater: Partial<Document>
  ): this {
    this.documents = this.documents.map((doc) =>
      predicate(doc) ? { ...doc, ...updater } : doc
    );
    return this;
  }

  replace(id: Document["id"], newDoc: Document): this {
    this.documents = this.documents.map((doc) =>
      doc.id === id ? _.cloneDeep(newDoc) : doc
    );
    return this;
  }

  delete(predicate: (doc: Document) => boolean): this {
    this.documents = _.reject(this.documents, predicate);
    return this;
  }
}
