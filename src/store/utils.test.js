import {splitToLists, generateListId} from "./utils";

const items = {
  1: {
    id: 1,
    order: 1,
    listId: 1,
    name: "first",
    description: "Geese  can fly",
  },
  2: {
    id: 2,
    order: 2,
    listId: 2,
    name: "second",
    description: "Nom Nom",
  },
  3: {
    id: 3,
    order: 3,
    listId: 1,
    name: "third",
    description: "Sugar cubes",
  },
};

describe("splitToLists", () => {
  it("returns split lists", () => {
    const value = splitToLists(items);
    expect(value).toMatchSnapshot();
  });
  it("can move first item into another list", () => {
    const values = splitToLists({...items, 1: {...items["1"], listId: 2}});
    expect(values).toMatchSnapshot();
  });
  it("can allow all items in second list", () => {
    const values = splitToLists({
      ...items,
      1: {...items["1"], listId: 2},
      3: {...items["3"], listId: 2},
    });
    expect(values).toMatchSnapshot();
  });
  it("allows removal of a middle list", () => {
    const values = splitToLists({
      1: {...items["1"], listId: 1},
      2: {...items["2"], listId: 3},
      3: {...items["3"], listId: 3},
    });

    expect(values).toMatchSnapshot();
  });
});

describe("generateListId", () => {
  it("should return the next unused number", () => {
    const id = generateListId([
      {listId: 1},
      {listId: 3},
      {listId: 5},
      {listId: 7},
      {listId: 8},
    ]);
    expect(id).toEqual(9);
  });
});
