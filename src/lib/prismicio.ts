import * as prismic from "@prismicio/client";
import type { ProjectDocument } from "../types/prismic";

const repositoryName = "corte-films";

export const client = prismic.createClient(repositoryName, {
  accessToken: import.meta.env.PRISMIC_ACCESS_TOKEN,
});

export async function getAllPosts(): Promise<ProjectDocument[]> {
  return await client.getAllByType("projects");
}

/**
 * Resizes/compresses a Prismic (imgix-backed) asset URL instead of shipping
 * the original upload. Safe to call on URLs that already carry query params.
 */
export function prismicImageUrl(
  url: string | null | undefined,
  width: number,
): string | undefined {
  if (!url) return undefined;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}auto=compress,format&w=${width}`;
}
