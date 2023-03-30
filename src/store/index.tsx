import * as React from "react";
import * as Types from "./types";

import {reducer} from "./reducer";
import * as Constants from "./constants";
import * as Utils from "./utils";

const initialState: {lists: Types.List[]; tasks: {[key: string]: Types.Task}} =
  {
    lists: [Utils.createNewList(1)],
    tasks: {},
  };

const DataContext = React.createContext<Types.DataContext>({
  ...initialState,
  listData: {},
  addTask: () => {},
  updateTask: () => {},
  removeTask: () => {},
  updateTaskParent: () => {},
  addList: () => {},
  updateListHeading: () => {},
  removeList: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function DataProvider(props: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => ({
      lists: state.lists,
      tasks: state.tasks,
      listData: Utils.splitToLists(state.tasks, state.lists.length),
      addTask: (task: Types.NewTask) =>
        dispatch({type: Constants.ADD_TASK, payload: task}),
      updateTask: (task: Types.Task) =>
        dispatch({type: Constants.UPDATE_TASK, payload: task}),
      removeTask: (taskId: number) =>
        dispatch({type: Constants.REMOVE_TASK, payload: taskId}),
      updateTaskParent: (taskId: number, listId: number) =>
        dispatch({
          type: Constants.UPDATE_TASK_PARENT,
          payload: {taskId, listId},
        }),
      addList: () => dispatch({type: Constants.ADD_LIST}),
      removeList: (listId: number) =>
        dispatch({type: Constants.REMOVE_LIST, payload: listId}),
      updateListHeading: (list: Types.List) =>
        dispatch({type: Constants.UPDATE_LIST_HEADING, payload: list}),
    }),
    [state]
  );

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
}

export function useDataContext(): Types.DataContext {
  return React.useContext(DataContext);
}
