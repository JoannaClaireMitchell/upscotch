import * as React from "react";

import {EditListHeading} from "./EditListHeading";
import {ButtonIcon} from "./ButtonIcon";
import {IconEdit} from "./IconEdit";
import {useDataContext} from "../store";

interface Props {
  listId: number;
  onDelete: () => void;
}

export function ListHeading(props: Props) {
  const {lists, updateListHeading} = useDataContext();
  const [editing, setEditing] = React.useState(false);

  const listItem = lists.find((list) => list.listId === props.listId);

  if (!listItem) return null;

  function handleSave(name: string, description: string) {
    if (listItem) {
      updateListHeading({...listItem, name, description});
    }
  }

  if (editing) {
    return (
      <EditListHeading
        name={listItem.name}
        description={listItem.description}
        onSave={handleSave}
        onDone={() => setEditing(false)}
        onDelete={props.listId > 1 ? props.onDelete : undefined}
      />
    );
  }
  return (
    <div
      style={{display: "flex", justifyContent: "space-between", gap: "0.5em"}}
    >
      <div style={{width: "100%", wordBreak: "break-word"}}>
        <h4>{listItem.name}</h4>
        <p>{listItem.description}</p>
      </div>
      <div>
        <ButtonIcon onClick={() => setEditing(true)} title="Edit List Heading">
          <IconEdit />
        </ButtonIcon>
      </div>
    </div>
  );
}
