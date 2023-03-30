import {DragEvent} from "react";
import {useDataContext} from "../store";

import {List} from "./List";

export function ListSection() {
  const {lists, updateTaskParent, addList} = useDataContext();

  function handleDrop(event: DragEvent) {
    event.preventDefault();

    const target = event.target as HTMLDivElement;
    const parent = target.closest(".droppable");
    const tgt = parseInt(parent?.id!);

    const draggable = parseInt(event.dataTransfer.getData("draggable"));

    updateTaskParent(draggable, tgt);
  }

  return (
    <div style={{display: "flex", gap: "1em", padding: "1em"}}>
      {lists.map((list) => {
        return (
          <List
            key={list.listId}
            listId={list.listId}
            handleDrop={handleDrop}
          />
        );
      })}
      <div>
        <button onClick={addList} title="Add New List">
          Add
        </button>
      </div>
    </div>
  );
}
