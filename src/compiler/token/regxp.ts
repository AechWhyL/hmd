export const BLOCK_TOKEN_REGXP = {
  heading: /^#{1,6} (.*)/,
  codeBlock: /^```(.*)/,
};

export const INLINE_TOKEN_REGXP = {
  strong: /\*\*(.*?)\*\*/g,
  emphasis: /\*(.*?)\*/g,
  inlineCode: /`(.*?)`/g,
};
