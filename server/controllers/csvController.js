import fetch from "node-fetch";
import csv from "csv-parser";
import ErrorHandler from "../utils/ErrorHandler.js";
import { successResponse } from "../utils/successResponse.js";

export const fetchAndParseCSV = async (req, res, next) => {
  try {
    // Get url from query strings
    const { url } = req.query;

    // If url not present
    if (!url) {
      return next(new ErrorHandler("Please provide a CSV file URL", 400));
    }

    // Fetch csv using fetch function
    const response = await fetch(url, { highWaterMark: 16 * 1024 });

    // If not success response
    if (!response.ok) {
      return next(new ErrorHandler("Failed to fetch CSV file", 400));
    }

    // to store fetched data
    const data = [];

    response.body
      .pipe(
        // parse and clean headers
        csv({ mapHeaders: ({ header }) => header.trim().replace(/^"|"$/g, "") })
      )
      .on("data", (record) => {
        Object.keys(record).forEach((key) => {
          // clean each value
          record[key] = record[key].trim().replace(/^"|"$/g, "");
        });
        data.push(record);
      })
      .on("end", () => {
        successResponse(
          "CSV data fetched successfully",
          200,
          res,
          "csvData",
          data
        );
      })
      .on("error", (err) => next(new ErrorHandler(err.message, 400)));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// https://sample-videos.com/csv/Sample-Spreadsheet-1000-rows.csv
// https://sample-videos.com/csv/Sample-Spreadsheet-5000-rows.csv
