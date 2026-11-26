
export const HOME_PAGE_QUERY = `
  query {
    pageCollection(
      limit: 1
      preview: true
    ) {
      items {
        title

        contentForHomePageCollection(preview: true) {
          items {
            __typename

            ... on HeroCarousel {
              sys {
                id
              }
              internalName

              slidesCollection(preview: true) {
                items {
                  sys {
                    id
                  }
                  title
                  description
                  heroSlideImage {
                    url
                  }
                }
              }
            }

            ... on ContentSection {
              sys {
                id
              }
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
