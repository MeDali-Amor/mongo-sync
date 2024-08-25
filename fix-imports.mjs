import fs from "fs";
import path from "path";

const fixImports = async (dir) => {
    try {
        const files = await fs.promises.readdir(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stats = await fs.promises.stat(filePath);

            if (stats.isDirectory()) {
                await fixImports(filePath);
            } else if (path.extname(file) === ".js") {
                let content = await fs.promises.readFile(filePath, "utf8");

                // Only add .js extension to local imports
                const updatedContent = content.replace(
                    /import\s+.*\s+from\s+['"](\.\/[^'"]+)(?=['"])/g,
                    (match, p1) => {
                        // Add .js only if the path does not end with .js
                        if (!p1.endsWith(".js")) {
                            return match.replace(p1, `${p1}.js`);
                        }
                        return match;
                    }
                );

                // Only write the file if content has changed
                if (updatedContent !== content) {
                    console.log(`Updating file: ${filePath}`);
                    await fs.promises.writeFile(
                        filePath,
                        updatedContent,
                        "utf8"
                    );
                }
            }
        }
    } catch (err) {
        console.error("Error during file processing:", err);
    }
};

fixImports("./dist")
    .then(() => console.log("Import paths updated successfully"))
    .catch((err) => console.error("Error updating import paths:", err));
