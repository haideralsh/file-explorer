import { createMachine } from "xstate";

export type File = {
  name: string;
  files?: FileTree;
};

export type FileTree = Array<File>;

export function find(files: FileTree, query: string): FileTree {
  const result = [];

  for (const file of files) {
    if (file.name.toLowerCase().includes(query.toLowerCase())) {
      result.push(file);
    } else if (file.files) {
      const matches = find(file.files, query);

      if (matches.length) {
        result.push({
          name: file.name,
          files: matches,
        });
      }
    }
  }

  return result;
}

export type FileTreeEvent =
  | "EXPAND_ALL"
  | "COLLAPSE_ALL"
  | "EXPAND_NODE"
  | "SEARCH"
  | "COLLAPSE_NODE";

export const fileTreeMachine = createMachine({
  id: "fileTree",
  initial: "collapsed",
  states: {
    collapsed: {
      on: {
        EXPAND_ALL: "expanded",
        COLLAPSE_ALL: "collapsed",
        EXPAND_NODE: "halfway",
        SEARCH: "expanded",
      },
    },
    expanded: {
      on: {
        COLLAPSE_ALL: "collapsed",
        EXPAND_ALL: "expanded",
        COLLAPSE_NODE: "halfway",
        SEARCH: "expanded",
      },
    },
    halfway: {
      on: {
        COLLAPSE_ALL: "collapsed",
        EXPAND_ALL: "expanded",
        EXPAND_NODE: "halfway",
        COLLAPSE_NODE: "halfway",
        SEARCH: "expanded",
      },
    },
  },

  predictableActionArguments: true,
  preserveActionOrder: true,
});
