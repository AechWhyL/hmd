interface TokenBase {
  type: string;
  value: string;
}

interface TagToken extends TokenBase {
  open: boolean;
  isSelfClosing: boolean;
}

interface InlineCodeToken extends TagToken {
  type: "inlineCode";
}

interface ParagraphToken extends TagToken {
  type: "paragraph";
}

interface HeadingToken extends TagToken {
  type: "heading";
}

interface TextToken extends TokenBase {
  type: "text";
}

interface StrongToken extends TagToken {
  type: "strong";
}

interface EmphasisToken extends TagToken {
  type: "emphasis";
}

interface CodeBlockToken extends TagToken {
  type: "codeBlock";
  lang: string;
}

export type Token =
  | TextToken
  | StrongToken
  | EmphasisToken
  | CodeBlockToken
  | HeadingToken
  | InlineCodeToken
  | ParagraphToken;

