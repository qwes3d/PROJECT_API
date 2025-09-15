const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/connect.js");
const inventoryRoutes = require("./routes/inventoryRoutes.js");
const authRoutes = require("./routes/auth.js");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const { errorHandler, notFound } = require("./middlewares/errorHandler.js");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Products API. Go to /api-docs for Swagger documentation.");
});

// API routes
app.use("/api/inventory", inventoryRoutes);
app.use("/auth", authRoutes);

// 🔹 Load swagger.json instead of swagger.js
const swaggerFile = path.join(__dirname, "swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, "utf8"));

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    persistAuthorization: true // <-- this keeps your Bearer token after login
  }
}));
// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
