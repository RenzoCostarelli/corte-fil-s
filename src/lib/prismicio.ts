import * as prismic from "@prismicio/client";
import type { ProjectDocument } from "../types/prismic";

const repositoryName = "corte-films";

export const client = prismic.createClient(repositoryName, {
  accessToken: import.meta.env.PRISMIC_ACCESS_TOKEN,
});

export async function getAllPosts(): Promise<ProjectDocument[]> {
  return await client.getAllByType("projects");
}
