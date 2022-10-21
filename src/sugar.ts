import { normaliseObject } from "./object";
import { makeMatcherFrom } from "./match";
import { curry, filter, map, pipe, prop } from "./fp";

const id = prop("id");
const toDecimal = (a: string): number => parseInt(a, 10);
const idToDecimal = pipe(id, toDecimal);
const objectPipeline = (match) =>
  pipe(map(normaliseObject), filter(match), map(idToDecimal));

export const sugarFilter = curry((haystack, input) => {
  const onMatch = makeMatcherFrom(input);
  const results = objectPipeline(onMatch)(haystack); // collect matched IDs
  return haystack.filter((obj) => results.includes(obj.id));
});
