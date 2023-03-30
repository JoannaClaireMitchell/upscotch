import * as React from "react";

import {useDataContext} from "../store";

interface Props {
  listId: number;
  onUpdate: (listId: number) => void;
}

export function ListSelector(props: Props) {
  const [selected, setSelected] = React.useState(props.listId);
  const {lists} = useDataContext();

  function handleChange(e: React.ChangeEvent) {
    const target = e.target as HTMLSelectElement;
    const listId = parseInt(target.value);
    setSelected(listId);
    props.onUpdate(listId);
  }

  return (
    <div style={{marginBottom: "1em"}}>
      <label htmlFor="select-list">
        <small>Select List</small>
      </label>
      <div>
        <select
          id="select-list"
          style={{width: "100%", padding: "0.2em"}}
          value={selected}
          onChange={handleChange}
        >
          {lists.map((list) => {
            return (
              <option key={list.listId} value={list.listId}>
                {list.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
