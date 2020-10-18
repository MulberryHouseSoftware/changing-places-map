import { FilterableKey, Toilet } from "../Toilet";
import { MapHandle, ToiletMap } from "./Map";
import { ToiletsList, ToiletsListHandle } from "./ToiletsList";

import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import IconButton from "@material-ui/core/IconButton";
import { Info } from "./Info";
import React from "react";
import { SearchBar } from "./SearchBar";
import Toolbar from "@material-ui/core/Toolbar";
import { findToilets } from "../lib/findToilets";
import styles from "./page.module.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const NUM_TOILETS_TO_DISPLAY = 50;

export interface PageProps {
  toilets: Toilet[];
  position: { lat: number; lng: number } | null;
  showInstallPromotion?: boolean;
  onInstallPromotionClick?: () => void;
}

export const Page: React.FC<PageProps> = ({
  toilets,
  position = null,
  showInstallPromotion = false,
  onInstallPromotionClick = () => {},
}) => {
  const mapRef = React.useRef<MapHandle>(null);
  const toiletsListRef = React.useRef<ToiletsListHandle>(null);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  const [filtersChecked, setFiltersChecked] = React.useState<
    Record<FilterableKey, string[]>
  >({
    type: [],
    category: [],
  });

  const filteredToilets = React.useMemo(() => toilets.filter((toilet) => {
    return Object.entries(filtersChecked).every(([key, checked]) => {
      return (
        checked.length === 0 ||
        checked.includes(toilet[key as keyof Toilet] as string)
      );
    });
  }), [filtersChecked, toilets]);

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
      const selectedToilet = toilets.find((toilet) => toilet.name === id);

      if (selectedToilet) {
        mapRef.current?.panTo({
          lat: selectedToilet.latLng.lat,
          lng: selectedToilet.latLng.lng,
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

      const selectedToilet = toilets.find((toilet) => toilet.name === id);

      if (selectedToilet) {
        mapRef.current?.panTo({
          lat: selectedToilet.latLng.lat,
          lng: selectedToilet.latLng.lng,
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

  const typeOptions = React.useMemo(
    () => [...new Set(toilets.map((toilet) => toilet.type))],
    [toilets]
  );

  const categoryOptions = React.useMemo(
    () => [...new Set(toilets.map((toilet) => toilet.category))],
    [toilets]
  );

  const nearestToilets = React.useMemo(
    () =>
      findToilets(filteredToilets, center as any, position as any).slice(
        0,
        NUM_TOILETS_TO_DISPLAY
      ),
    [center, position, filteredToilets]
  );

  const selectedToilet = React.useMemo(
    () => toilets.find((toilet) => toilet.name === selected),
    [selected, toilets]
  );

  return (
    <div>
      <div className={styles.header}>
        <Header
          title="Changing Places"
          href="https://www.changingplaces.org/"
          showInstallPromotion={showInstallPromotion}
          onInstallPromotionClick={onInstallPromotionClick}
        />
      </div>
      <main className={styles.changingPlacesLocator}>
        <div className={styles.searchBar}>
          <SearchBar
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
            toilets={nearestToilets}
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
        BackdropProps={{ invisible: true }}
        ModalProps={{ disableBackdropClick: true, keepMounted: true }}
        PaperProps={{ elevation: 0 }}
        style={{ position: "initial" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: matches ? "40vw" : "100vw",
            height: "100vh",
          }}
        >
          <Toolbar />
          <div style={{ flex: "1 1 0", overflowY: "auto" }}>
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
            {drawerContent === "info" ? (
              selectedToilet && <Info toilet={selectedToilet} />
            ) : (
              <Filters
                toilets={toilets}
                filters={{
                  type: {
                    type: "multi-select",
                    label: "Type",
                    options: typeOptions,
                  },
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
          </div>
        </div>
      </Drawer>
    </div>
  );
};
