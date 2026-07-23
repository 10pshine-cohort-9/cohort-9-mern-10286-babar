const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});