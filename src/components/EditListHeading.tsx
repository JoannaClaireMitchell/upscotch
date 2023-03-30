import * as React from "react";

import {ErrorMessage} from "./ErrorMessage";

interface Props {
  description: string;
  name: string;
  onSave: (name: string, description: string) => void;
  // If allowed to delete list, then an onDelete function should be supplied.
  onDelete?: () => void;
  onDone: () => void;
}

export function EditListHeading(props: Props) {
  const [name, setName] = React.useState(props.name);
  const [description, setDescription] = React.useState(props.description);
  const [error, setError] = React.useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name) {
      return setError("List must have a name");
    }

    if (!error) {
      props.onSave(name, description);
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
    <form onSubmit={handleSubmit}>
      <div style={{marginBottom: "0.5em"}}>
        <label htmlFor="name">
          <small>List Name</small>
        </label>
        <input
          id="name"
          type="text"
          style={{width: "100%", padding: "0.5em"}}
          value={name}
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write description here"
        ></textarea>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.5em",
          marginBottom: "0.5em",
        }}
      >
        <button type="submit" disabled={Boolean(error)}>
          Done
        </button>
        <button onClick={handleCancel}>Cancel</button>
        {props.onDelete && (
          <button onClick={props.onDelete}>Delete List</button>
        )}
      </div>
    </form>
  );
}
