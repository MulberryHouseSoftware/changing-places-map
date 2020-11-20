import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { COUNTRIES_LABEL } from "../constants";
import { Country } from "../Country";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FlagIcon from "@material-ui/icons/Flag";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { ReactComponent as Logo } from "../images/header-logo.svg";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import styles from "./header.module.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export interface HeaderProps {
  title: string;
  href: string;
  country: Country;
  onDrawerOpen: () => void;
  onCountryChange: (country: Country) => void;
  showInstallPromotion?: boolean;
  onInstallPromotionClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  href,
  country,
  onDrawerOpen,
  onCountryChange,
  showInstallPromotion = false,
  onInstallPromotionClick = () => {},
}) => {
  const [countryMenu, setCountryMenu] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:600px)");

  const handleCountryIconClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setCountryMenu(event.currentTarget);
  };

  const handleCountryMenuClose = () => {
    setCountryMenu(null);
  };

  return (
    <AppBar
      color="primary"
      position="static"
      className={styles.root}
      style={{
        zIndex: theme.zIndex.drawer + 11,
      }}
    >
      <Toolbar>
        <div className={styles.menuButton}>
          <Link href={href} target="_blank" rel="noopener noreferrer">
            <Logo width={32} height={32} />
          </Link>
        </div>
        <Typography variant="h1" className={styles.title}>
          <Link
            href={href}
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </Link>
        </Typography>
        {showInstallPromotion && (
          <Box mr={1}>
            {matches ? (
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<GetAppIcon />}
                className={styles.button}
                onClick={() => {
                  onInstallPromotionClick();
                }}
              >
                Install
              </Button>
            ) : (
              <IconButton
                color="inherit"
                size="small"
                className={styles.button}
                onClick={() => {
                  onInstallPromotionClick();
                }}
              >
                <GetAppIcon />
              </IconButton>
            )}
          </Box>
        )}
        <Tooltip title="Change country" enterDelay={300}>
          <Button
            color="inherit"
            aria-owns={countryMenu ? "country-menu" : undefined}
            aria-haspopup="true"
            onClick={handleCountryIconClick}
          >
            <FlagIcon />
            <Typography
              variant="h3"
              component="span"
              className={styles.country}
            >
              {
                COUNTRIES_LABEL.filter((item) => item.code === country)[0][
                  matches ? "text" : "code"
                ]
              }
            </Typography>
            <ExpandMoreIcon fontSize="small" />
          </Button>
        </Tooltip>
        <Menu
          id="country-menu"
          anchorEl={countryMenu}
          open={Boolean(countryMenu)}
          onClose={handleCountryMenuClose}
        >
          {COUNTRIES_LABEL.map((item) => (
            <MenuItem
              key={item.code}
              disabled={item.disabled}
              selected={country === item.code}
              onClick={() => {
                onCountryChange(item.code);
                handleCountryMenuClose();
              }}
            >
              {item.text}
            </MenuItem>
          ))}
        </Menu>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="Open drawer"
          onClick={onDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
