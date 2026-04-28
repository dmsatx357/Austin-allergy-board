export default async function handler(req, res) {
  try {
    const response = await fetch("https://austinpollen.com");
    const html = await response.text();

    // VERY simple extraction (works surprisingly well for this site)
    const extract = (label) => {
      const regex = new RegExp(`${label}[^<]*<[^>]*>([^<]+)`, "i");
      const match = html.match(regex);
      return match ? match[1].trim() : "Unavailable";
    };

    const tree = extract("Tree");
    const grass = extract("Grass");
    const weed = extract("Weed");
    const mold = extract("Mold");

    res.status(200).json({
      updated: new Date().toISOString(),
      summary: {
        headline: `Austin allergy conditions are elevated based on local measured counts.`,
        consensus: tree || grass || weed || mold,
        agreement: "Single local measured source",
        mostDisputed: "Not available yet"
      },
      sources: [
        {
          name: "Austin Pollen",
          method: "Local measured counts",
          tree,
          grass,
          weed,
          mold,
          status: "Live"
        },
        {
          name: "KVUE",
          method: "Local visible report / future scraper",
          tree: "Pending",
          grass: "Pending",
          weed: "Pending",
          mold: "Pending",
          status: "Scraper not configured"
        }
      ]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
