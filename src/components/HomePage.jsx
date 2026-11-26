
import { useEffect, useState } from "react";
import { fetchContentful } from "../services/contentful";
import { HOME_PAGE_QUERY } from "../graphql/homePageQuery";
import HeroSlider from "./HeroSlider";
import ContentSection from "./ContentSection";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

function HomePage() {
  const [homePage, setHomePage] = useState(null);

  const isPreview =
    new URLSearchParams(window.location.search).get("preview") === "true";

  useEffect(() => {
    async function getHomePage() {
      try {
        const data = await fetchContentful(HOME_PAGE_QUERY, isPreview);

        const page = data.pageCollection.items[0];

        setHomePage(page);

        console.log("Home Page Data:", page);
      } catch (error) {
        console.error("Home Page Fetch Error:", error);
      }
    }

    getHomePage();
  }, [isPreview]);

  const liveHomePage = useContentfulLiveUpdates(homePage);

  return (
    <div>
      <h1>{liveHomePage?.title}</h1>

      {liveHomePage?.contentForHomePageCollection?.items.map(
        (section, index) => {
          switch (section.__typename) {
            case "HeroCarousel":
              return (
                <HeroSlider
                  key={section.sys.id}
                  slides={section.slidesCollection.items}
                />
              );

            case "ContentSection":
              return (
                <ContentSection
                  key={section.sys.id}
                  section={section}
                />
              );

            default:
              return null;
          }
        }
      )}
    </div>
  );
}

export default HomePage;
