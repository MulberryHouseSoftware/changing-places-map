import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Toilet } from "../Toilet";
import { Typography } from "@material-ui/core";
import { useHover } from "@react-aria/interactions";

const format = (value: number) =>
  new Intl.NumberFormat("en-GB", { maximumSignificantDigits: 2 }).format(value);

export interface ToiletListItemProps {
  toilet: Toilet;
  selected?: boolean;
  onClick: (id: string) => void;
  onInfoClick: (id: string) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

export const ToiletListItem = React.forwardRef<
  HTMLDivElement,
  ToiletListItemProps
>(
  (
    {
      toilet,
      selected = false,
      onClick,
      onInfoClick,
      onHoverStart,
      onHoverEnd,
    },
    ref
  ) => {
    let { hoverProps } = useHover({
      onHoverStart: (e) => {
        onHoverStart(toilet.name);
      },
      onHoverEnd: (e) => {
        onHoverEnd();
      },
    });

    return (
      <ListItem
        key={toilet.name}
        ref={ref}
        {...hoverProps}
        aria-label={`Select ${toilet.name}`}
        aria-pressed={selected}
        divider
        button
        selected={selected}
        autoFocus={selected}
        alignItems="flex-start"
        onClick={() => onClick(toilet.name)}
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
    );
  }
);
