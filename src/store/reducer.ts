import * as Constants from "./constants";
import * as Types from "./types";
import * as Utils from "./utils";

export function reducer(state: Types.State, action: Types.Action) {
  switch (action.type) {
    case Constants.ADD_LIST: {
      const listId = Utils.generateListId(state.lists);
      return {
        ...state,
        lists: [...state.lists, Utils.createNewList(listId)],
      };
    }

    case Constants.UPDATE_LIST_HEADING: {
      const lists = state.lists.map((list) => {
        if (list.listId === action.payload.listId) {
          return action.payload;
        }
        return list;
      });
      return {
        ...state,
        lists,
      };
    }

    case Constants.REMOVE_LIST: {
      const lists = state.lists.filter(
        (list) => list.listId !== action.payload
      );
      return {...state, lists};
    }

    case Constants.ADD_TASK: {
      const id = Object.values(state.tasks).length + 1;
      return {...state, tasks: {...state.tasks, [id]: {...action.payload, id}}};
    }

    case Constants.UPDATE_TASK: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.id]: {
            ...state.tasks[action.payload.id],
            ...action.payload,
          },
        },
      };
    }

    case Constants.REMOVE_TASK: {
      const tasks = {...state.tasks};
      delete tasks[action.payload];
      return {...state, tasks};
    }

    case Constants.UPDATE_TASK_PARENT: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.taskId]: {
            ...state.tasks[action.payload.taskId],
            listId: action.payload.listId,
          },
        },
      };
    }

    default:
      return state;
  }
}
