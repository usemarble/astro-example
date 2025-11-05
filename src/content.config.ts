import { defineCollection } from "astro:content";
import { fetchTags, fetchPosts } from "@/lib/queries";
import { tagSchema, postSchema } from "@/lib/schemas";

const posts = defineCollection({
  loader: async () => {
    const response = await fetchPosts();
    // Must return an array of entries with an id property
    // or an object with IDs as keys and entries as values
    return response.posts.map((post) => ({
      ...post,
    }));
  },
  schema: postSchema,
});

const tags = defineCollection({
  loader: async () => {
    const response = await fetchTags();

    return response.tags.map((tag) => ({
      ...tag,
      id: tag.slug,
    }));
  },
  schema: tagSchema,
});

export const collections = {
  posts,
  tags,
};
