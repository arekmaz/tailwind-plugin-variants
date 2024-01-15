import { expect, test, vi } from "vitest";
import addVariantsPlugin from ".";

test("empty", () => {
  const p = addVariantsPlugin((b) => ({}));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).not.toHaveBeenCalled();
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

test("dataAttribute", () => {
  const p = addVariantsPlugin((b) => {
    const dataPosition = b.dataAttribute("position");

    return {
      last: [dataPosition],
      first: [dataPosition],
      second: [dataPosition],
    };
  });

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toHaveBeenCalledTimes(3);
  expect(addVariant).toHaveBeenNthCalledWith(1, "last", [
    "&[data-position=last]",
  ]);
  expect(addVariant).toHaveBeenNthCalledWith(2, "first", [
    "&[data-position=first]",
  ]);
  expect(addVariant).toHaveBeenNthCalledWith(3, "second", [
    "&[data-position=second]",
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
