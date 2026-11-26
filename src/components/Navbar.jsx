
import { useEffect, useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import { fetchContentful } from "../services/contentful";
import { NAVBAR_QUERY } from "../graphql/navbarQuery";

function Navbar() {
  const [navbar, setNavbar] = useState(null);

  useEffect(() => {
    async function getNavbar() {
      try {
        const data = await fetchContentful(NAVBAR_QUERY);

        setNavbar(data.navbarCollection.items[0]);
      } catch (error) {
        console.error("Navbar fetch error:", error);
      }
    }

    getNavbar();
  }, []);

  if (!navbar) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        {navbar.logo && (
          <img
            src={navbar.logo.url}
            alt="HealthNova"
            width="45"
            style={{ marginRight: "10px" }}
          />
        )}

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          HealthNova
        </Typography>

        {navbar.menuItemsCollection.items.map((item) => (
          <Button
            key={item.url}
            color="inherit"
            href={item.url}
            target={item.openInNewTab ? "_blank" : "_self"}
            rel={item.openInNewTab ? "noopener noreferrer" : undefined}
          >
            {item.label}
          </Button>
        ))}

        {navbar.ctaButton && (
          <Button
            variant="contained"
            color="secondary"
            href={navbar.ctaButton.url}
          >
            {navbar.ctaButton.label}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
