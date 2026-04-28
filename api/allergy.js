export default async function handler(req, res) {
  try {
    const response = await fetch("https://austinpollen.com");
    const html = await response.text();

    res.status(200).json({
      updated: new Date().toISOString(),
      summary: {
        headline: "Austin allergy data source is being inspected.",
        consensus: "Pending",
        agreement: "Pending",
        mostDisputed: "Pending"
      },
      sources: [
        {
          name: "Austin Pollen",
          method: "Local measured counts / parser being tested",
          tree: "Inspecting",
          grass: "Inspecting",
          weed: "Inspecting",
          mold: "Inspecting",
          status: "Fetched page"
        }
      ],
      debug: {
        htmlLength: html.length,
        includesTree: html.toLowerCase().includes("tree"),
        includesGrass: html.toLowerCase().includes("grass"),
        includesMold: html.toLowerCase().includes("mold"),
        includesWeed: html.toLowerCase().includes("weed"),
        sample: html.slice(0, 3000)
      }
    });
  } catch (err) {
    res.status(500).json({
      updated: new Date().toISOString(),
      summary: {
        headline: "Austin allergy data source could not be inspected.",
        consensus: "Error",
        agreement: "Error",
        mostDisputed: "Error"
      },
      sources: [],
      error: err.message
    });
  }
}
