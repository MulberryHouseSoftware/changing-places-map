import { Box, Typography } from "@material-ui/core";

import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import React from "react";
import { Toilet } from "../Toilet";
import styles from "./info.module.css";

export interface InfoProps {
  toilet: Toilet;
}

export const Info: React.FC<InfoProps> = ({ toilet }) => (
  <div>
    <Box component="article" px={2} pb={2}>
      <Box pb={4}>
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
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${toilet.post_code}&travelmode=walking`}
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
        <Box pb={0}>
          <Typography>{toilet.contact_details}</Typography>
        </Box>
      </Box>
      <Box pb={4}>
        <Typography variant="h2" gutterBottom>
          Hours
        </Typography>
        <ul className={styles.schedule}>
          <li className={styles.item}>
            <Typography component="span" className={styles.day}>
              <Box>Mon - Fri</Box>
            </Typography>
            <Typography component="span" className={styles.hours}>
              <Box>{toilet.opening_hours_mon_fri}</Box>
            </Typography>
          </li>
          <li className={styles.item}>
            <Typography component="span" className={styles.day}>
              Sat - Sun
            </Typography>
            <Typography component="span" className={styles.hours}>
              {toilet.opening_hours_sat_sun}
            </Typography>
          </li>
          <li className={styles.item}>
            <Typography component="span" className={styles.day}>
              Public holidays
            </Typography>
            <Typography component="span" className={styles.hours}>
              {toilet.opening_hours_public_holidays}
            </Typography>
          </li>
        </ul>
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
