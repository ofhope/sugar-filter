import { sugarFilter } from "./index";

const mockFlags = [
  {
    id: 1,
    tags: [{ value: "foo" }],
    description: "bar",
  },
  {
    id: 2,
    tags: [{ value: "sun" }],
    description: "moon luna",
  },
  {
    id: 3,
    tags: [{ value: "sun" }, { value: "solar" }],
    description: "bar-ight 2",
  },
];

describe("sugarFilter", () => {
  it("should filter given a string", () => {
    const result = sugarFilter(mockFlags, "foo");

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);
  });
  it("should ignore case", () => {
    const result = sugarFilter(mockFlags, "FOO");

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);
  });
  it("should match numeric values", () => {
    const result = sugarFilter(mockFlags, "1");

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);
  });
  it("should partially match", () => {
    const result = sugarFilter(mockFlags, "bar");

    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(3);
  });
  it("should match property and value given property:value", () => {
    const result = sugarFilter(mockFlags, "id:2");

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(2);
  });
  it("should match tags and value given property:value", () => {
    const result = sugarFilter(mockFlags, "tags:solar");

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(3);
  });
  it("should match mulitple terms", () => {
    const result = sugarFilter(mockFlags, "id:1, id:3");

    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(3);
  });
  it("should ignore whitespace", () => {
    const result = sugarFilter(mockFlags, "  luna  ");

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(2);
  });
  it("should have no results if non matching input given", () => {
    const result = sugarFilter(mockFlags, "garbage input");

    expect(result.length).toEqual(0);
  });
  it("should ignore input if no terms found", () => {
    const result = sugarFilter(mockFlags, "    ");

    expect(result.length).toEqual(3);
  });
  it("should match diacritics", () => {
    const result = sugarFilter(mockFlags, "SÜN");

    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual(2);
    expect(result[1].id).toEqual(3);
  });
});
