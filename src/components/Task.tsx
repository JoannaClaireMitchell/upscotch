import * as React from "react";
import {useDataContext} from "../store";

import {EditTask} from "./EditTask";
import {EditTaskMenu} from "./EditTaskMenu";

interface Props {
  id: number;
  name: string;
  description: string;
  order: number;
  listId: number;
}

function drag(event: React.DragEvent) {
  const target = event.target as HTMLDivElement;
  event.dataTransfer.setData("draggable", target.id);
}

export function Task(props: Props) {
  const {removeTask, updateTask} = useDataContext();
  const [editing, setEditing] = React.useState(false);

  function handleSave(name: string, description: string, listId: number) {
    updateTask({
      id: props.id,
      name,
      description,
      listId,
      order: props.order,
    });
  }

  function handleRemove() {
    // TODO next: create prompt "Are you sure" beofre removing
    removeTask(props.id);
  }

  if (editing) {
    return (
      <EditTask
        listId={props.listId}
        name={props.name}
        description={props.description}
        onSave={handleSave}
        onDone={() => setEditing(false)}
      />
    );
  }

  // TODO next: handle order on drag and drop within the same list
  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        borderRadius: "4px",
        color: "var(--body)",
        padding: "0.5em",
      }}
      draggable="true"
      onDragStart={drag}
      id={props.id?.toString()}
    >
      <div style={{marginBottom: "1em"}}>
        <div>
          <strong>{props.name}</strong>
        </div>
        <div>{props.description}</div>
      </div>
      <EditTaskMenu
        onRemove={handleRemove}
        onSelectEdit={() => setEditing(true)}
      />
    </div>
  );
}
