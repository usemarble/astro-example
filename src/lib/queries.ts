import { getSecret } from "astro:env/server";
import type { Tag, Post, Category } from "./schemas";

const key = getSecret("MARBLE_API_KEY");
const url = getSecret("MARBLE_API_URL");

if (!url || !key) {
  throw new Error(
    "Missing MARBLE_API_URL or MARBLE_API_KEY in environment variables"
  );
}

type PostsResponse = {
  posts: Post[];
  pagination: {
    limit: number;
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    totalPages: number;
    totalItems: number;
  };
};

type CategoriesResponse = {
  categories: Category[];
};

type TagsResponse = {
  tags: Tag[];
};

export async function fetchPosts(queryParams = ""): Promise<PostsResponse> {
  const fullUrl = `${url}/posts${queryParams}`;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch posts from ${fullUrl}:`, {
        status: response.status,
        statusText: response.statusText,
        url: fullUrl,
      });
      return {
        posts: [],
        pagination: {
          limit: 0,
          currentPage: 1,
          nextPage: null,
          previousPage: null,
          totalPages: 0,
          totalItems: 0,
        },
      };
    }

    const data = await response.json();
    return data as PostsResponse;
  } catch (error) {
    console.log(`Error fetching posts from ${fullUrl}:`, error);
    return {
      posts: [],
      pagination: {
        limit: 0,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        totalPages: 0,
        totalItems: 0,
      },
    };
  }
}

export async function fetchCategories(
  queryParams = ""
): Promise<CategoriesResponse> {
  const fullUrl = `${url}/categories${queryParams}`;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch categories from ${fullUrl}:`, {
        status: response.status,
        statusText: response.statusText,
        url: fullUrl,
      });
      return { categories: [] };
    }

    const data = await response.json();
    return data as CategoriesResponse;
  } catch (error) {
    console.error(`Error fetching categories from ${fullUrl}:`, error);
    return { categories: [] };
  }
}

export async function fetchTags(queryParams = ""): Promise<TagsResponse> {
  const fullUrl = `${url}/tags${queryParams}`;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch tags from ${fullUrl}:`, {
        status: response.status,
        statusText: response.statusText,
        url: fullUrl,
      });
      return { tags: [] };
    }

    const data = await response.json();
    return data as TagsResponse;
  } catch (error) {
    console.error(`Error fetching tags from ${fullUrl}:`, error);
    return { tags: [] };
  }
}
