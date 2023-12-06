import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import {ViteEjsPlugin} from "vite-plugin-ejs";
import { proxyConfiguration } from "./proxy";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      vue(),
      ViteEjsPlugin({
        title: "FGA Front Vue Archetype",
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: "../public",
    },
    server: {
      proxy: proxyConfiguration,
    },
    configureWebpack: {
      output: {
        filename: 'js/build.js',
        chunkFilename: 'js/[name].js'
      },
      module: {
        rules: [{
          test: /node_modules\/@bbva-web-components\/.*\.js/,
          use: { loader: 'babel-loader' }
        }]
      }
    }
});
