import { pipe } from "./fp";

// String Transformers. Expects `string` returns `string`
export const toString = (a) => a.toString();
export const toLowerCase = (str) => str.toLowerCase();
export const trim = (str) => str.trim();
export const normaliseUTF8 = (str) => str.normalize("NFD"); // standises UTF8 character codes
export const normaliseDiacritics = (str) => str.replace(/[\u0300-\u036f]/g, ""); // normalise diacritics "éàçèñ" -> "eacen"
export const splitOnComma = (str) => str.split(",");
export const normaliseString = pipe(
  toString,
  trim,
  toLowerCase,
  normaliseUTF8,
  normaliseDiacritics
);
