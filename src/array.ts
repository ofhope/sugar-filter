import { pipe } from "./fp";
import { isObject } from "./object";
import { normaliseString } from "./string";

const onDuplicate = (s, i, a) => a.indexOf(s) === i;
const dedupe = (a) => a.filter(onDuplicate);

export const isArray = (value) => {
  return Array.isArray(value) && !!value;
};

const normaliseArrayValue = (value) => {
  if (isObject(value)) {
    return Object.values(value).toString();
  }
  return normaliseString(value);
};
// any[] -> Stirng[]
export const stringifyArray = (a) => a.map(normaliseArrayValue).join(",");
export const normaliseArray = (a) => a.map(normaliseArrayValue);
