export default async function handler(req, res) {
  res.status(200).json({
    updated: new Date().toISOString(),
    summary: {
      consensus: "High",
      agreement: "Moderate",
      mostDisputed: "Mold"
    },
    sources: [
      {
        name: "Tomorrow.io",
        method: "Weather API available / pollen restricted",
        oak: "Unavailable",
        cedar: "Unavailable",
        grass: "Unavailable",
        mold: "Unavailable",
        ragweed: "Unavailable"
      },
      {
        name: "KVUE",
        method: "Local allergy page / next source to parse",
        oak: "Pending",
        cedar: "Pending",
        grass: "Pending",
        mold: "Pending",
        ragweed: "Pending"
      }
    ]
  });
}
