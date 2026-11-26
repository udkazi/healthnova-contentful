
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;

const DELIVERY_TOKEN = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN;
const LOCAL_PREVIEW_TOKEN = import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN;

const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

export async function fetchContentful(query, isPreview = false) {
  let response;

  // Preview mode
  if (isPreview) {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168.");

    // Local preview: call Contentful Preview API directly
    if (isLocal) {
      if (!LOCAL_PREVIEW_TOKEN) {
        throw new Error("Local Contentful preview token is missing");
      }

      response = await fetch(CONTENTFUL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOCAL_PREVIEW_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      });
    } else {
      // Netlify preview: call server-side function
      response = await fetch("/.netlify/functions/contentful-preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
    }
  } else {
    // Published content: Delivery API
    if (!DELIVERY_TOKEN) {
      throw new Error("Contentful delivery token is missing");
    }

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
