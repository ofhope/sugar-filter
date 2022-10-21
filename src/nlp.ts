import { normaliseArray } from "./array";
import { pipe } from "./fp";
import { splitOnComma } from "./string";

// Tokeniser, basic comma seperated lists. Expects `string` returns `string[]`
export const tokenise = pipe(splitOnComma, normaliseArray);
