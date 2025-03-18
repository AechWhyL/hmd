import { defineConfig } from "rollup";
import packageInfo from "./package.json" with { type: "json" };
import commonjsPlugin from "@rollup/plugin-commonjs";
import jsonPlugin from '@rollup/plugin-json'
import tsPlugin from "@rollup/plugin-typescript";

const libConfig =  defineConfig({
  input: {
    lib: "src/index.ts",
    plugins: "plugins/index.ts",
  },
  output: [
    {
      dir: "dist/esm",
      format:"esm",
      entryFileNames:"[name]/index.js",
    },
    {
      dir: "dist/cjs",
      format:"cjs",
      entryFileNames:"[name]/index.js",
    }
  ],
  plugins: [
    commonjsPlugin(),
    jsonPlugin(),
    tsPlugin(),
  ],
  external:[
    ...Object.keys(packageInfo.dependencies)
  ]
});

// const dtsConfig = defineConfig({
//   input:{

//   }
// })

export default [libConfig]