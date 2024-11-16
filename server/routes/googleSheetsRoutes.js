import express from "express";
import {
  appendData,
  auth,
  disconnectGoogleAccount,
  getAllSheets,
  oauth2Callback,
  uploadData,
} from "../controllers/googleSheetsController.js";

const router = express.Router();

router.get("/auth", auth);

router.get("/oauth2Callback", oauth2Callback);

router.get("/", getAllSheets);

router.post("/", uploadData);

router.put("/", appendData);

router.post("/clear-cookies", disconnectGoogleAccount);

export default router;
