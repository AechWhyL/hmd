import { BLOCK_TOKEN_REGXP } from "./regxp.js";
import {
  generateCodeBlockTokens,
  generateHeadingTokens,
  generateTextTokens,
  generateParagraphTokens,
} from "./utils.js";

/**
 * 转化为token
 * @param {String} text
 * @returns {Token[]}
 */
export const tokenize = (text) => {
  const lines = text.split(/\r?\n/);
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    // 去除行尾的\r
    const line = lines[i];
    console.log(line);
    let isBlock = false;
    for (const key in BLOCK_TOKEN_REGXP) {
      const tokenKey = key;
      if (BLOCK_TOKEN_REGXP[tokenKey].test(line)) {
        isBlock = true;
        switch (tokenKey) {
          case "heading":
            result.push(...generateHeadingTokens(line));
            break;
          case "codeBlock":
            console.log("codeBlock");
            const startIndex = i;
            let endIndex = i + 1;
            while (endIndex < lines.length && lines[endIndex] !== "```") {
              endIndex++;
            }
            if (endIndex < lines.length) {
              result.push(
                ...generateCodeBlockTokens(lines, startIndex, endIndex)
              );
              i = endIndex;
            } else {
              result.push(...generateTextTokens(line));
            }
        }
      }
    }
    if (!isBlock && lines !== "") {
      result.push(...generateParagraphTokens(line));
    }
  }
  return result;
};
