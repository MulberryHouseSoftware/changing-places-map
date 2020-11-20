import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import styles from "./appDrawer.module.css";

export interface AppDrawerProps {
  onDrawerClose: () => void;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({ onDrawerClose }) => {
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Toolbar>
        <div className={styles.title} />
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => onDrawerClose()}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Box
        px={2}
        pb={2}
        flex="1 1 auto"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h1" color="primary" gutterBottom>
            <Link
              href="https://www.aveso.co.uk/"
              color="inherit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aveso
            </Link>
          </Typography>
          <Typography gutterBottom>
            Official sponsor of Changing Places
          </Typography>
          <Divider />
        </Box>
        <Box>
          <Typography>
            <Link href="https://www.astorbannerman.co.uk/privacy-policy/">
              Privacy Policy
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
