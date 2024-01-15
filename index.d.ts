type Config = {
  attribute: (val: string) => string;
  notAttribute: (val: string) => string;
  peerAttribute: (val: string) => string;
  pseudoclass: (a: string) => string;
  bool: (val: string) => string;
  notBool: (val: string) => string;
  peerBool: (val: string) => string;
  dataBool: (val: string) => string;
  notDataBool: (val: string) => string;
  dataValue: (key: string) => (val: string) => string;
  notDataValue: (key: string) => (val: string) => string;
  peerDataBool: (val: string) => string;
  peerDataValue: (key: string) => (val: string) => string;
  ariaBool: (val: string) => string;
  notAriaBool: (val: string) => string;
  ariaValue: (key: string) => (val: string) => string;
  notAriaValue: (key: string) => (val: string) => string;
  peerAriaValue: (key: string) => (val: string) => string;
};
type BuildVariantsFn = (
  config: Config
) => Record<string, ((v: string) => string)[]>;

type PrefixFn = (name: string) => string;

declare const buildPlugin: (
  build: BuildVariantsFn,
  prefix?: PrefixFn
) => { handler: () => void };

export = buildPlugin;
