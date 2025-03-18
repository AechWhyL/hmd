import { Token } from "../token/types";
import { Root, MdASTNode } from "./types";

export const tokensToMdAst = (tokens: Token[]) => {
  let root: Root = {
    type: "root",
    children: [],
  };

  const stack: MdASTNode[] = [];
  stack.push(root);
  const _makeAst = (token: Token) => {
    let node: MdASTNode | undefined;
    const parent = stack[stack.length - 1];
    if (token.type === "text") {
      node = {
        type: "text",
        value: token.value,
      };
      parent.children!.push(node);
    } else if (token.open === true) {
      if (token.type === "codeBlock") {
        node = {
          type: "element",
          tag: token.value,
          arrtibutes: {
            lang: token.lang,
          },
          children: [],
        };
      } else {
        node = {
          type: "element",
          tag: token.value,
          children: [],
        };
      }
      stack.push(node);
      parent.children!.push(node);
      if (token.isSelfClosing) {
        stack.pop();
      }
    } else if (token.open === false) {
      stack.pop();
    }
  };
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    _makeAst(token);
  }
  return root;
};

export const MdAstToHtml = (ast: Root) => {
  let html = "";
  const _makeHtml = (node: MdASTNode) => {
    if (node.type === "text") {
      html += node.value;
    } else if (node.type === "element") {
      let lang = "";
      if (node.arrtibutes?.lang) {
        lang = node.arrtibutes.lang;
      }
      html += `<${node.tag}${lang ? ` language=${lang}` : ``}>`;
      const children = node.children;
      children.forEach((child) => {
        _makeHtml(child);
      });
      html += `</${node.tag}>`;
    }
  };
  ast.children.forEach((child) => {
    _makeHtml(child);
  });
  return html;
};
