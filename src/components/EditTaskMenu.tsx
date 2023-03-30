import * as React from "react";

import {ButtonIcon} from "./ButtonIcon";
import {IconMore} from "./IconMore";

interface Props {
  onSelectEdit: () => void;
  onRemove: () => void;
}

export function EditTaskMenu(props: Props) {
  const [visible, setVisible] = React.useState(false);
  if (!visible) {
    return (
      <div>
        <ButtonIcon onClick={() => setVisible(true)} title="View Edit Options">
          <IconMore />
        </ButtonIcon>
      </div>
    );
  }
  return (
    <div style={{display: "flex", gap: "0.5em"}}>
      <button style={{flex: "1 1 auto"}} onClick={props.onSelectEdit}>
        Edit
      </button>
      <button style={{flex: "1 1 auto"}} onClick={props.onRemove}>
        remove
      </button>
      <button style={{flex: "1 1 auto"}} onClick={() => setVisible(false)}>
        Cancel
      </button>
    </div>
  );
}
