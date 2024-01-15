const plugin = require("tailwindcss/plugin");
/**
 * Plugin config
 * @typedef {Object} Config
 * @property {(a: string) => string} attribute  - The title
 * @property {(key: string) => (val: string) => string} dataAttribute;
 * @property {(a: string) => string} pseudoclass;
 * @property {(val: string) => string} dataBool;
 */

/**
 * A tailwindcss plugin to easily define variants based on values
 *
 * @param {(config: Config) => Record<string, ((v: string) => string)[]>} makeVariants {@link Config}
 * @param {(name: string) => string} buildVariantKey
 */
const addVariantsPlugin = (makeVariants, buildVariantKey = (name) => name) => {
  const attribute = (a) => `&[${a}]`;
  const notAttribute = (a) => `&:not([${a}])`;
  const dataAttribute = (key) => (val) => attribute(`data-${key}=${val}`);

  const pseudoclass = (a) => `&:${a}`;
  const dataBool = (key) => attribute(`data-${key}`);

  const dataState = dataAttribute("state");
  const dataOrientation = dataAttribute("orientation");

  const config = {
    dataAttribute,
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
