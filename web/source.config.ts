import {
  defineConfig,
  defineCollections,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";

const pageSchema = frontmatterSchema;

export const docs = defineCollections({
  type: "doc",
  dir: "content/docs",
  schema: pageSchema,
});

export const docsMeta = defineCollections({
  type: "meta",
  dir: "content/docs",
  schema: metaSchema,
});

export default defineConfig();
