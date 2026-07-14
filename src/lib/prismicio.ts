import * as prismic from "@prismicio/client";

const repositoryName = "corte-films";

export const client = prismic.createClient(repositoryName, {
  accessToken: import.meta.env.PRISMIC_ACCESS_TOKEN,
});
