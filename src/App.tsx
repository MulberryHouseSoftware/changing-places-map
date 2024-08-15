import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import useSWR from "swr";

import { readAll } from "./api/toiletsAPI";
import styles from "./app.module.css";
import { AppFrame } from "./components/AppFrame";
import { usePosition } from "./hooks/usePosition";

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 * @deprecated Only supported on Chrome and Android Webview.
 */
interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}

function App() {
  const { data } = useSWR("/api/toilets", readAll);
  const deferredPrompt = React.useRef<BeforeInstallPromptEvent | null>(null);
  const [showInstallPromotion, setShowInstallPromotion] = React.useState(false);
  const { position } = usePosition();

  React.useEffect(() => {
    const handleBeforeInstallPromptEvent = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      // Update UI notify the user they can install the PWA
      setShowInstallPromotion(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPromptEvent
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPromptEvent
      );
    };
  }, []);

  const handleInstallPromotionClick = React.useCallback(() => {
    if (deferredPrompt.current) {
      // Hide the app provided install promotion
      setShowInstallPromotion(false);
      // Show the install prompt
      deferredPrompt.current.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.current.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
      });
    }
  }, []);

  if (!data) {
    return (
      <Box
        height={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.app}>
      <AppFrame
        toilets={data ?? []}
        position={position}
        showInstallPromotion={showInstallPromotion}
        onInstallPromotionClick={handleInstallPromotionClick}
      />
    </div>
  );
}

export default App;
