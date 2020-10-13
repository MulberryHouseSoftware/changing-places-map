import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Toilet } from "../Toilet";
import { Typography } from "@material-ui/core";
import styles from "./toiletsList.module.css";

const format = (value: number) =>
  new Intl.NumberFormat("en-GB", { maximumSignificantDigits: 2 }).format(value);

export interface ToiletsListHandle {
  scrollIntoView: (id: string) => void;
}

export interface ToiletsListProps {
  toilets: Toilet[];
  selected: string | null;
  onClick: (name: string) => void;
  onInfoClick: (name: string) => void;
  onMouseOver: (id: string) => void;
  onMouseOut: () => void;
}

/**
 * List of changing places
 */
export const ToiletsList = React.forwardRef<
  ToiletsListHandle,
  ToiletsListProps
>(
  (
    { toilets, selected, onClick, onInfoClick, onMouseOver, onMouseOut },
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
          <ListItem
            key={toilet.name}
            ref={refs[toilet.name]}
            aria-label={`Select ${toilet.name}`}
            aria-pressed={toilet.name === selected}
            divider
            button
            selected={toilet.name === selected}
            autoFocus={toilet.name === selected}
            alignItems="flex-start"
            onClick={() => onClick(toilet.name)}
            onMouseOver={() => onMouseOver(toilet.name)}
            onMouseOut={() => onMouseOut()}
          >
            <ListItemText
              primary={toilet.name}
              secondary={
                <>
                  <Typography component="span">{toilet.address}</Typography>
                  {toilet.distance && (
                    <>
                      <br />
                      <Typography component="span">
                        {format(toilet.distance * 0.000621371192)} miles away
                      </Typography>
                    </>
                  )}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label={`Toilet details for ${toilet.name}`}
                onClick={() => onInfoClick(toilet.name)}
              >
                <InfoOutlinedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
);
