import { Box, Typography } from "@material-ui/core";

import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import React from "react";
import { Toilet } from "../Toilet";
import defaultPhoto from "../images/default-info-logo.svg";
import styles from "./info.module.css";

export interface InfoProps {
  toilet: Toilet;
  getDetails: any;
}

// TODO: Use toilet.formatted_address rather than getting it from Google?
export const Info: React.FC<InfoProps> = ({ toilet, getDetails }) => {
  const [formattedAddress, setFormattedAddress] = React.useState<string | null>(
    null
  );

  const [weekdayText, setWeekdayText] = React.useState<string[]>([]);
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const request = {
      placeId: toilet.place_id,
      fields: [
        "formatted_address",
        "url",
        "opening_hours",
        "photo",
        "business_status",
      ],
    };

    getDetails(
      request,
      (place: any, status: google.maps.places.PlacesServiceStatus) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          try {
            setFormattedAddress(place.formatted_address ?? null);

            if (place.photos && place.photos.length > 0) {
              setPhotoUrl(place.photos[0].getUrl({ maxHeight: 240 }));
            } else {
              setPhotoUrl(null);
            }

            if (place.opening_hours) {
              setWeekdayText(place.opening_hours.weekday_text);
            } else if (place.business_status === "CLOSED_TEMPORARILY") {
              setWeekdayText(["Temporarily closed"]);
            } else if (place.business_status === "CLOSED_PERMANENTLY") {
              setWeekdayText(["Permanently closed"]);
            } else {
              setWeekdayText([]);
            }
          } catch (error) {
            setFormattedAddress(null);
            setPhotoUrl(null);
            setWeekdayText([]);

            console.error(error);
          }
        } else {
          setFormattedAddress(null);
          setPhotoUrl(null);
          setWeekdayText([]);

          console.warn(`Place details request failed with status: ${status}`);
        }
      }
    );
  }, [getDetails, toilet.place_id]);

  return (
    <div>
      <Box>
        <Box height={240} style={{ overflow: "hidden", position: "relative" }}>
          <img
            src={photoUrl ?? defaultPhoto}
            alt={toilet.name}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              transform: "translateY(-50%) translateX(-50%)",
            }}
          />
        </Box>
      </Box>
      <Box component="article" px={2} py={2}>
        <Box pb={4} style={{ textOverflow: "clip", overflow: "hidden" }}>
          <Typography variant="h1" gutterBottom>
            {toilet.name}
          </Typography>
          <Box pb={2}>
            <Typography>{toilet.address_1}</Typography>
            {toilet.address_2 && <Typography>{toilet.address_2}</Typography>}
            <Typography>
              {[toilet.city, toilet.state, toilet.postcode]
                .filter((text) => Boolean(text))
                .join(", ")}
            </Typography>
            <Typography></Typography>
          </Box>
          {toilet.category && (
            <Box pb={2}>
              <Typography gutterBottom>
                <strong>Category:</strong> {toilet.category}
              </Typography>
            </Box>
          )}
          <Box pb={0}>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${
                formattedAddress ?? toilet.postcode
              }&travelmode=walking`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography
                style={{ alignItems: "center", display: "inline-flex" }}
              >
                Get directions
                <OpenInNewOutlinedIcon
                  style={{ fontSize: "0.875rem", paddingLeft: "4px" }}
                />
              </Typography>
            </a>
          </Box>
        </Box>
        {weekdayText.length > 0 && (
          <Box pb={4}>
            <Typography variant="h2" gutterBottom>
              Hours
            </Typography>
            <ul className={styles.schedule}>
              {weekdayText.map((text) => (
                <li key={text}>
                  <Typography>{text}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}
        {toilet.features.length > 0 && (
          <Box pb={4}>
            <Typography variant="h2" gutterBottom>
              Equipment checklist
            </Typography>
            <ul className={styles.features}>
              {toilet.features.map((item) => (
                <li key={item}>
                  <Typography>{item}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    </div>
  );
};
