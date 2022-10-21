import { curry, filter, map, pipe, prop } from "./fp";

describe("pipe", () => {
  it("should dasiy chain unary functions together", () => {
    const chain = pipe(
      (a) => a + 1,
      (a) => a * 2
    );

    const result = chain(10);

    expect(result).toEqual(22);
  });
});

describe("curry", () => {
  it("should allow partial application to a function", () => {
    const foo = curry((a, b) => a + b);
    const partiallyApplied = foo(1);
    const result = partiallyApplied(10);

    expect(result).toEqual(11);
  });
});

describe("prop", () => {
  it("should return the property from an object", () => {
    const obj = {
      name: "Foo",
    };
    const name = prop("name");
    const result = name(obj);
    expect(result).toEqual("Foo");
  });
});

describe("map", () => {
  it("should apply a map function to a list", () => {
    const intsToString = map((a) => a.toString());
    const result = intsToString([1, 2, 3]);
    expect(result).toEqual(["1", "2", "3"]);
  });
});

describe("filter", () => {
  it("should apply a filter function to a list", () => {
    const graterThanTwo = filter((a) => a > 2);
    const result = graterThanTwo([1, 2, 3]);
    expect(result).toEqual([3]);
  });
});
