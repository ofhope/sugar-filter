import { isArray, stringifyArray } from "./array";
import { normaliseString } from "./string";

export const isObject = (value) => {
  return typeof value === "object" && !Array.isArray(value) && !!value;
};

export const normaliseObject = (obj) => {
  const keyValuePairs = Object.entries(obj);
  return keyValuePairs.reduce((accumulator, pair) => {
    const [key, value] = pair;
    if (isArray(value)) {
      accumulator[normaliseString(key)] = stringifyArray(value);
      return accumulator;
    }
    if (isObject(value)) {
      accumulator[normaliseString(key)] = normaliseObject(value);
      return accumulator;
    }
    accumulator[normaliseString(key)] = normaliseString(value);
    return accumulator;
  }, {});
};
