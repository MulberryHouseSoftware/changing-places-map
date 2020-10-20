import { Box, Typography } from "@material-ui/core";
import { formatDistanceToNow, parse } from "date-fns";

import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import React from "react";
import { Toilet } from "../Toilet";
import styles from "./info.module.css";

export interface InfoProps {
  toilet: Toilet;
  getDetails: any;
}

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const Info: React.FC<InfoProps> = ({ toilet, getDetails }) => {
  const [formattedAddress, setFormattedAddress] = React.useState<string | null>(
    null
  );

  const [periods, setPeriods] = React.useState<any[]>([]);

  React.useEffect(() => {
    const request = {
      placeId: toilet.google_data.place_id,
      fields: ["formatted_address", "url", "opening_hours"],
    };

    getDetails(
      request,
      (place: any, status: google.maps.places.PlacesServiceStatus) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setFormattedAddress(place.formatted_address ?? null);

          if (place.opening_hours) {
            setPeriods(place.opening_hours.periods);
          }
        }
      }
    );
  }, [getDetails, toilet.google_data.place_id]);

  let lastUpdated = toilet.timestamp;

  if (toilet.timestamp) {
    try {
      // 6/19/2013 11:30:24
      const date = parse(toilet.timestamp, "M/d/yyyy kk:mm:ss", new Date());
      lastUpdated = `${formatDistanceToNow(date)} ago`;
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <div>
      <Box component="article" px={2} pb={2}>
        <Box pb={4} style={{ textOverflow: "clip", overflow: "hidden" }}>
          <Typography variant="h1" gutterBottom>
            {toilet.name}
          </Typography>
          <Box pb={2}>
            <Typography>{toilet.address}</Typography>
            <Typography>
              {toilet.town}, {toilet.post_code}
            </Typography>
            <Typography></Typography>
          </Box>
          <Box pb={2}>
            <Typography>
              <strong>Last updated:</strong> {lastUpdated}
            </Typography>
            <Typography>
              <strong>Location:</strong> {toilet.location}
            </Typography>
            <Typography>
              <strong>Type:</strong> {toilet.type}
            </Typography>
            <Typography>
              <strong>Category:</strong> {toilet.category}
            </Typography>
            <Typography>
              <strong>Contact details:</strong> {toilet.contact_details}
            </Typography>
            <Typography>
              <strong>Other comments:</strong> {toilet.other_comments}
            </Typography>
          </Box>
          <Box pb={0}>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${
                formattedAddress ?? toilet.post_code
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
        <Box pb={4}>
          <Typography variant="h2" gutterBottom>
            Hours
          </Typography>
          {periods.length > 0 && (
            <ul className={styles.schedule}>
              {periods.map((period) => (
                <li key={DAYS_OF_WEEK[period.open.day]} className={styles.item}>
                  <Typography component="span" className={styles.day}>
                    <Box>{DAYS_OF_WEEK[period.open.day]}</Box>
                  </Typography>
                  <Typography component="span" className={styles.hours}>
                    <Box>
                      {period.open.time} - {period.close.time}
                    </Box>
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </Box>
        <Box pb={4}>
          <Typography variant="h2" gutterBottom>
            Equipment checklist
          </Typography>
          <ul className={styles.features}>
            {toilet.equipment_checklist.map((item) => (
              <li key={item}>
                <Typography>{item}</Typography>
              </li>
            ))}
          </ul>
        </Box>
        <Box pb={4}>
          <Typography variant="h2" gutterBottom>
            Other helpful information
          </Typography>
          <ul className={styles.features}>
            {toilet.other_helpful_information.map((item) => (
              <li key={item}>
                <Typography>{item}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </div>
  );
};
