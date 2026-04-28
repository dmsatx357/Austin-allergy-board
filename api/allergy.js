function levelFromValue(value) {
  if (value === null || value === undefined) return "Unavailable";
  if (value <= 0) return "None";
  if (value <= 1) return "Low";
  if (value <= 10) return "Moderate";
  if (value <= 50) return "High";
  return "Very High";
}

export default async function handler(req, res) {
  const lat = 30.2672;
  const lon = -97.7431;

  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&hourly=grass_pollen,ragweed_pollen,alder_pollen,birch_pollen,mugwort_pollen,olive_pollen` +
    `&timezone=America%2FChicago`;

  try {
    const response = await fetch(url);
    const raw = await response.json();

    const h = raw.hourly || {};
    const latestIndex = 0;

    const grass = h.grass_pollen?.[latestIndex];
    const ragweed = h.ragweed_pollen?.[latestIndex];
    const alder = h.alder_pollen?.[latestIndex];
    const birch = h.birch_pollen?.[latestIndex];
    const mugwort = h.mugwort_pollen?.[latestIndex];
    const olive = h.olive_pollen?.[latestIndex];

    const liveLevels = [
      grass,
      ragweed,
      alder,
      birch,
      mugwort,
      olive
    ].filter(v => v !== null && v !== undefined);

    const maxValue = liveLevels.length ? Math.max(...liveLevels) : null;
    const consensus = levelFromValue(maxValue);

    res.status(200).json({
      updated: new Date().toISOString(),
      summary: {
        headline: `Austin allergy conditions are ${consensus.toLowerCase()} based on available live pollen model data.`,
        consensus,
        agreement: "Single live model source",
        mostDisputed: "Not available until multiple sources are added"
      },
      sources: [
        {
          name: "Open-Meteo / CAMS",
          method: "Live forecast model",
          tree: `Alder: ${levelFromValue(alder)} / Birch: ${levelFromValue(birch)}`,
          grass: levelFromValue(grass),
          weed: `Ragweed: ${levelFromValue(ragweed)} / Mugwort: ${levelFromValue(mugwort)}`,
          mold: "Not provided",
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
      ],
      raw: {
        grass,
        ragweed,
        alder,
        birch,
        mugwort,
        olive
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
