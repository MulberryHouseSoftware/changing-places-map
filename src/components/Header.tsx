import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import Link from "@material-ui/core/Link";
import { ReactComponent as Logo } from "../images/header-logo.svg";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styles from "./header.module.css";
import { useTheme } from "@material-ui/core/styles";

export interface HeaderProps {
  title: string;
  href: string;
  showInstallPromotion?: boolean;
  onInstallPromotionClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  href,
  showInstallPromotion = false,
  onInstallPromotionClick = () => {},
}) => {
  const theme = useTheme();

  return (
    <div className={styles.root}>
      <AppBar
        color="primary"
        position="fixed"
        style={{
          zIndex: theme.zIndex.drawer + 1,
          boxShadow:
            "0 1px 3px rgba(0,0,0,.1), 0 2px 2px rgba(0,0,0,.06), 0 0 2px rgba(0,0,0,.07)",
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
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
