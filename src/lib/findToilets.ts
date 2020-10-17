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
      new google.maps.LatLng(toilet.latLng.lat, toilet.latLng.lng)
    ),
    distanceFromUser: userLocation
      ? google.maps.geometry.spherical.computeDistanceBetween(
          userLatLng,
          new google.maps.LatLng(+toilet.latLng.lat, +toilet.latLng.lng)
        )
      : undefined,
  }));

  distances.sort(function (a, b) {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });

  return distances.map((el) => ({
    ...toilets[el.index],
    distance: el.distanceFromUser,
  }));
}
