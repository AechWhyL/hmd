import { tokenize } from "./token/index";
import { tokensToMdAst, MdAstToHtml } from "./ast/index";
import { HmdHooks, HmdPlugin } from "./types";
import { SyncWaterfallHook } from "tapable";
import { Token } from "./token/types";
import { Root } from "./ast/types";

class Hmd {
  private hooks: HmdHooks;
  constructor() {
    this.hooks = {
      token: new SyncWaterfallHook<[Token[]]>(["tokens"]),
      ast: new SyncWaterfallHook<[Root]>(["ast"]),
      html: new SyncWaterfallHook<[string]>(["html"]),
    };
  }

  public use(plugin: HmdPlugin) {
    plugin.apply(this.hooks);
    return this;
  }

  public compile(md: string) {
    let tokens = tokenize(md);
    tokens = this.hooks.token.call(tokens);
    let ast = tokensToMdAst(tokens);
    ast = this.hooks.ast.call(ast);
    let html = MdAstToHtml(ast);
    html = this.hooks.html.call(html);
    return html;
  }
}

export default Hmd;
