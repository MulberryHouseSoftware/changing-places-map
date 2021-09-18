import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetAppIcon from "@material-ui/icons/GetApp";
import MenuIcon from "@material-ui/icons/Menu";
import LanguageIcon from "@material-ui/icons/Translate";
import React from "react";

import { COUNTRIES_LABEL as LANGUAGES_LABEL } from "../constants";
import { ReactComponent as Logo } from "../images/header-logo.svg";
import { Language } from "../Language";
import styles from "./header.module.css";

export interface HeaderProps {
  title: string;
  href: string;
  language: Language;
  onDrawerOpen: () => void;
  onLanguageChange: (language: Language) => void;
  showInstallPromotion?: boolean;
  onInstallPromotionClick?: () => void;
}

const showLanguageMenu = false;

export const Header: React.FC<HeaderProps> = ({
  title,
  href,
  language,
  onDrawerOpen,
  onLanguageChange,
  showInstallPromotion = false,
  onInstallPromotionClick = () => {},
}) => {
  const [languageMenu, setLanguageMenu] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const theme = useTheme();
  const matches = useMediaQuery("(min-width:600px)");

  const handleLanguageIconClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
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
        {showLanguageMenu && (
          <Tooltip title="Change language" enterDelay={300}>
            <Button
              color="inherit"
              aria-owns={languageMenu ? "language-menu" : undefined}
              aria-haspopup="true"
              onClick={handleLanguageIconClick}
            >
              <LanguageIcon />
              <Typography
                variant="h3"
                component="span"
                className={styles.language}
              >
                {
                  LANGUAGES_LABEL.filter((item) => item.code === language)[0][
                    matches ? "text" : "code"
                  ]
                }
              </Typography>
              <ExpandMoreIcon fontSize="small" />
            </Button>
          </Tooltip>
        )}
        <Menu
          id="language-menu"
          anchorEl={languageMenu}
          open={Boolean(languageMenu)}
          onClose={handleLanguageMenuClose}
        >
          {LANGUAGES_LABEL.map((item) => (
            <MenuItem
              key={item.code}
              disabled={item.disabled}
              selected={language === item.code}
              onClick={() => {
                onLanguageChange(item.code);
                handleLanguageMenuClose();
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
