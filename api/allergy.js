export default async function handler(req, res) {
  try {
    const response = await fetch("https://austinpollen.com");
    const html = await response.text();

    res.status(200).json({
      message: "Austin Pollen fetched",
      length: html.length,
      sample: html.slice(0, 5000),
      includesTree: html.toLowerCase().includes("tree"),
      includesGrass: html.toLowerCase().includes("grass"),
      includesMold: html.toLowerCase().includes("mold"),
      includesWeed: html.toLowerCase().includes("weed")
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
