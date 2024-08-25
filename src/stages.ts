import { Stage } from "./types";

export const matchStage = <I>(criteria: Partial<I>): Stage<I, I> => {
    return () => ({
        $match: criteria,
    });
};

export const setStage = <I>(fields: Partial<I>): Stage<I, I> => {
    return () => ({
        $set: fields,
    });
};

export const updateStage = <I>(fields: Partial<I>): Stage<I, I> => {
    return () => ({
        $set: fields, // $set can be used for updates in MongoDB's aggregation pipeline
    });
};

export const mergeStage = <I>(intoCollection: string): Stage<I, I> => {
    return () => ({
        $merge: {
            into: intoCollection,
            whenMatched: "merge", // Options include 'replace', 'keepExisting', etc.
            whenNotMatched: "insert",
        },
    });
};
