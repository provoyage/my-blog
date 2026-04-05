import { type SchemaTypeDefinition } from "sanity";
import { affiliateButtonBlockType } from "./objects/affiliateButtonBlockType";
import { comparisonBoxBlockType } from "./objects/comparisonBoxBlockType";
import { comparisonBoxItemType } from "./objects/comparisonBoxItemType";
import { postType } from "./postType";

export const schemaTypes: SchemaTypeDefinition[] = [
  postType,
  affiliateButtonBlockType,
  comparisonBoxItemType,
  comparisonBoxBlockType,
];
