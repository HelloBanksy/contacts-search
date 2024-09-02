export type ArrayItem<A> = A extends Array<infer E> ? E : A;
