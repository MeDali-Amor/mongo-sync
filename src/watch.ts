import { Collection, ChangeStream } from "mongodb";

export const watchCollection = (
    collection: Collection,
    triggerStream: () => Promise<void>
) => {
    const changeStream: ChangeStream = collection.watch();

    changeStream.on("change", async (next) => {
        console.log("Change detected:", next);
        await triggerStream();
    });

    console.log(`Watching collection: ${collection.collectionName}`);
};
