import * as Types from "./types";

export function createNewList(listId: number) {
  return {
    description: `Tasks in list ${listId}`,
    listId,
    name: `List ${listId} Name`,
    order: listId,
  };
}

export function generateListId(lists: Types.List[]) {
  let number = lists[lists.length - 1].listId + 1;
  while (lists.some((list) => list.listId === number)) {
    number++;
  }
  return number;
}

export function splitToLists(
  data: {[listId: number]: Types.Task},
  lists: number
): Types.TaskList {
  const columns = Object.values(data).reduce((acc, item) => {
    if (!acc[item.listId]) {
      acc[item.listId] = [item];
    } else {
      acc[item.listId] = [...acc[item.listId], item];
    }
    return acc;
  }, {} as Types.TaskList);

  if (Object.keys(columns).length < lists) {
    for (let index = 1; index <= lists; index++) {
      if (!columns[index]) {
        columns[index] = [];
      }
    }
  }

  return columns;
}
