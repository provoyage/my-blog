import { defineCliConfig } from "sanity/cli";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? "";
const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: {
    projectId: sanityProjectId || "placeholder",
    dataset: sanityDataset,
  },
});
