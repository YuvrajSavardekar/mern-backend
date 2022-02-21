const fs = require('fs')
const path = require('path');

const express = require("express");
const boydParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./model/http-error");

const app = express();

app.use(boydParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

// throw error for any invalid route, which catch by "error" middleware
app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

app.use((error, req, res, next) => {
  // when user already exist, then also image is stored, so to delete image we check "req.file"
  if(req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err)
    })
  }
  if (res.headerSent) {
    // means we already handle error in some middleware
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zunro.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    // console.log("Connected");
    app.listen(process.env.PORT || 5000);
  })
  .catch((error) => console.log(error));
