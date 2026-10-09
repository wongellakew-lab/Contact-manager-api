const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDb = require("./config/dbConnection");

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
