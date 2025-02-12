import { INLINE_TOKEN_REGXP } from "./regxp.js";

/**
 * 生成标题token
 * @param {String} line
 * @returns {Token[]}
 */
export const generateHeadingTokens = (line) => {
  let depth = 1;
  const results = [];
  while (line[depth] === "#" && depth < 6) {
    depth++;
  }
  results.push({
    type: "heading",
    value: `<h${depth}>`,
    open: true,
    isSelfClosing: false,
  });
  results.push({
    type: "text",
    value: line.slice(depth).trim(),
  });
  results.push({
    type: "heading",
    value: `</h${depth}>`,
    open: false,
    isSelfClosing: false,
  });
  return results;
};

/**
 * 生成代码块token
 * @param {String[]} lines 代码块各行
 * @param {Number} startIndex 代码块开始行号
 * @param {Number} endIndex 代码块结束行号
 * @returns {Token[]}
 */
export const generateCodeBlockTokens = (lines, startIndex, endIndex) => {
  const results = [];
  console.log(lines[startIndex])
  results.push({
    type: "codeBlock",
    value: "<pre>",
    open: true,
    isSelfClosing: false,
    lang: lines[startIndex].replace(/^```/, "").trim(),
  });
  for (let i = startIndex; i < endIndex; i++) {
    results.push({
      type: "text",
      value: `${lines[i]}\n`,
    });
  }
  results.push({
    type: "codeBlock",
    value: "</pre>",
    open: false,
    isSelfClosing: false,
    lang: lines[startIndex].replace("```", "").trim(),
  });
  return results;
};

/**
 * 生成文本token
 * @param {String} line
 * @returns {Token[]}
 * */
export const generateTextTokens = (line) => {
  const results = [];
  results.push({
    type: "text",
    value: line,
  });
  return results;
};

/**
 * 生成行内粗体token
 * @param {String} line
 * @return {Token[]}
 */
export const generateStrongTokens = (line) => {
  const results = [];
  results.push({
    type: "strong",
    value: "<strong>",
    open: true,
    isSelfClosing: false,
  });
  results.push({
    type: "text",
    value: line.replaceAll("**", ""),
  });
  results.push({
    type: "strong",
    value: "</strong>",
    open: false,
    isSelfClosing: false,
  });
  return results;
};

/**
 * 生成行内斜体token
 * @param {String} line
 * @return {Token[]}
 */
export const generateEmphasisTokens = (line) => {
  const results = [];
  results.push({
    type: "emphasis",
    value: "<em>",
    open: true,
    isSelfClosing: false,
  });
  results.push({
    type: "text",
    value: line.replaceAll("*", ""),
  });
  results.push({
    type: "emphasis",
    value: "</em>",
    open: false,
    isSelfClosing: false,
  });
  return results;
};

export const generateInlineCodeTokens = (line) => {
  const results = [];
  results.push({
    type: "inlineCode",
    value: "<code>",
    open: true,
    isSelfClosing: false,
  });
  results.push({
    type: "text",
    value: line.replaceAll("`", ""),
  });
  results.push({
    type: "inlineCode",
    value: "</code>",
    open: false,
    isSelfClosing: false,
  });
  return results;
};

export const generateParagraphTokens = (line) => {
  const results = [];
  results.push({
    type: "paragraph",
    value: "<p>",
    open: true,
    isSelfClosing: false,
  });

  // 记录多个行内元素的起始和结束位置 i.e: [{startIndex: 0, endIndex: 0, type: 'strong' }]
  const indexs = [];
  for (const key in INLINE_TOKEN_REGXP) {
    const regxp = INLINE_TOKEN_REGXP[key];
    let matches = regxp.exec(line);
    while (matches) {

      // ! 注意，若是已找到最后一个匹配，matches.lastIndex会为undefined
      const startIndex = matches.index;
      const endIndex = matches.lastIndex || line.length;

      // 不能有重叠的匹配
      if (
        indexs.every(
          (item) => item.startIndex !== startIndex && item.endIndex !== endIndex
        )
      ) {
        indexs.push({
          startIndex,
          endIndex,
          type: key,
        });
      }
      matches = regxp.exec(line);
    }
  }

  // 排序
  indexs.sort((a, b) => a.startIndex - b.startIndex);

  // 生成token
  let i = 0;
  for (let j = 0; j < indexs.length; j++) {
    const { startIndex, endIndex, type } = indexs[j];
    console.log(indexs[j])
    // 处理简单文本token
    const plainText = line.substring(i, startIndex);
    if (plainText) {
      results.push(...generateTextTokens(plainText));
    }
    const inline = line.substring(startIndex, endIndex);
    switch (type) {
      case "strong":
        results.push(
          ...generateStrongTokens(inline)
        );
        break;
      case "emphasis":
        results.push(
          ...generateEmphasisTokens(inline)
        );
        break;
      case "inlineCode":
        results.push(
          ...generateInlineCodeTokens(inline)
        );
        break;
    }
    i = endIndex
  }
  // 处理最后一个文本token
  const plainText = line.substring(i);
  if (plainText) {
    results.push(...generateTextTokens(plainText));
  }

  results.push({
    type: "paragraph",
    value: "</p>",
    open: false,
    isSelfClosing: false,
  });
  return results;
};
