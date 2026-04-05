import { createClient } from "@sanity/client";

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? "";
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? "production";
const validProjectIdPattern = /^[a-z0-9-]+$/;
export const hasSanityConfig = validProjectIdPattern.test(sanityProjectId);

export const client = createClient({
  projectId: hasSanityConfig ? sanityProjectId : "placeholder",
  dataset: sanityDataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});
