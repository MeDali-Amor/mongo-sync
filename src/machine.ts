export class Machine {
    private streams: Array<() => Promise<void>> = [];

    add(stream: () => Promise<void>) {
        this.streams.push(stream);
    }

    async start() {
        for (const stream of this.streams) {
            try {
                await stream();
            } catch (error) {
                console.error("Stream failed:", error);
            }
        }
    }
}

// const runMachine = async () => {
//     const machine = new Machine();

//     // Add example stream to the machine
//     machine.add(async () => {
//         const uri = "mongodb://localhost:27017";
//         const client = new MongoClient(uri);
//         try {
//             await client.connect();
//             const db = client.db("myDatabase");
//             const inputCollection = db.collection("inputCollection");

//             const pipeline = exampleStream;
//             await inputCollection.aggregate(pipeline).toArray(); // Execute on MongoDB

//             console.log("Stream executed successfully");
//         } catch (error) {
//             console.error("Error executing stream:", error);
//         } finally {
//             await client.close();
//         }
//     });

//     // Start the machine
//     await machine.start();
// };

// runMachine();
