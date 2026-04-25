export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.kvue.com/allergy");
    const html = await response.text();

    // TEMP: just return a slice so we can inspect
    res.status(200).json({
      message: "KVUE page fetched",
      sample: html.slice(0, 2000) // first chunk of page
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
