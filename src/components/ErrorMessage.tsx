import React from "react";

import {IconWarn} from "./IconWarn";

interface Props {
  children: React.ReactNode;
}

export function ErrorMessage(props: Props) {
  return (
    <div
      style={{
        color: "var(--warn)",
        fontSize: "0.8em",
        display: "flex",
        gap: "0.2em",
        marginTop: "0.5em",
      }}
    >
      <IconWarn />
      <span>{props.children}</span>
    </div>
  );
}
