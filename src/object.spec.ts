import { normaliseObject } from "./object";

describe("normaliseObject", () => {
  it("should lowercase object value", () => {
    const mockObject = {
      foo: "BAR",
    };
    const result = normaliseObject(mockObject);

    expect(result).toEqual({ foo: "bar" });
  });
  it("should convert Int value to String", () => {
    const mockObject = {
      id: 1,
    };
    const result = normaliseObject(mockObject);

    expect(result).toEqual({ id: "1" });
  });
  it("should lowercase keys", () => {
    const mockObject = {
      ID: 1,
    };
    const result = normaliseObject(mockObject);

    expect(result).toEqual({ id: "1" });
  });
  it("should convert Array to string", () => {
    const mockObject = {
      tags: ["foo", "BAR"],
    };
    const result = normaliseObject(mockObject);

    expect(result).toEqual({ tags: "foo,bar" });
  });
  it("should convert Array to string", () => {
    const mockObject = {
      tags: ["foo", "BAR"],
    };
    const result = normaliseObject(mockObject);

    expect(result).toEqual({ tags: "foo,bar" });
  });
  it("should normalise keys with diacritics", () => {
    const mockObject = {
      à: "foo",
    };
    const result = normaliseObject(mockObject);

    expect(result).toEqual({ a: "foo" });
  });
  it("should nomalise UTF8", () => {
    const mockObject = {
      フシギダネ: "foo",
    };
    const result = normaliseObject(mockObject);

    expect(result).toEqual({ フシギダネ: "foo" });
  });
  it("should support nested objects", () => {
    const mockObject = {
      a: "foo",
      b: {
        c: "bar",
      },
    };
    const result = normaliseObject(mockObject);

    expect(result).toEqual({ a: "foo", b: { c: "bar" } });
  });
  it("should extract values from arrays of objectss", () => {
    const mockObject = {
      a: [{ b: "foo" }, { c: "bar" }],
    };
    const result = normaliseObject(mockObject);

    expect(result).toEqual({ a: "foo,bar" });
  });
});
