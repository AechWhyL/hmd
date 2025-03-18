import { defineConfig } from "rollup";
import packageInfo from "../package.json" with { type: "json" };
import commonjsPlugin from "@rollup/plugin-commonjs";
import jsonPlugin from '@rollup/plugin-json'
import tsPlugin from "@rollup/plugin-typescript";
import path from "path";
import { fileURLToPath } from "url";

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../dist/cjs");

export default defineConfig({
  input: "src/index.ts",
  output:{
    dir:distDir,
    format:"cjs",
    preserveModules:true
  },
  plugins:[
    commonjsPlugin(),
    jsonPlugin(),
    tsPlugin({
      declaration:true,
      outDir:distDir,
    }),
  ],
  external:[
    ...Object.keys(packageInfo.dependencies)
  ]
})