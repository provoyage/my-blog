import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

// 独立したStudioとしてデプロイするため、IDを直接指定します
const sanityProjectId = "l1iirws1"; 
const sanityDataset = "production";

export default defineConfig({
  name: "default",
  title: "Karada Henshubu Studio",
  
  projectId: sanityProjectId,
  dataset: sanityDataset,
  
  // Vercel配下（/studio）ではなく独自ドメイン直下で動かすため、basePathを削除または「/」にします
  basePath: "/", 

  plugins: [structureTool(), visionTool()],
  
  schema: {
    types: schemaTypes,
  },
});