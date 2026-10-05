const express = require("express");
const paymentRoutes = require("./routes/payments");
const app = express();
app.use(express.json());
app.use("/payments", paymentRoutes);
app.listen(3000);
