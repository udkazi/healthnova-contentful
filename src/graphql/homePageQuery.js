
export const HOME_PAGE_QUERY = `
  query {
    pageCollection(
      where: { title: "Home page" }
      limit: 1
    ) {
      items {
        title

        contentForHomePageCollection {
          items {
            __typename

            ... on HeroCarousel {
              internalName
              slidesCollection {
                items {
                  description
                  title
                  heroSlideImage {
                    url
                  }
                }
              }
            }

            ... on ContentSection {
              internalName
              description
              imagePosition
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`;
