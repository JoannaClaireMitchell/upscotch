import React, {ReactNode} from "react";

interface Props {
  children: ReactNode;
  title?: string;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export const ButtonIcon = (props: Props) => {
  return (
    <button
      title={props.title}
      style={{
        display: "flex",
        padding: 1,
        borderRadius: "50%",
        width: "1.8em",
        height: "1.8em",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
