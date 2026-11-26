
import { Box, Typography } from "@mui/material";

function ContentSection({ section }) {
  const imageOnLeft = section.imagePosition === "left";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: 6,
        flexDirection: imageOnLeft ? "row" : "row-reverse",
      }}
    >
      {/* Image */}
      <Box sx={{ flex: 1 }}>
        <img
          src={section.image.url}
          alt={section.internalName}
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          {section.internalName}
        </Typography>

        <Typography variant="body1">
          {section.description}
        </Typography>
      </Box>
    </Box>
  );
}

export default ContentSection;
