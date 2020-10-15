import Box from "@material-ui/core/Box";
import CheckIcon from "@material-ui/icons/Check";
import Fab from "@material-ui/core/Fab";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Typography } from "@material-ui/core";
import styles from "./filters.module.css";
import { useTheme } from "@material-ui/core/styles";

export interface FiltersProps {
  defaultChecked: string[];
  onApplyFilters: (checked: string[]) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  defaultChecked,
  onApplyFilters,
}) => {
  const [checked, setChecked] = React.useState<string[]>(defaultChecked);
  const theme = useTheme();

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <Box component="article" px={2} pb={2}>
        <Typography variant="h1">Filters</Typography>
        <List dense className={styles.root}>
          {[
            "Hoist",
            "Non-slip floor",
            "Peninsular toilet",
            "Publicly accessible",
            "Washbasin",
          ].map((item, i) => (
            <ListItem key={item} button onClick={handleToggle(item)}>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
              <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
                {checked.indexOf(item) !== -1 && (
                  <CheckIcon
                    style={{
                      color: theme.palette.success.main,
                    }}
                  />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {(checked.length !== defaultChecked.length ||
          !checked.every((feature) => defaultChecked.includes(feature))) && (
          <Fab
            className={styles.fab}
            variant="extended"
            color="primary"
            onClick={() => onApplyFilters(checked)}
          >
            Apply
          </Fab>
        )}
      </Box>
    </div>
  );
};
