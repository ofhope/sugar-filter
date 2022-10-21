import { normaliseObject } from "./object";
import { makeMatcherFrom } from "./match";

export const sugarFilter = (haystack, input) => {
  const onMatch = makeMatcherFrom(input);
  const results = haystack
    .map(normaliseObject)
    .filter(onMatch)
    .map((flag) => parseInt(flag.id, 10)); // collect matched IDs
  return haystack.filter((flag) => results.includes(flag.id));
};
