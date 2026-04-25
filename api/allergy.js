export default async function handler(req, res) {
  try {
    // Try Weather.com Austin allergy endpoint (much easier to access)
    const response = await fetch(
      "https://api.weather.com/v2/indices/pollen/daypart/7day",
      {
        headers: {
          // This is a public-ish endpoint used by their site
          "accept": "application/json"
        }
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
