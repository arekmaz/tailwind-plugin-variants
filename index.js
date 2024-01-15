const plugin = require("tailwindcss/plugin");
/**
 * Plugin helpers
 * @typedef {Object} Config
 * @property {(val: string) => string} attribute;
 * @property {(val: string) => string} notAttribute;
 * @property {(val: string) => string} peerAttribute;
 * @property {(a: string) => string} pseudoclass;
 * @property {(val: string) => string} bool;
 * @property {(val: string) => string} notBool;
 * @property {(val: string) => string} peerBool;
 *
 * @property {(val: string) => string} dataBool;
 * @property {(val: string) => string} notDataBool;
 * @property {(key: string) => (val: string) => string} dataValue;
 * @property {(key: string) => (val: string) => string} notDataValue;
 * @property {(val: string) => string} peerDataBool;
 * @property {(key: string) => (val: string) => string} peerDataValue;
 *
 * @property {(val: string) => string} ariaBool;
 * @property {(val: string) => string} notAriaBool;
 * @property {(key: string) => (val: string) => string} ariaValue;
 * @property {(key: string) => (val: string) => string} notAriaValue;
 * @property {(val: string) => string} peerAriaBool;
 * @property {(key: string) => (val: string) => string} peerAriaValue;
 */

/**
 * A tailwindcss plugin to easily define variants based on values
 *
 * @param {(config: Config) => Record<string, ((v: string) => string)[]>} makeVariants {@link Config}
 * @param {(name: string) => string} buildVariantKey
 */
const addVariantsPlugin = (makeVariants, buildVariantKey = (name) => name) => {
  const data = (key) => `data-${key}`;
  const aria = (key) => `aria-${key}`;

  /** @type {Config['attribute']} */
  const attribute = (a) => `&[${a}]`;

  /** @type {(key: string) => (val: string) => string} */
  const value = (key) => (val) => attribute(`${key}=${val}`);
  /** @type {(key: string) => (val: string) => string} */
  const notValue = (key) => (val) => notAttribute(`${key}=${val}`);

  /** @type {Config['notAttribute']} */
  const notAttribute = (a) => `&:not([${a}])`;

  /** @type {Config['peerAttribute']} */
  const peerAttribute = (a) => `:merge(.peer)[${a}] ~ &`;

  /** @type {Config['pseudoclass']} */
  const pseudoclass = (a) => `&:${a}`;

  /** @type {Config['bool']} */
  const bool = attribute;
  /** @type {Config['notBool']} */
  const notBool = notAttribute;

  /** @type {Config['peerBool']} */
  const peerBool = peerAttribute;

  /** @type {Config['dataBool']} */
  const dataBool = (key) => bool(data(key));
  /** @type {Config['notDataBool']} */
  const notDataBool = (key) => notBool(data(key));
  /** @type {Config['dataValue']} */
  const dataValue = (key) => value(data(key));
  /** @type {Config['notDataValue']} */
  const notDataValue = (key) => notValue(data(key));
  /** @type {Config['peerDataBool']} */
  const peerDataBool = (key) => peerBool(data(key));
  /** @type {Config['peerDataValue']} */
  const peerDataValue = (key) => (val) => peerAttribute(dataValue(key)(val));

  /** @type {Config['ariaBool']} */
  const ariaBool = (key) => bool(aria(key));
  /** @type {Config['notAriaBool']} */
  const notAriaBool = (key) => notBool(aria(key));
  /** @type {Config['ariaValue']} */
  const ariaValue = (key) => value(aria(key));
  /** @type {Config['notAriaValue']} */
  const notAriaValue = (key) => notValue(aria(key));
  /** @type {Config['peerAriaBool']} */
  const peerAriaBool = (key) => peerBool(aria(key));
  /** @type {Config['peerDataValue']} */
  const peerAriaValue = (key) => (val) => peerAttribute(ariaValue(key)(val));

  /** @type {Config} */
  const config = {
    attribute,
    notAttribute,
    peerAttribute,
    pseudoclass,

    bool,
    notBool,
    peerBool,

    dataBool,
    notDataBool,
    dataValue,
    notDataValue,
    peerDataBool,
    peerDataValue,

    ariaBool,
    notAriaBool,
    ariaValue,
    notAriaValue,
    peerAriaValue,
    peerAriaBool,
  };

  const variants = makeVariants(config);

  return plugin(({ addVariant }) => {
    Object.entries(variants).forEach(([variantName, builders]) => {
      if (builders.length === 0) {
        return;
      }

      addVariant(
        buildVariantKey(variantName),
        builders.map((builder) => builder(variantName))
      );
    });
  });
};

module.exports = addVariantsPlugin;
