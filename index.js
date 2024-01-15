const plugin = require("tailwindcss/plugin");
/**
 * Plugin config
 * @typedef {Object} Config
 * @property {(a: string) => string} attribute  - The title
 * @property {(key: string) => (val: string) => string} dataVal;
 * @property {(a: string) => string} pseudoclass;
 * @property {(val: string) => string} dataState;
 * @property {(val: string) => string} dataBool;
 * @property {(val: string) => string} dataOrientation;
 */

/**
 * A tailwindcss plugin to easily define variants based on values
 *
 * @param {(config: Config) => Record<string, ((v: string) => string)[]>} makeVariants {@link Config}
 * @param {(name: string) => string} buildVariantKey
 */
const addVariantsPlugin = (makeVariants, buildVariantKey = (name) => name) => {
  const attribute = (a) => `&[${a}]`;
  const dataVal = (key) => (val) => attribute(`data-${key}=${val}`);

  const pseudoclass = (a) => `&:${a}`;
  const dataBool = (key) => attribute(`data-${key}`);

  const dataState = dataVal("state");
  const dataOrientation = dataVal("orientation");

  const config = {
    attribute,
    dataVal,
    pseudoclass,
    dataState,
    dataBool,
    dataOrientation,
  };

  const variants = makeVariants(config);

  return plugin(({ addVariant }) => {
    Object.entries(variants).forEach(([variantName, builders]) => {
      addVariant(
        buildVariantKey(variantName),
        builders.map((builder) => builder(variantName))
      );
    });
  });
};

module.exports = addVariantsPlugin;
