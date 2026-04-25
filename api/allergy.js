export default async function handler(req, res) {
  const apiKey = process.env.TOMORROW_API_KEY;

  const lat = 30.2672; // Austin
  const lon = -97.7431;

  try {
    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${apiKey}`
    );

    const data = await response.json();

    // TEMP: just return raw so we see structure first
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
