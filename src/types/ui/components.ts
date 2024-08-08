import {ReactNode} from "react";

export type TableHeaderChild = {
  element: (prop: any) => ReactNode;
  propName?: string;
};

export type TableHeader = {
  title: string;
  slug: string;
  slugLiteral?: string;
  avatar?: {
    sourceName: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
  };
  classes?: string;
  children?: TableHeaderChild[];
  formatter?: (input: string | number) => string;
  screenReadersOnly?: boolean;
  dataClasses?: string;
};
