import { MongoDBStage, Stage } from "./types";

// Strongly typed pipe function for MongoDB stages
export const pipe = <I, O, T extends Partial<I>>(
    ...stages: Stage<I, O>[]
): MongoDBStage[] => {
    return stages.map((stage) => stage({} as T)); // Each stage returns its MongoDB aggregation stage
};
