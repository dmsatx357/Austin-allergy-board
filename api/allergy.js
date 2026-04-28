export default function handler(req, res) {
  res.status(200).json({
    updated: new Date().toISOString(),
    summary: {
      headline: "Austin allergy conditions are elevated, with source automation still being configured.",
      consensus: "High",
      agreement: "Pending",
      mostDisputed: "Pending"
    },
    sources: [
      {
        name: "Weather.com Pollen API",
        method: "Official pollen API / needs key",
        tree: "Pending",
        grass: "Pending",
        weed: "Pending",
        mold: "Pending",
        status: "Needs API access"
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
}
