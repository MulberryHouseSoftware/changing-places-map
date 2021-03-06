import { FilterableKey, Toilet } from "../Toilet";
import { MapHandle, ToiletMap } from "./Map";
import { ToiletsList, ToiletsListHandle } from "./ToiletsList";

import { AppDrawer } from "./AppDrawer";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import { ErrorBoundary } from "./ErrorBoundary";
import { Filters } from "./Filters";
import { Header } from "./Header";
import IconButton from "@material-ui/core/IconButton";
import { Info } from "./Info";
import { Language } from "../Language";
import React from "react";
import { SearchBar } from "./SearchBar";
import Toolbar from "@material-ui/core/Toolbar";
import { findToilets } from "../lib/findToilets";
import styles from "./appFrame.module.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const NUM_TOILETS_TO_DISPLAY_IN_MAP = 2000;
const NUM_TOILETS_IN_DISPLAY_IN_LIST = 16; // For performance reasons. Ideally virtualize the list

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
  const [selected, setSelected] = React.useState<string | null>(null);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const matches = useMediaQuery("(min-width:600px)");

  const [filtersChecked, setFiltersChecked] = React.useState<
    Record<FilterableKey, string[]>
  >({
    category: [],
  });

  const filteredToilets = React.useMemo(
    () =>
      toilets.filter((toilet) => {
        return Object.entries(filtersChecked).every(([key, checked]) => {
          return (
            checked.length === 0 ||
            checked.includes(toilet[key as keyof Toilet] as string)
          );
        });
      }),
    [filtersChecked, toilets]
  );

  const [isGeolocated, setIsGeolocated] = React.useState(false);

  const [drawerContent, setDrawerContent] = React.useState<
    "info" | "filters" | null
  >(null);

  React.useEffect(() => {
    if (position && !isGeolocated) {
      setCenter(position);
      mapRef.current?.panTo(position);
      setIsGeolocated(true);
    }
  }, [isGeolocated, position]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const panToToilet = React.useCallback(
    (id: string) => {
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
    [panToToilet]
  );

  const handleToiletsListInfoClick = React.useCallback(
    (id) => {
      setSelected(id);
      panToToilet(id);
      setDrawerContent("info");
      handleClickOpen();
    },
    [panToToilet]
  );

  const handleToiletsListHoverStart = React.useCallback((id) => {
    setHovered(id);
  }, []);

  const handleToiletsListHoverEnd = React.useCallback(() => {
    setHovered(null);
  }, []);

  const handleMapClick = React.useCallback(
    (id: string) => {
      setSelected(id);

      const selectedToilet = toilets.find((toilet) => toilet.id === id);

      if (selectedToilet) {
        mapRef.current?.panTo({
          lat: +selectedToilet.lat,
          lng: +selectedToilet.lng,
        });

        toiletsListRef.current?.scrollIntoView(id);
      }
    },
    [toilets]
  );

  const [center, setCenter] = React.useState<{
    lat: number;
    lng: number;
  } | null>({ lat: 52, lng: 0 });

  const handleMapCenterChanged = React.useCallback(
    (center: google.maps.LatLng) => {
      setCenter({ lat: center.lat(), lng: center.lng() });
    },
    []
  );

  const handleMyLocationClick = React.useCallback(() => {
    if (position) {
      setCenter(position);
      mapRef.current?.panTo(position);
    }
  }, [position]);

  const categoryOptions = React.useMemo(
    () => [...new Set(toilets.map((toilet) => toilet.category))],
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
    () => toilets.find((toilet) => toilet.id === selected),
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
                    if (status === "OK") {
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
        open={open}
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
