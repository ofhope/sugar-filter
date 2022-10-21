import { curry, map, pipe } from "./fp";
import { tokenise } from "./nlp";

const matchPropertyValue = curry((property, value, object) => {
  if (!object[property]) {
    return false;
  }
  return object[property].includes(value);
});

const matchDefault = curry((term: string, object: Record<string, string>) => {
  return Object.values(object).reduce((accumulator, value) => {
    if (accumulator || value.includes(term)) {
      return true;
    }
    return false;
  }, false);
});

// transform term into patially applied match function, waiting of the flag object
const termToMatchFn = (term) => {
  if (term.includes(":")) {
    const [property, value] = term.split(":");
    return matchPropertyValue(property, value);
  }

  return matchDefault(term);
};

const termsToMatchFns = map(termToMatchFn);

const applyMatchers = curry((matcherFns, object) =>
  matcherFns.map((matcher) => matcher(object)).includes(true)
);

// Transform string input into a function expecting a Flag object to match on
// string -> Flag -> boolean
export const makeMatcherFrom = pipe(tokenise, termsToMatchFns, applyMatchers);
