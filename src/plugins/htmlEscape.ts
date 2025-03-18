import { HmdPlugin } from "../compiler/types";
import { Token } from "../compiler/token/types";

const ESCAPE_CHARS: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const escape = (origin: string) => {
  let escaped = origin;
  for (const key in ESCAPE_CHARS) {
    const value = ESCAPE_CHARS[key];
    escaped = escaped.replaceAll(key, value);
  }
  return escaped;
};

const htmlEscape: HmdPlugin = {
  name: "htmlEscape",
  apply: (hooks) => {
    // 挂载插件函数到钩子上
    hooks.token.tap("htmlEscape", (tokens: Token[]) => {
      // 对html进行转义
      tokens.forEach((token) => {
        if (token.type === "text") {
          token.value = escape(token.value);
        }
      });
      return tokens;
    });
  },
};
export default htmlEscape;
