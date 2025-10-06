const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const latitude = req.query.lat || 21.0278;   // Hà Nội
    const longitude = req.query.lon || 105.8342; // Hà Nội

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m`;
    const response = await fetch(url);
    const data = await response.json();

    const temperature = data.hourly?.temperature_2m[0] ?? "N/A";
    const humidity = data.hourly?.relative_humidity_2m[0] ?? "N/A";

    // Trả về 1 dòng HTML
    res.send(
      `<h1>Nhiệt độ: ${temperature} °C, Độ ẩm: ${humidity} %</h1>`
    );

  } catch (err) {
    console.error(err);
    res.status(500).send("<h1>Lỗi khi lấy dữ liệu thời tiết</h1>");
  }
});

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
