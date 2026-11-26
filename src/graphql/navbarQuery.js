export const NAVBAR_QUERY = `
  query {
    navbarCollection(limit: 1) {
      items {
        logo {
          url
        }
        menuItemsCollection {
          items {
            label
            url
            openInNewTab
          }
        }
        ctaButton {
          label
          url
        }
      }
    }
  }
`;
