// Query.ts
import _ from "lodash";

export default class Query<Document> {
  private documents: Document[];

  constructor(documents: Document[]) {
    this.documents = documents;
  }

  where(predicate: (doc: Document) => boolean): this {
    this.documents = _.filter(this.documents, predicate);
    return this;
  }

  count(): number {
    return this.documents.length;
  }

  orderBy<Key extends keyof Document>(
    key: Key,
    direction: "asc" | "desc" = "asc"
  ): this {
    this.documents = _.orderBy(this.documents, [key], [direction]);
    return this;
  }

  select<Keys extends keyof Document>(
    ...keys: Keys[]
  ): Query<Pick<Document, Keys>> {
    const selected = this.documents.map(
      (doc) => _.pick(doc, keys) as Pick<Document, Keys>
    );
    return new Query<Pick<Document, Keys>>(selected);
  }

  limit(n: number): this {
    this.documents = _.take(this.documents, n);
    return this;
  }

  skip(n: number): this {
    this.documents = _.drop(this.documents, n);
    return this;
  }

  paginate(page: number, pageSize: number): this {
    const start = (page - 1) * pageSize;
    this.documents = _.chain(this.documents).drop(start).take(pageSize).value();
    return this;
  }

  groupBy<Key extends keyof Document>(key: Key): Record<string, Document[]> {
    return _.groupBy(this.documents, (doc) => String(doc[key]));
  }

  // One-to-One relationship
  populateOneToOne<RelatedDocument>(
    localKey: keyof Document,
    foreignKey: keyof RelatedDocument,
    relatedCollection: RelatedDocument[],
    as: string
  ): this {
    this.documents = this.documents.map((doc) => {
      const related = relatedCollection.find(
        (relatedDoc) =>
          (relatedDoc as any)[foreignKey] === (doc as any)[localKey]
      );
      return {
        ...doc,
        [as]: related ?? null,
      };
    });
    return this;
  }

  // One-to-Many relationship
  populateOneToMany<RelatedDocument>(
    localKey: keyof Document,
    foreignKey: keyof RelatedDocument,
    relatedCollection: RelatedDocument[],
    as: string
  ): this {
    this.documents = this.documents.map((doc) => {
      const related = relatedCollection.filter(
        (relatedDoc) =>
          (relatedDoc as any)[foreignKey] === (doc as any)[localKey]
      );
      return {
        ...doc,
        [as]: related,
      };
    });
    return this;
  }

  // Many-to-Many relationship
  populateManyToMany<RelatedDocument>(
    localKey: keyof Document,
    foreignKey: keyof RelatedDocument,
    relatedCollection: RelatedDocument[],
    as: string
  ): this {
    this.documents = this.documents.map((doc) => {
      const related = relatedCollection.filter(
        (relatedDoc) =>
          (relatedDoc as any)[foreignKey] === (doc as any)[localKey]
      );
      return {
        ...doc,
        [as]: related,
      };
    });
    return this;
  }

  toArray(): Document[] {
    return this.documents;
  }

  first(): Document | undefined {
    return _.first(this.documents);
  }

  findOne(predicate: (doc: Document) => boolean): Document | undefined {
    return _.find(this.documents, predicate);
  }
}
