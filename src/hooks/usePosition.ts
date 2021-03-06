import * as React from "react";

interface Position {
  coords: { latitude: number; longitude: number };
}

interface PositionError {
  message: string;
}

export const usePosition = () => {
  const [position, setPosition] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [error, setError] = React.useState<string | null>(null);

  const onChange = ({ coords }: Position) => {
    setPosition({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  };

  const onError = (error: PositionError) => {
    setError(error.message);
  };

  React.useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }

    const watcher = geo.watchPosition(onChange, onError);

    return () => geo.clearWatch(watcher);
  }, []);

  return { position, error };
};
