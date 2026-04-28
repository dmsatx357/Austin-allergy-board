function levelFromAQI(aqi) {
  if (aqi <= 50) return "Low";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "High";
  return "Very High";
}

export default async function handler(req, res) {
  const lat = 30.2672;
  const lon = -97.7431;

  try {
    const response = await fetch(
      `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${lat}&longitude=${lon}&distance=25&API_KEY=DEMO_KEY`
    );

    const data = await response.json();

    const pm = data.find(d => d.ParameterName === "PM2.5");

    const level = pm ? levelFromAQI(pm.AQI) : "Unavailable";

    res.status(200).json({
      updated: new Date().toISOString(),
      summary: {
        headline: `Austin air quality suggests ${level.toLowerCase()} allergy irritation conditions today.`,
        consensus: level,
        agreement: "Air quality proxy",
        mostDisputed: "Not available yet"
      },
      sources: [
        {
          name: "AirNow (EPA)",
          method: "Air quality proxy",
          tree: "Not directly measured",
          grass: level,
          weed: level,
          mold: level,
          status: "Live"
        },
        {
          name: "KVUE",
          method: "Future scraper",
          tree: "Pending",
          grass: "Pending",
          weed: "Pending",
          mold: "Pending",
          status: "Not automated"
        }
      ]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
