import { defineCollection } from "astro:content";
import { fetchCategories, fetchPosts } from "@/lib/queries";
import { categorySchema, postSchema } from "@/lib/schemas";

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

const categories = defineCollection({
  loader: async () => {
    const response = await fetchCategories();

    return response.categories.map((category) => ({
      ...category,
      id: category.slug,
    }));
  },
  schema: categorySchema,
});

export const collections = {
  posts,
  categories,
};
