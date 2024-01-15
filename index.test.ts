import { expect, test, vi } from "vitest";
import addVariantsPlugin from ".";

test("empty", () => {
  const p = addVariantsPlugin((b) => ({ selected: [] }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).not.toHaveBeenCalled();
});

test("empty", () => {
  const p = addVariantsPlugin((b) => ({ selected: [b.attribute] }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "selected",
        [
          "&[selected]",
        ],
      ],
    ]
  `);
});

test("attribute", () => {
  const p = addVariantsPlugin((b) => ({
    href: [b.attribute],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "href",
          [
            "&[href]",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("notAttribute", () => {
  const p = addVariantsPlugin((b) => ({
    href: [b.notAttribute],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "href",
          [
            "&:not([href])",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("peerAttribute", () => {
  const p = addVariantsPlugin((b) => ({
    href: [b.peerAttribute],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "href",
          [
            ":merge(.peer)[href] ~ &",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
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

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "hover",
          [
            "&:hover",
          ],
        ],
        [
          "disabled",
          [
            "&:disabled",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("dataBool", () => {
  const p = addVariantsPlugin((b) => ({
    checked: [b.dataBool],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "checked",
          [
            "&[data-checked]",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("notDataBool", () => {
  const p = addVariantsPlugin((b) => ({
    checked: [b.notDataBool],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "checked",
          [
            "&:not([data-checked])",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
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

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "last",
          [
            "&[data-position=last]",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
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

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "last",
          [
            "&:not([data-position=last])",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("peerDataBool", () => {
  const p = addVariantsPlugin((b) => {
    return {
      selected: [b.peerDataBool],
    };
  });

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "selected",
          [
            ":merge(.peer)[data-selected] ~ &",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("peerDataValue", () => {
  const p = addVariantsPlugin((b) => {
    const peerOrientation = b.peerDataValue("orientation");

    return {
      vertical: [peerOrientation],
    };
  });

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "vertical",
          [
            ":merge(.peer)[&[data-orientation=vertical]] ~ &",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("ariaBool", () => {
  const p = addVariantsPlugin((b) => ({
    checked: [b.ariaBool],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "checked",
          [
            "&[aria-checked]",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("notAriaBool", () => {
  const p = addVariantsPlugin((b) => ({
    checked: [b.notDataBool],
  }));

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "checked",
          [
            "&:not([data-checked])",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("ariaValue", () => {
  const p = addVariantsPlugin((b) => {
    const dataPosition = b.ariaValue("position");

    return {
      last: [dataPosition],
    };
  });

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "last",
          [
            "&[aria-position=last]",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("notAriaValue", () => {
  const p = addVariantsPlugin((b) => {
    const ariaPosition = b.notAriaValue("position");

    return {
      last: [ariaPosition],
    };
  });

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "last",
          [
            "&:not([aria-position=last])",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("peerAriaBool", () => {
  const p = addVariantsPlugin((b) => {
    return {
      selected: [b.peerAriaBool],
    };
  });

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "selected",
          [
            ":merge(.peer)[aria-selected] ~ &",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("peerAriaValue", () => {
  const p = addVariantsPlugin((b) => {
    const peerAriaOrientation = b.peerAriaValue("orientation");

    return {
      vertical: [peerAriaOrientation],
    };
  });

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "vertical",
          [
            ":merge(.peer)[&[aria-orientation=vertical]] ~ &",
          ],
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `);
});

test("many composed builders and prefix", () => {
  const p = addVariantsPlugin(
    (b) => {
      const dataState = b.dataValue("state");
      const dataOrientation = b.dataValue("orientation");

      return {
        checked: [b.pseudoclass, b.dataBool, b.attribute, dataState],
        unchecked: [dataState],
        focus: [b.pseudoclass, b.dataBool, b.attribute, dataState],
        hidden: [b.attribute, b.dataBool],
        disabled: [b.attribute, b.dataBool],
        closed: [dataState],
        open: [dataState],
        on: [dataState],
        off: [dataState],
        highlighted: [b.dataBool, dataState],
        horizontal: [dataOrientation],
        vertical: [dataOrientation],
        selected: [b.dataBool],
      };
    },
    (name) => `ui-${name}`
  );

  const addVariant = vi.fn();

  p.handler({ addVariant } as any);

  expect(addVariant.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "ui-checked",
        [
          "&:checked",
          "&[data-checked]",
          "&[checked]",
          "&[data-state=checked]",
        ],
      ],
      [
        "ui-unchecked",
        [
          "&[data-state=unchecked]",
        ],
      ],
      [
        "ui-focus",
        [
          "&:focus",
          "&[data-focus]",
          "&[focus]",
          "&[data-state=focus]",
        ],
      ],
      [
        "ui-hidden",
        [
          "&[hidden]",
          "&[data-hidden]",
        ],
      ],
      [
        "ui-disabled",
        [
          "&[disabled]",
          "&[data-disabled]",
        ],
      ],
      [
        "ui-closed",
        [
          "&[data-state=closed]",
        ],
      ],
      [
        "ui-open",
        [
          "&[data-state=open]",
        ],
      ],
      [
        "ui-on",
        [
          "&[data-state=on]",
        ],
      ],
      [
        "ui-off",
        [
          "&[data-state=off]",
        ],
      ],
      [
        "ui-highlighted",
        [
          "&[data-highlighted]",
          "&[data-state=highlighted]",
        ],
      ],
      [
        "ui-horizontal",
        [
          "&[data-orientation=horizontal]",
        ],
      ],
      [
        "ui-vertical",
        [
          "&[data-orientation=vertical]",
        ],
      ],
      [
        "ui-selected",
        [
          "&[data-selected]",
        ],
      ],
    ]
  `);
});
