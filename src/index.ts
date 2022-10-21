import { curry, pipe } from "./fp";
import { normaliseArray } from "./array";
import { normaliseObject } from "./object";
import { splitOnComma } from "./string";

// Flag matchers
const matchPropertyValue = curry((property, value, flag) => {
  if (!flag[property]) {
    return false;
  }
  return flag[property].includes(value);
});

const matchDefault = curry((term, flag) => {
  return (
    flag.id.includes(term) ||
    flag.description.includes(term) ||
    flag.tags.includes(term)
  );
});

// transform term into patially applied match function, waiting of the flag object
const termToMatchFn = (term) => {
  if (term.includes(":")) {
    const [property, value] = term.split(":");
    return matchPropertyValue(property, value);
  }

  return matchDefault(term);
};

const termsToMatchFns = (terms) => {
  return terms.map(termToMatchFn);
};

const applyMatchersToFlag = curry((matcherFns, flag) =>
  matcherFns.map((matcher) => matcher(flag)).includes(true)
);

// Tokeniser, basic comma seperated lists. Expects `string` returns `string[]`
const tokenise = pipe(splitOnComma, normaliseArray);
// Transform string input into a function expecting a Flag object to match on
// string -> Flag -> boolean
const makeMatcherFrom = pipe(tokenise, termsToMatchFns, applyMatchersToFlag);

export const sugarFilter = (haystack, input) => {
  const onMatch = makeMatcherFrom(input);
  const results = haystack
    .map(normaliseObject)
    .filter(onMatch)
    .map((flag) => parseInt(flag.id, 10)); // collect matched IDs
  return haystack.filter((flag) => results.includes(flag.id));
};
