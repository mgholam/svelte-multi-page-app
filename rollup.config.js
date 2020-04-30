import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;
const dir = production ? "dist" : "public";

const buildthese = ["", "/admin"];

const COMMON = function (mydir, page) {
  return {
    input: production ? "src/" + page + "/main.js" : "src/" + page + "/debug.js",
    output: {
      sourcemap: !production,
      format: "iife",
      name: "app",
      file: mydir + page + "/bundle.js",
    },
    plugins: [
      copy({
        targets: [
          { src: "src/index.html", dest: mydir + page },
          { src: "src/global.css", dest: mydir + page },
        ],
      }),
      svelte({
        dev: !production,
        css: (css) => {
          css.write(mydir + page + "/bundle.css", !production); // disable sourcemap in prod
        },
      }),
      resolve({ browser: true }),
      commonjs(),
      !production && livereload(mydir),
      production && terser({ compress: true, mangle: true }),
    ],
    watch: {
      clearScreen: true,
    },
  };
};

const exp = (function () {
  var ret = [];
  buildthese.forEach((folder) => ret.push(COMMON(dir, folder)));
  return ret;
})();

export default exp;
