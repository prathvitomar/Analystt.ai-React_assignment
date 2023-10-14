import express from "express";
import axois from "axois";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // Set your preferred port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});