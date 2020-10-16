import React from "react";
import { Toilet } from "../Toilet";
import { difference } from "../lib/setOperations";
import markerDefault from "../toilet-marker-default.svg";
import markerHover from "../toilet-hover-pin.svg";
import markerSelected from "../toilet-marker-selected.svg";
import styles from "./map.module.css";
import { usePrevious } from "../hooks/usePrevious";

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

export const ToiletMap = React.forwardRef<MapHandle, MapProps>(
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
    const markers = React.useRef<Map<string, google.maps.Marker>>(
      new Map<string, google.maps.Marker>()
    );
    const prevToilets = usePrevious(toilets);

    React.useImperativeHandle(ref, () => ({
      panTo: (position) => {
        map.current && map.current.panTo(position);
      },
    }));

    React.useEffect(() => {
      const center: google.maps.LatLngLiteral = { lat: 51.5074, lng: 0.0 };

      map.current = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center,
          zoom: 11,
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
      const toiletsSet = new Set(toilets.map((toilet) => toilet.name));

      const previousToiletsSet = prevToilets
        ? new Set(prevToilets.map((toilet: Toilet) => toilet.name))
        : new Set<string>();

      const enter = difference(toiletsSet, previousToiletsSet);
      const exit = difference(previousToiletsSet, toiletsSet);

      const enterToilets = toilets.filter((toilet) =>
        [...enter].includes(toilet.name)
      );

      enterToilets.forEach((toilet) => {
        const marker = new google.maps.Marker({
          position: { lat: toilet.latLng.lat, lng: toilet.latLng.lng },
          map: map.current,
          icon: markerDefault,
        });

        marker.set("id", toilet.name);
        marker.addListener("click", () => onClick?.(toilet.name));

        markers.current.set(toilet.name, marker);
      });

      exit.forEach((name) => {
        markers.current.get(name)?.setMap(null);
        markers.current.delete(name);
      });
    }, [toilets, prevToilets, onClick]);

    React.useEffect(() => {
      markers.current.forEach((marker) => marker.setIcon(markerDefault));

      if (hovered) {
        markers.current.get(hovered)?.setIcon(markerHover);
      }

      if (selected) {
        markers.current.get(selected)?.setIcon(markerSelected);
      }
    }, [toilets, selected, hovered]);

    return <div id="map" className={styles.map}></div>;
  }
);
