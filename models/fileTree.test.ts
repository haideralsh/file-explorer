import { describe, expect, it } from "vitest";
import { find } from "./fileTree";

describe("FileTree find", () => {
  it("finds the file by name", () => {
    const matches = find([{ name: "foo" }], "foo");

    expect(matches).toEqual([{ name: "foo" }]);
  });

  it("finds the file by substring name match", () => {
    const matches = find([{ name: "foo" }], "o");

    expect(matches).toEqual([{ name: "foo" }]);
  });

  it("ignores case when finding file", () => {
    const matches = find([{ name: "foo" }], "FOO");

    expect(matches).toEqual([{ name: "foo" }]);
  });

  it("does not return non matched files", () => {
    const matches = find([{ name: "foo" }, { name: "bar" }], "foo");

    expect(matches).toEqual([{ name: "foo" }]);
  });

  it("returns all children of matched item", () => {
    const matches = find([{ name: "foo", files: [{ name: "bar" }] }], "foo");

    expect(matches).toEqual([{ name: "foo", files: [{ name: "bar" }] }]);
  });

  it("returns any matched children with their parents", () => {
    const matches = find([{ name: "foo", files: [{ name: "bar" }] }], "bar");

    expect(matches).toEqual([{ name: "foo", files: [{ name: "bar" }] }]);
  });

  it("does not return non-matched sibilings", () => {
    const matches = find(
      [{ name: "foo", files: [{ name: "bar" }, { name: "baz" }] }],
      "bar"
    );

    expect(matches).toEqual([{ name: "foo", files: [{ name: "bar" }] }]);
  });

  it("returns an empty array if there are no matches", () => {
    const matches = find(
      [{ name: "foo", files: [{ name: "bar" }, { name: "baz" }] }],
      "barbar"
    );

    expect(matches).toEqual([]);
  });
});
