import List from "@material-ui/core/List";
import React from "react";
import { Toilet } from "../Toilet";
import { ToiletListItem } from "./ToiletListItem";
import styles from "./toiletsList.module.css";

export interface ToiletsListHandle {
  scrollIntoView: (id: string) => void;
}

export interface ToiletsListProps {
  toilets: Toilet[];
  selected: string | null;
  onClick: (id: string) => void;
  onInfoClick: (id: string) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

export const ToiletsList = React.forwardRef<
  ToiletsListHandle,
  ToiletsListProps
>(
  (
    { toilets, selected, onClick, onInfoClick, onHoverStart, onHoverEnd },
    ref
  ) => {
    const refs = toilets.reduce((acc, value) => {
      acc[value.name] = React.createRef<HTMLDivElement>();
      return acc;
    }, {} as { [index: string]: React.RefObject<HTMLDivElement> });

    React.useImperativeHandle(ref, () => ({
      scrollIntoView: (id: string) => {
        refs[id]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      },
    }));

    return (
      <List disablePadding className={styles.list}>
        {toilets.map((toilet) => (
          <ToiletListItem
            key={toilet.name}
            ref={refs[toilet.name]}
            toilet={toilet}
            selected={toilet.name === selected}
            onClick={() => onClick(toilet.name)}
            onInfoClick={() => onInfoClick(toilet.name)}
            onHoverStart={() => onHoverStart(toilet.name)}
            onHoverEnd={() => onHoverEnd()}
          />
        ))}
      </List>
    );
  }
);
