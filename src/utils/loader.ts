import type { Loader, LoaderContext } from "astro/loaders";
import { postSchema } from "@/lib/schemas";

// Define any options that the loader needs
export function marbleLoader(options: {
  url: string;
  collection: string;
  apiKey: string;
}): Loader {
  // Configure the loader
  const apiUrl = new URL(options.url);
  // Return a loader object
  return {
    name: "marble-client",
    // Called when updating the collection.
    load: async (context: LoaderContext): Promise<void> => {
      // Load data and update the store
      const response = await fetch(`${apiUrl}/${options.collection}`, {
        headers: {
          Authorization: `Bearer ${options.apiKey}`,
        },
      });
    },
    // Optionally, define the schema of an entry.
    // It will be overridden by user-defined schema.
    schema: postSchema,
  };
}
