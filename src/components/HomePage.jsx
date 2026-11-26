import { useEffect, useState } from "react";
import { fetchContentful } from "../services/contentful";
import { HOME_PAGE_QUERY } from "../graphql/homePageQuery";
import HeroSlider from "./HeroSlider";
import ContentSection from "./ContentSection";

function HomePage() {
  const [homePage, setHomePage] = useState(null);

  useEffect(() => {
    async function getHomePage() {
      try {
        const data = await fetchContentful(HOME_PAGE_QUERY);

        const page = data.pageCollection.items[0];

        setHomePage(page);

        console.log("Home Page Data:", page);
      } catch (error) {
        console.error("Home Page Fetch Error:", error);
      }
    }

    getHomePage();
  }, []);

  return (
    <div>
      <h1>{homePage?.title}</h1>

      {homePage?.contentForHomePageCollection?.items.map((section, index) => {
        switch (section.__typename) {
          case "HeroCarousel":
            return (
              <HeroSlider key={index} slides={section.slidesCollection.items} />
            );

          case "ContentSection":
            return <ContentSection key={index} section={section} />;

          default:
            return null;
        }
      })}
    </div>
  );
}

export default HomePage;
