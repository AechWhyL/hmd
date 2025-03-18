export interface MdASTNodeBase {
  type: string;
  children?: MdASTNode[];
}

export interface Text extends MdASTNodeBase {
  type: "text";
  value: string;
}

export interface Root extends MdASTNodeBase {
  type: "root";
  children: MdASTNode[];
}

export interface Paragraph extends Element {}

export interface Heading extends Element {}

export interface CodeBlock extends Element {}

export interface Element extends MdASTNodeBase {
  type: "element";
  tag: string;
  children: MdASTNode[];
  arrtibutes?: Record<string, string>;
}

export type MdASTNode = Text | Root | Paragraph | Heading | CodeBlock | Element;
