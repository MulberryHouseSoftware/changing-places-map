import React from "react";
import { Toilet } from "../Toilet";
import markerDefault from "../toilet-marker-default.svg";
import markerHover from "../toilet-hover-pin.svg";
import markerSelected from "../toilet-marker-selected.svg";
import styles from "./map.module.css";

export interface MapProps {
  toilets: Toilet[];
  selected?: string | null;
  hovered?: string | null;
  zoomControl?: boolean;
  mapTypeControl?: boolean;
  streetViewControl?: boolean;
  onClick?: (name: string) => void;
  onCenterChanged?: (position: any) => void;
}

export interface MapHandle {
  panTo: ({ lat, lng }: { lat: number; lng: number }) => void;
}

export const Map = React.forwardRef<MapHandle, MapProps>(
  (
    {
      toilets,
      selected = null,
      hovered = null,
      zoomControl = true,
      mapTypeControl = false,
      streetViewControl = false,
      onClick,
      onCenterChanged,
    },
    ref
  ) => {
    const map = React.useRef<google.maps.Map>();
    const markers = React.useRef<google.maps.Marker[]>([]);
    const prevSelected = React.useRef<google.maps.Marker | null>(null);
    const prevHovered = React.useRef<google.maps.Marker | null>(null);

    React.useImperativeHandle(ref, () => ({
      panTo: (position) => {
        map.current && map.current.panTo(position);
      },
    }));

    React.useEffect(() => {
      const center: google.maps.LatLngLiteral = { lat: 52.2053, lng: 0.1218 };

      map.current = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center,
          zoom: 13,
          disableDefaultUI: true,
        }
      );

      const dragEndListener = map.current?.addListener("dragend", () => {
        onCenterChanged?.(map.current?.getCenter());
      });

      const zoomChangedListener = map.current?.addListener(
        "zoom_changed",
        () => {
          onCenterChanged?.(map.current?.getCenter());
        }
      );

      return () => {
        dragEndListener.remove();
        zoomChangedListener.remove();
      };
    }, [onCenterChanged]);

    React.useEffect(() => {
      map.current?.setOptions({
        zoomControl: zoomControl,
        mapTypeControl: mapTypeControl,
        streetViewControl: streetViewControl,
      });
    }, [mapTypeControl, zoomControl, streetViewControl]);

    React.useEffect(() => {
      markers.current = toilets.map((toilet) => {
        const marker = new google.maps.Marker({
          position: { lat: toilet.latLng.lat, lng: +toilet.latLng.lng },
          map: map.current,
          icon: markerDefault,
        });

        marker.addListener("click", () => onClick?.(toilet.name));

        return marker;
      });

      return () =>
        markers.current.forEach((marker) => {
          marker.setMap(null);
        });

      // Remove markers when updating
    }, [toilets, onClick]);

    React.useEffect(() => {
      const index = toilets.findIndex((toilet) => toilet.name === selected);

      if (prevSelected.current) {
        prevSelected.current.setIcon(markerDefault);
      }

      if (index !== -1) {
        markers.current && markers.current[index].setIcon(markerSelected);
        prevSelected.current = markers.current[index];
      }
    }, [toilets, selected]);

    // TODO: Do not show if toilet is currently selected. Also ensure selected toilet is not replaced with default marker
    React.useEffect(() => {
      const index = toilets.findIndex((toilet) => toilet.name === hovered);

      if (prevHovered.current) {
        prevHovered.current.setIcon(markerDefault);
      }

      if (index !== -1) {
        markers.current && markers.current[index].setIcon(markerHover);
        prevHovered.current = markers.current[index];
      }
    }, [toilets, hovered]);

    return <div id="map" className={styles.map}></div>;
  }
);
