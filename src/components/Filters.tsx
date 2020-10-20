import { FilterableKey, Toilet } from "../Toilet";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";
import styles from "./filters.module.css";

export interface FiltersProps {
  toilets: Toilet[];
  filters: {
    [key in FilterableKey]: { type: string; label: string; options: string[] };
  };
  defaultChecked: Record<FilterableKey, string[]>;
  onApplyFilters: (checked: Record<FilterableKey, string[]>) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export const Filters: React.FC<FiltersProps> = ({
  toilets,
  filters,
  defaultChecked,
  onApplyFilters,
}) => {
  const [checked, setChecked] = React.useState<Record<FilterableKey, string[]>>(
    defaultChecked
  );

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    key: string
  ) => {
    setChecked({ ...checked, [key]: event.target.value as string[] });
  };

  const handleClearAll = () => {
    const entries = Object.entries(checked);

    const emptyEntries = entries.map(([key]) => [
      key as FilterableKey,
      [] as string[],
    ]);

    setChecked(Object.fromEntries(emptyEntries));
  };

  const numTotalToilets = toilets.length;

  const numFilteredToilets = toilets.filter((toilet) => {
    return Object.entries(checked).every(([key, checked]) => {
      return (
        checked.length === 0 ||
        checked.includes(toilet[key as keyof Toilet] as string)
      );
    });
  }).length;

  return (
    <div>
      <Box component="article" px={2} pb={2}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h1">Filters</Typography>
          <Button
            variant="text"
            className={styles.button}
            onClick={() => {
              handleClearAll();
            }}
          >
            Clear all
          </Button>
        </Box>
        <Typography>
          {numFilteredToilets} of {numTotalToilets} Changing Places
        </Typography>
        <Box display="flex" flexDirection="column">
          {Object.entries(filters).map(([key, value]) => (
            <FormControl key={key} className={styles.formControl}>
              <InputLabel id={`${key}-mutiple-checkbox-label`}>
                {value.label}
              </InputLabel>
              <Select
                labelId={`${key}-mutiple-checkbox-label`}
                id={`${key}-mutiple-checkbox`}
                multiple
                value={checked[key as FilterableKey]}
                onChange={(event) => handleChange(event, key)}
                input={<Input />}
                renderValue={(selected) => (selected as string[]).join(", ")}
                MenuProps={MenuProps}
              >
                {value.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox
                      checked={
                        checked[key as FilterableKey].indexOf(option) > -1
                      }
                    />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Box>
        <Fab
          className={styles.fab}
          variant="extended"
          color="primary"
          onClick={() => onApplyFilters(checked)}
        >
          Apply
        </Fab>
      </Box>
    </div>
  );
};
