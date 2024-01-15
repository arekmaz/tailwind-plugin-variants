const plugin = require("tailwindcss/plugin");

/**
 * @example pipe(a => a + 2)(3) === 5
 * @example pipe(a => a + 2, a => a - 3)(5) === 4
 * @example pipe(a => a + 5, a => a - 2, a => a * 2)(1) === 8
 */
const pipe =
  (
    /** @type {Function} */
    firstFn,
    /** @type {Function[]} */
    ...fns
  ) =>
  (arg) =>
    fns.reduce((acc, fn) => fn(acc), firstFn(arg));

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
  const dataBool = pipe(data, bool);
  /** @type {Config['notDataBool']} */
  const notDataBool = pipe(data, notBool);
  /** @type {Config['dataValue']} */
  const dataValue = pipe(data, value);
  /** @type {Config['notDataValue']} */
  const notDataValue = pipe(data, notValue);
  /** @type {Config['peerDataBool']} */
  const peerDataBool = pipe(data, peerBool);
  /** @type {Config['peerDataValue']} */
  const peerDataValue = (key) => pipe(dataValue(key), peerAttribute);

  /** @type {Config['ariaBool']} */
  const ariaBool = pipe(aria, bool);
  /** @type {Config['notAriaBool']} */
  const notAriaBool = pipe(aria, notBool);
  /** @type {Config['ariaValue']} */
  const ariaValue = pipe(aria, value);
  /** @type {Config['notAriaValue']} */
  const notAriaValue = pipe(aria, notValue);
  /** @type {Config['peerAriaBool']} */
  const peerAriaBool = pipe(aria, peerBool);
  /** @type {Config['peerDataValue']} */
  const peerAriaValue = (key) => pipe(ariaValue(key), peerAttribute);

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
