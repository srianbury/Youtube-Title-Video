import getPath from "./getPath";

describe("getPath test suite", () => {
  it("should get path", () => {
    const expected = "/v1/watch";
    const actual = getPath("watch");
    expect(actual).toEqual(expected);
  });
});
