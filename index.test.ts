import { expect, test, vi } from "vitest";
import addVariantsPlugin from ".";

test("empty", () => {
  const p = addVariantsPlugin((b) => ({}));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).not.toHaveBeenCalled();
});

test("attribute", () => {
  const p = addVariantsPlugin((b) => ({
    href: [b.attribute],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toHaveBeenCalledTimes(1);
  expect(addVariant).toBeCalledWith("href", ["&[href]"]);
});

test("notAttribute", () => {
  const p = addVariantsPlugin((b) => ({
    href: [b.notAttribute],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toHaveBeenCalledTimes(1);
  expect(addVariant).toBeCalledWith("href", ["&:not([href])"]);
});

test("peerAttribute", () => {
  const p = addVariantsPlugin((b) => ({
    href: [b.peerAttribute],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toHaveBeenCalledTimes(1);
  expect(addVariant).toBeCalledWith("href", [":merge(.peer)[href] ~ &"]);
});

test("dataBool", () => {
  const p = addVariantsPlugin((b) => ({
    checked: [b.dataBool],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toHaveBeenCalledTimes(1);
  expect(addVariant).toBeCalledWith("checked", ["&[data-checked]"]);
});

test("notDataBool", () => {
  const p = addVariantsPlugin((b) => ({
    checked: [b.notDataBool],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toHaveBeenCalledTimes(1);
  expect(addVariant).toBeCalledWith("checked", ["&:not([data-checked])"]);
});

test("dataValue", () => {
  const p = addVariantsPlugin((b) => {
    const dataPosition = b.dataValue("position");

    return {
      last: [dataPosition],
    };
  });

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toHaveBeenCalledTimes(1);
  expect(addVariant).toHaveBeenLastCalledWith("last", [
    "&[data-position=last]",
  ]);
});

test("notDataValue", () => {
  const p = addVariantsPlugin((b) => {
    const dataPosition = b.notDataValue("position");

    return {
      last: [dataPosition],
    };
  });

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toHaveBeenCalledTimes(1);
  expect(addVariant).toHaveBeenNthCalledWith(1, "last", [
    "&:not([data-position=last])",
  ]);
});

test("pseudoclass", () => {
  const p = addVariantsPlugin((b) => {
    return {
      hover: [b.pseudoclass],
      disabled: [b.pseudoclass],
    };
  });

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toHaveBeenCalledTimes(2);
  expect(addVariant).toHaveBeenNthCalledWith(1, "hover", ["&:hover"]);
  expect(addVariant).toHaveBeenNthCalledWith(2, "disabled", ["&:disabled"]);
});
