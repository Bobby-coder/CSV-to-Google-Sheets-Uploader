import express from "express";
import { fetchAndParseCSV } from "../controllers/csvController.js";

const router = express.Router();

router.get("/", fetchAndParseCSV);

export default router;
