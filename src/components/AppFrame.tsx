import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { Language } from "../Language";
import { findToilets } from "../lib/findToilets";
import { FilterableKey, Toilet } from "../Toilet";
import { AppDrawer } from "./AppDrawer";
import styles from "./appFrame.module.css";
import { ErrorBoundary } from "./ErrorBoundary";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { Info } from "./Info";
import { MapHandle, ToiletMap } from "./Map";
import { SearchBar } from "./SearchBar";
import { ToiletsList, ToiletsListHandle } from "./ToiletsList";

const NUM_TOILETS_TO_DISPLAY_IN_MAP = 2000;
const NUM_TOILETS_IN_DISPLAY_IN_LIST = 16; // For performance reasons. Ideally virtualize the list

function useQuery() {
  const queryRef = React.useRef<URLSearchParams>(null!);

  const search = useLocation().search;

  queryRef.current = new URLSearchParams(search);

  return queryRef;
}

export interface AppFrameProps {
  toilets: Toilet[];
  position: { lat: number; lng: number } | null;
  showInstallPromotion?: boolean;
  onInstallPromotionClick?: () => void;
}

export const AppFrame: React.FC<AppFrameProps> = ({
  toilets,
  position = null,
  showInstallPromotion = false,
  onInstallPromotionClick = () => {},
}) => {
  const mapRef = React.useRef<MapHandle>(null);
  const toiletsListRef = React.useRef<ToiletsListHandle>(null);
  const [language, setLanguage] = useLocalStorage<Language>("language", "en");
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const matches = useMediaQuery("(min-width:600px)");

  const query = useQuery();
  const history = useHistory();

  const latLng = query.current.get("latLng")?.split(",") ?? null;
  const location = query.current.get("location") ?? null;
  const locationDetail = query.current.get("locationDetail") ?? null;

  const center = React.useMemo(
    () => (latLng ? { lat: +latLng[0], lng: +latLng[1] } : [52, 0]),
    [latLng]
  );

  const setCenter = React.useCallback(
    (
      latLng: {
        lat: number;
        lng: number;
      } | null
    ) => {
      if (latLng !== null) {
        if (query.current.has("latLng")) {
          query.current.set("latLng", `${latLng.lat},${latLng.lng}`);
        } else {
          query.current.append("latLng", `${latLng.lat},${latLng.lng}`);
        }
      } else {
        query.current.delete("latLng");
      }

      query.current.sort();

      history.replace(`/?${query.current.toString()}`);
    },
    [history, query]
  );

  const selected = React.useMemo(
    () => (location !== null ? +location : null),
    [location]
  );

  const setSelected = React.useCallback(
    (loc: number | null) => {
      if (loc !== null) {
        if (query.current.has("location")) {
          query.current.set("location", String(loc));
        } else {
          query.current.append("location", String(loc));
        }
      } else {
        query.current.delete("location");
      }

      query.current.sort();

      history.replace(`/?${query.current.toString()}`);
    },
    [history, query]
  );

  const open = React.useMemo(() => locationDetail, [locationDetail]);

  const setOpen = React.useCallback(
    (detail: number | null) => {
      if (detail !== null) {
        if (query.current.has("locationDetail")) {
          query.current.set("locationDetail", String(detail));
        } else {
          query.current.append("locationDetail", String(detail));
        }
      } else {
        query.current.delete("locationDetail");
      }

      query.current.sort();

      history.replace(`/?${query.current.toString()}`);
    },
    [history, query]
  );

  const [filtersChecked, setFiltersChecked] = React.useState<
    Record<FilterableKey, string[]>
  >({
    category: [],
  });

  const filteredToilets = React.useMemo(() => {
    return toilets.filter((toilet) => {
      return Object.entries(filtersChecked).every(([key, checked]) => {
        return (
          checked.length === 0 ||
          checked.includes(toilet[key as keyof Toilet] as string)
        );
      });
    });
  }, [filtersChecked, toilets]);

  const [isGeolocated, setIsGeolocated] = React.useState(false);

  const [drawerContent, setDrawerContent] = React.useState<"info" | "filters">(
    "info"
  );

  React.useEffect(() => {
    if (position && !isGeolocated) {
      setCenter(position);
      mapRef.current?.panTo(position);
      setIsGeolocated(true);
    }
  }, [isGeolocated, position, setCenter]);

  React.useEffect(() => {
    if (mapRef.current) {
      if (latLng) {
        mapRef.current.panTo({ lat: +latLng[0], lng: +latLng[1] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = React.useCallback(() => {
    setOpen(selected);
  }, [selected, setOpen]);

  const handleClose = React.useCallback(() => {
    setOpen(null);
  }, [setOpen]);

  const panToToilet = React.useCallback(
    (id: number) => {
      const selectedToilet = toilets.find((toilet) => toilet.id === id);

      if (selectedToilet) {
        mapRef.current?.panTo({
          lat: +selectedToilet.lat,
          lng: +selectedToilet.lng,
        });
      }
    },
    [toilets]
  );

  const handleToiletsListClick = React.useCallback(
    (id) => {
      setSelected(id);
      panToToilet(id);
    },
    [panToToilet, setSelected]
  );

  const handleToiletsListInfoClick = React.useCallback(
    (id) => {
      setSelected(id);
      panToToilet(id);
      setDrawerContent("info");
      handleClickOpen();
    },
    [handleClickOpen, panToToilet, setSelected]
  );

  const handleToiletsListHoverStart = React.useCallback((id) => {
    setHovered(id);
  }, []);

  const handleToiletsListHoverEnd = React.useCallback(() => {
    setHovered(null);
  }, []);

  const handleMapClick = React.useCallback(
    (id: number) => {
      setSelected(id);

      const selectedToilet = toilets.find((toilet) => toilet.id === id);

      if (selectedToilet) {
        setCenter({ lat: +selectedToilet.lat, lng: +selectedToilet.lng });
        mapRef.current?.panTo({
          lat: +selectedToilet.lat,
          lng: +selectedToilet.lng,
        });

        toiletsListRef.current?.scrollIntoView(id);
      }
    },
    [setCenter, setSelected, toilets]
  );

  const handleMapCenterChanged = React.useCallback(
    (center: google.maps.LatLng) => {
      setCenter({ lat: center.lat(), lng: center.lng() });
    },
    [setCenter]
  );

  const handleMyLocationClick = React.useCallback(() => {
    if (position) {
      setCenter(position);
      mapRef.current?.panTo(position);
    }
  }, [position, setCenter]);

  const categoryOptions = React.useMemo(
    () => [
      ...new Set(
        toilets
          .map((toilet) => toilet.category)
          .filter((category) => category !== null)
      ),
    ],
    [toilets]
  );

  const nearestToilets = React.useMemo(
    () =>
      findToilets(filteredToilets, center as any, position as any).slice(
        0,
        NUM_TOILETS_TO_DISPLAY_IN_MAP
      ),
    [center, position, filteredToilets]
  );

  const selectedToilet = React.useMemo(
    () => toilets.find((toilet) => selected && toilet.id === +selected),
    [selected, toilets]
  );

  return (
    <>
      <Header
        title="Changing Places International Map"
        href="https://www.aveso.co.uk/"
        language={language}
        onDrawerOpen={() => setDrawerOpen(true)}
        onLanguageChange={setLanguage}
        showInstallPromotion={showInstallPromotion}
        onInstallPromotionClick={onInstallPromotionClick}
      />
      <main className={styles.changingPlacesLocator}>
        <div className={styles.searchBar}>
          <SearchBar
            language={language}
            numFiltersApplied={
              Object.values(filtersChecked).filter(
                (filter) => filter.length > 0
              ).length
            }
            onChange={(option) => {
              if (option?.place_id) {
                const geocoder = new google.maps.Geocoder();

                geocoder.geocode(
                  { placeId: option.place_id },
                  (results, status) => {
                    if (status === "OK" && results) {
                      if (results[0]) {
                        setCenter({
                          lat: results[0].geometry.location.lat(),
                          lng: results[0].geometry.location.lng(),
                        });

                        mapRef?.current?.panTo({
                          lat: results[0].geometry.location.lat(),
                          lng: results[0].geometry.location.lng(),
                        });
                      }
                    } else {
                      window.alert("Geocoder failed due to: " + status);
                    }
                  }
                );
              }
            }}
            onFilterClick={() => {
              setDrawerContent("filters");
              handleClickOpen();
            }}
          />
        </div>
        <div className={styles.map}>
          <ToiletMap
            ref={mapRef}
            toilets={nearestToilets}
            mapTypeControl={matches}
            streetViewControl={matches}
            selected={selected}
            hovered={hovered}
            onClick={handleMapClick}
            onCenterChanged={handleMapCenterChanged}
            onMyLocationClick={handleMyLocationClick}
          />
        </div>
        <div className={styles.list}>
          <ToiletsList
            ref={toiletsListRef}
            toilets={nearestToilets.slice(0, NUM_TOILETS_IN_DISPLAY_IN_LIST)}
            selected={selected}
            onHoverStart={handleToiletsListHoverStart}
            onHoverEnd={handleToiletsListHoverEnd}
            onClick={handleToiletsListClick}
            onInfoClick={handleToiletsListInfoClick}
          />
        </div>
      </main>
      <Drawer
        anchor={matches ? "left" : "bottom"}
        open={open !== null}
        variant="temporary"
        onClose={handleClose}
        disableEnforceFocus
        hideBackdrop
        BackdropProps={{ invisible: true }}
        ModalProps={{ disableBackdropClick: true, keepMounted: false }}
        PaperProps={{ elevation: 0 }}
        style={{ position: "initial" }}
      >
        <div className={styles.drawerContentContainer}>
          <Toolbar />
          <div className={styles.drawerContent}>
            <Toolbar>
              <div className={styles.title} />
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <ErrorBoundary>
              {drawerContent === "info" ? (
                selectedToilet && (
                  <Info
                    toilet={selectedToilet}
                    getDetails={mapRef.current?.getDetails}
                  />
                )
              ) : (
                <Filters
                  toilets={toilets}
                  filters={{
                    category: {
                      type: "multi-select",
                      label: "Category",
                      options: categoryOptions,
                    },
                  }}
                  defaultChecked={filtersChecked}
                  onApplyFilters={(checked) => {
                    setFiltersChecked(checked);
                    handleClose();
                  }}
                />
              )}
            </ErrorBoundary>
          </div>
        </div>
      </Drawer>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <ErrorBoundary>
          <AppDrawer onDrawerClose={() => setDrawerOpen(false)} />
        </ErrorBoundary>
      </Drawer>
    </>
  );
};
