interface ChangeEvent {
    fullDocument: Document;
}

interface Document {
    [key: string]: any;
}

// MongoDB stage types
export type MongoDBStage = { [key: string]: any };

// Define the generic Stage type
export type Stage<I, O> = (input: Partial<I>) => MongoDBStage;
