
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;

const DELIVERY_TOKEN = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN;
const LOCAL_PREVIEW_TOKEN = import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN;

const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

export async function fetchContentful(query, isPreview = false) {
  let response;

  if (isPreview) {
    const hostname = window.location.hostname;

    const isLocal =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.");

    if (isLocal) {
      // Local preview: use local Preview token
      response = await fetch(CONTENTFUL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOCAL_PREVIEW_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      });
    } else {
      // Netlify preview: use Netlify Function
      response = await fetch("/.netlify/functions/contentful-preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
    }
  } else {
    // Published content: use Delivery token
    response = await fetch(CONTENTFUL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DELIVERY_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });
  }

  const result = await response.json();

  if (!response.ok || result.errors) {
    throw new Error(
      result.errors?.[0]?.message || "Contentful API request failed"
    );
  }

  return result.data;
}
