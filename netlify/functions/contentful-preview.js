
export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
    });
  }

  try {
    const { query, variables } = await request.json();

    // Read server-side Netlify environment variables
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const environment = process.env.CONTENTFUL_ENVIRONMENT;
    const token = process.env.CONTENTFUL_PREVIEW_TOKEN;

    if (!spaceId || !environment || !token) {
      return new Response(
        JSON.stringify({ error: "Missing server configuration" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    const result = await response.text();

    return new Response(result, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Contentful Preview Error:", error);

    return new Response(
      JSON.stringify({ error: "Preview request failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
