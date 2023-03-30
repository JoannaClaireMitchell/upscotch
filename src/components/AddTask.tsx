import * as React from "react";

import {ButtonIcon} from "./ButtonIcon";
import {IconAdd} from "./IconAdd";
import {ErrorMessage} from "./ErrorMessage";
import {ListSelector} from "./ListSelector";
import {useDataContext} from "../store";

interface Props {
  listId: number;
}

interface Errors {
  [key: string]: string;
}

interface State extends Props {
  name: string;
  description: string;
  errors: Errors;
}

export type Action =
  | {type: "UPDATE_NAME"; payload: string}
  | {type: "UPDATE_DESCRIPTION"; payload: string}
  | {type: "UPDATE_PARENT_LIST"; payload: number}
  | {type: "RESET"};

const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
const UPDATE_PARENT_LIST = "UPDATE_PARENT_LIST";
const RESET = "RESET";

function createReducer<T>(listId: number) {
  function createInitialState(listId: number) {
    return {
      name: "",
      description: "",
      listId: listId,
      errors: {},
    };
  }

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case UPDATE_NAME: {
        const newState = {
          ...state,
          name: action.payload,
        };
        if (!action.payload) {
          return {
            ...newState,
            errors: {
              ...state.errors,
              name: "A task must have a name",
            },
          };
        }
        delete newState.errors.name;
        return newState;
      }
      case UPDATE_DESCRIPTION: {
        const newState = {
          ...state,
          description: action.payload,
        };
        if (!action.payload) {
          return {
            ...newState,
            errors: {
              ...state.errors,
              description: "A task must have a description",
            },
          };
        }
        delete newState.errors.description;
        return newState;
      }
      case UPDATE_PARENT_LIST: {
        return {...state, listId: action.payload};
      }
      case RESET: {
        return createInitialState(listId);
      }
      default:
        return state;
    }
  }

  return React.useReducer(reducer, listId, createInitialState);
}

export function AddTask(props: Props) {
  const {addTask} = useDataContext();
  const [state, dispatch] = createReducer<State>(props.listId);

  const [visible, setVisible] = React.useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!state.name || !state.description) {
      // generate errors
      dispatch({type: UPDATE_NAME, payload: state.name});
      return dispatch({type: UPDATE_DESCRIPTION, payload: state.description});
    }
    if (!Object.keys(state.errors).length) {
      addTask({
        listId: state.listId,
        name: state.name,
        description: state.description,
      });
      dispatch({type: RESET});
    }
  }

  function handleClose() {
    dispatch({type: RESET});
    setVisible(false);
  }

  if (!visible) {
    return (
      <div style={{padding: "0.5em 0"}}>
        <ButtonIcon onClick={() => setVisible(true)} title="Add New Task">
          <IconAdd />
        </ButtonIcon>
      </div>
    );
  }

  // TODO next: make global components for input and textarea with their labels, or use a library
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "var(--background)",
        padding: "0.5em",
        borderRadius: "4px",
      }}
    >
      <div style={{marginBottom: "0.5em"}}>
        <label htmlFor="name">
          <small>Task Name</small>
        </label>
        <input
          id="name"
          type="text"
          style={{width: "100%", padding: "0.5em"}}
          value={state.name}
          onChange={(e) =>
            dispatch({type: UPDATE_NAME, payload: e.target.value})
          }
        />
        {state.errors["name"] && (
          <ErrorMessage>{state.errors["name"]}</ErrorMessage>
        )}
      </div>
      <div style={{marginBottom: "0.5em"}}>
        <label htmlFor="description">
          <small>Description</small>
        </label>
        <textarea
          id="description"
          style={{width: "100%", padding: "0.5em"}}
          cols={20}
          rows={5}
          value={state.description}
          onChange={(e) =>
            dispatch({type: UPDATE_DESCRIPTION, payload: e.target.value})
          }
          placeholder="Write description here"
        ></textarea>
        {state.errors["description"] && (
          <ErrorMessage>{state.errors["description"]}</ErrorMessage>
        )}
      </div>
      <ListSelector
        listId={props.listId}
        onUpdate={(listId) =>
          dispatch({type: UPDATE_PARENT_LIST, payload: listId})
        }
      />
      <div style={{display: "flex", gap: "0.5em"}}>
        <button type="submit">Add</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </form>
  );
}
