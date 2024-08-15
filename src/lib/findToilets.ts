import orderBy from "lodash.orderby";

import { Toilet } from "../Toilet";

export function findToilets(
  toilets: Toilet[],
  searchLocation: { lat: number; lng: number },
  userLocation: { lat: number; lng: number } | null
) {
  const searchLatLng = new google.maps.LatLng(
    searchLocation.lat,
    searchLocation.lng
  );

  const userLatLng = new google.maps.LatLng(
    userLocation?.lat ?? 0,
    userLocation?.lng ?? 0
  );

  const distances = toilets.map((toilet, i) => ({
    index: i,
    value: google.maps.geometry.spherical.computeDistanceBetween(
      searchLatLng,
      new google.maps.LatLng(+toilet.lat, +toilet.lng)
    ),
    distanceFromUser: userLocation
      ? google.maps.geometry.spherical.computeDistanceBetween(
        userLatLng,
        new google.maps.LatLng(+toilet.lat, +toilet.lng)
      )
      : null,
  }));

  return orderBy(distances, ["value"]).map((el) => ({
    ...toilets[el.index],
    distance: el.distanceFromUser,
  }));
}
