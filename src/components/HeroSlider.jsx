
import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";

function HeroSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides?.[activeIndex];

  const inspectorProps = useContentfulInspectorMode({
    entryId: activeSlide?.sys?.id,
  });

  if (!slides || slides.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <Box
      sx={{
        minHeight: 400,
        backgroundImage: `url(${activeSlide.heroSlideImage.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        px: 6,
        color: "white",
      }}
    >
      <Box sx={{ maxWidth: 500 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          {...inspectorProps({ fieldId: "title" })}
        >
          {activeSlide.title}
        </Typography>

        <Typography
          sx={{ my: 2 }}
          {...inspectorProps({ fieldId: "description" })}
        >
          {activeSlide.description}
        </Typography>

        <Button variant="contained" color="secondary">
          Learn More
        </Button>

        <Box sx={{ mt: 3 }}>
          <Button color="inherit" onClick={handlePrevious}>
            Previous
          </Button>

          <Button color="inherit" onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSlider;
