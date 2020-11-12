import Autocomplete from "@material-ui/lab/Autocomplete";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Country } from "../Country";
import Grid from "@material-ui/core/Grid";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import parse from "autosuggest-highlight/parse";
import styles from "./searchBar.module.css";
import throttle from "lodash.throttle";

interface PlaceType {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      }
    ];
  };
}

export interface SearchBarProps {
  country: Country;
  numFiltersApplied?: number;
  onChange: (option: PlaceType | null) => void;
  onFilterClick: () => void;
}

/**
 * List of changing places
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  country,
  numFiltersApplied = 0,
  onChange,
  onFilterClick,
}) => {
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<PlaceType[]>([]);
  const autocompleteService = React.useRef<google.maps.places.AutocompleteService | null>(
    null
  );

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: {
            input: string;
            componentRestrictions: { country: string };
            //location: new google.maps.LatLng()
          },
          callback: (results?: PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        200
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(
      { input: inputValue, componentRestrictions: { country } },
      (results?: PlaceType[]) => {
        if (active) {
          let newOptions = [] as PlaceType[];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, country]);

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Autocomplete
        id="changing-places-search-box"
        aria-label="Search for Changing Places"
        options={options}
        getOptionLabel={(option) => option.description}
        fullWidth
        value={value}
        onChange={(_event: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          onChange(newValue);
        }}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Find a Changing Place"
            fullWidth
          />
        )}
        renderOption={(option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings;

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [
              match.offset,
              match.offset + match.length,
            ])
          );

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={styles.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
      <Button
        className={styles.button}
        aria-label={`Show options for filtering Changing Places results. ${numFiltersApplied} filter${
          numFiltersApplied === 1 ? "" : "s"
        } active`}
        onClick={() => onFilterClick()}
      >
        <Badge badgeContent={numFiltersApplied} color="primary">
          Filter
        </Badge>
      </Button>
    </Box>
  );
};
