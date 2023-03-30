import {DragEvent} from "react";

import {ListHeading} from "./ListHeading";
import {Task} from "./Task";
import {AddTask} from "./AddTask";
import {useDataContext} from "../store";

function allowDrop(event: DragEvent) {
  event.preventDefault();
}

interface Props {
  handleDrop: (event: DragEvent<Element>) => void;
  listId: number;
}

export function List(props: Props) {
  const {listData, removeList, updateTaskParent} = useDataContext();

  const data = listData[props.listId];

  function handleDelete() {
    if (data.length) {
      // TODO next: dispatch popup for user to choose how to handle tasks in the list.
      // For now items are automatically moved to the first list
      for (const task of data) {
        updateTaskParent(task.id, 1);
      }
    }
    removeList(props.listId);
  }

  return (
    <div
      className="droppable"
      id={props.listId.toString()}
      style={{
        backgroundColor: "var(--background-shade)",
        border: "1px solid var(--primary)",
        borderRadius: "4px",
        minHeight: "80vh",
        minWidth: "360px",
        maxWidth: "500px",
        color: "var(--body)",
        padding: "1em",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "0.5em",
      }}
      onDrop={props.handleDrop}
      onDragOver={allowDrop}
    >
      <ListHeading listId={props.listId} onDelete={handleDelete} />
      <hr style={{marginTop: 0}} />
      {data?.length > 0 &&
        data?.map((item) => <Task key={item.id} {...item} />)}
      <AddTask listId={props.listId} />
    </div>
  );
}
