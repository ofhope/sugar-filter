import { makeMatcherFrom } from "./match";

describe("makeMatcherFrom", () => {
  it("convert string into function returning boolean", () => {
    const doesMatch = makeMatcherFrom("bar");
    const mockObject = {
      foo: "bar",
    };

    const result = doesMatch(mockObject);

    expect(result).toEqual(true);
  });
  it("supports property based matching", () => {
    const doesMatch = makeMatcherFrom("foo:bar");
    const mockObject = {
      foo: "bar",
    };

    const result = doesMatch(mockObject);

    expect(result).toEqual(true);
  });
  it("returns false if property doesn't exist", () => {
    const doesMatch = makeMatcherFrom("baz:bar");
    const mockObject = {
      foo: "bar",
    };

    const result = doesMatch(mockObject);

    expect(result).toEqual(false);
  });
});
