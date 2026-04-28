export default function handler(req, res) {
  res.status(200).json({
    updated: new Date().toISOString(),
    summary: {
      headline: "Austin allergy conditions are high today, driven by elevated tree pollen.",
      consensus: "High",
      agreement: "Single local interpretation",
      mostDisputed: "Mold"
    },
    sources: [
      {
        name: "Austin Pollen (Manual)",
        method: "Daily observed report",
        tree: "High",
        grass: "Moderate",
        weed: "Low",
        mold: "Moderate",
        status: "Updated manually"
      },
      {
        name: "KVUE",
        method: "Local visible report",
        tree: "High",
        grass: "Moderate",
        weed: "Low",
        mold: "Low",
        status: "Manual comparison"
      }
    ]
  });
}
