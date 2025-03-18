import { BLOCK_TOKEN_REGXP } from "./regxp";
import { Token } from "./types";
import {
  generateCodeBlockTokens,
  generateHeadingTokens,
  generateTextTokens,
  generateParagraphTokens,
} from "./utils";

/**
 * 转化为token
 * @param {String} text
 * @returns {Token[]}
 */
export const tokenize = (text: string) => {
  const lines = text.split(/\r?\n/);
  const result: Token[] = [];
  for (let i = 0; i < lines.length; i++) {
    // 去除行尾的\r
    const line = lines[i];
    let isBlock = false;
    for (const key in BLOCK_TOKEN_REGXP) {
      const tokenKey = key as keyof typeof BLOCK_TOKEN_REGXP;
      if (BLOCK_TOKEN_REGXP[tokenKey].test(line)) {
        isBlock = true;
        switch (tokenKey) {
          case "heading":
            result.push(...generateHeadingTokens(line));
            break;
          case "codeBlock":
            const startIndex = i + 1;
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
    if (!isBlock && line !== "") {
      result.push(...generateParagraphTokens(line));
    }
  }
  return result;
};
