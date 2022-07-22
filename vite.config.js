/**
 * https://vitejs.dev/config/
 *
 * @type {import("vite").UserConfigFn}
 */
export default () => {
  process.env["VITE_VERSION"] = Date.now()
  return {

  }
}