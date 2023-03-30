import * as React from "react";

import {ErrorMessage} from "./ErrorMessage";
import {ListSelector} from "./ListSelector";

interface Props {
  description: string;
  name: string;
  listId: number;
  onSave: (name: string, description: string, listId: number) => void;
  onDone: () => void;
}

export function EditTask(props: Props) {
  const [name, setName] = React.useState(props.name);
  const [description, setDescription] = React.useState(props.description);
  const [listId, setListId] = React.useState(props.listId);

  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name) {
      return setNameError("A task must have a name");
    }
    if (!description) {
      return setDescriptionError("A task must have a description");
    }

    if (!nameError && !descriptionError) {
      props.onSave(name, description, listId);
      props.onDone();
    }
  }

  function handleCancel() {
    // Cancel any changes
    setName(props.name);
    setDescription(props.description);

    // Set editing to false
    props.onDone();
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
      <div>
        <label htmlFor="name">
          <small>Task Name</small>
        </label>
        <input
          id="name"
          type="text"
          style={{width: "100%", padding: "0.5em"}}
          value={name}
          onChange={(e) => {
            setNameError("");
            setName(e.target.value);
          }}
        />
        {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
      </div>
      <div>
        <label htmlFor="description">
          <small>Description</small>
        </label>
        <textarea
          id="description"
          cols={20}
          rows={5}
          value={description}
          onChange={(e) => {
            setDescriptionError("");
            setDescription(e.target.value);
          }}
          placeholder="Write description here"
        ></textarea>
        {descriptionError && <ErrorMessage>{descriptionError}</ErrorMessage>}
      </div>
      <ListSelector listId={listId} onUpdate={setListId} />
      <div style={{display: "flex", gap: "0.5em"}}>
        <button
          type="submit"
          disabled={Boolean(nameError) || Boolean(descriptionError)}
        >
          Done
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}
