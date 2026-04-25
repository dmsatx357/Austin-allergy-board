export default async function handler(req, res) {
  const apiKey = process.env.TOMORROW_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Missing TOMORROW_API_KEY in Vercel environment variables"
    });
  }

  const lat = 30.2672;
  const lon = -97.7431;

  const url =
    `https://api.tomorrow.io/v4/timelines` +
    `?location=${lat},${lon}` +
    `&fields=treeIndex,grassIndex,weedIndex` +
    `&timesteps=1d` +
    `&units=metric` +
    `&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const raw = await response.json();

    res.status(response.status).json(raw);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
