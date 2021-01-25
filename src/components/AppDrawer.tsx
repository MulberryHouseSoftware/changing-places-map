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
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      className={styles.drawerContentContainer}
    >
      <Toolbar disableGutters>
        <Box pl={2} className={styles.title}>
          <Typography variant="h1">About</Typography>
        </Box>
        <Box pr={2}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => onDrawerClose()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
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
          <Typography gutterBottom>
            This map is a valuable global resource to map Changing Places
            worldwide. Hosted by{" "}
            <Link
              href="https://www.changingplacesinternational.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Changing Places Toilets International
            </Link>
            , a charity with the aim of facilitating Changing Places to be
            installed in the built environment globally. The map development was
            made possible by{" "}
            <Link
              href="https://www.aveso.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aveso
            </Link>
            , sponsor of Changing Places.
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
