import { SyncWaterfallHook } from "tapable";
import { Token } from "./token/types";
import { Root } from "./ast/types";

export interface HmdHooks {
  token: SyncWaterfallHook<[Token[]]>;
  ast: SyncWaterfallHook<[Root]>;
  html: SyncWaterfallHook<[string]>;
}

export interface HmdPlugin {
  name: string;
  apply: (hooks: HmdHooks) => void;
}
