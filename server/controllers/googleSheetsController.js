import { google } from "googleapis";
import dotenv from "dotenv";
import ErrorHandler from "../utils/ErrorHandler.js";
import { successResponse } from "../utils/successResponse.js";

// Load environment variables
dotenv.config();

// Create oAuth client
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

export const auth = async (req, res, next) => {
  try {
    // Scopes for Google Sheets & Google drive to get permission of these
    const scopes = [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ];

    // Generate Auth url to prompt consent screen
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });

    // Redirect user back to the auth url
    res.redirect(authUrl);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

export const oauth2Callback = async (req, res, next) => {
  try {
    // Access code from query string
    const { code } = req.query;

    // Exchange code with auth tokens
    const { tokens } = await oAuth2Client.getToken(code);

    oAuth2Client.setCredentials(tokens);

    // Save tokens in cookies
    res.cookie("googleToken", tokens);

    // Redirect back to the home page
    res.redirect("http://localhost:5173");
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

export const uploadData = async (req, res, next) => {
  try {
    // Extract and verify google tokens
    const tokens = req.cookies.googleToken;
    if (!tokens) {
      return next(
        new ErrorHandler(
          "User not authenticated!. Please connect your google account in order to upload.",
          401
        )
      );
    }

    oAuth2Client.setCredentials(tokens);

    // Extract and valdate data to upload
    const { data } = req.body;
    if (!data) {
      return next(new ErrorHandler("Data is not present!", 400));
    }

    // Instantiate google drive
    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    // Define meta data for file like file name and type of the file e.g spreasheet, doc, etc
    const fileMetadata = {
      name: `New Google Sheet ${Date.now()}`,
      mimeType: "application/vnd.google-apps.spreadsheet",
    };

    // Create a new Google Sheet
    const file = await drive.files.create({
      resource: fileMetadata,
      fields: "id", // Get the newly created google sheet's ID
    });

    // Store newly created file id
    const spreadsheetId = file.data.id;

    // Write data to the new Google Sheet
    const sheets = google.sheets({ version: "v4", auth: oAuth2Client });
    sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      resource: { values: data },
    });

    // Apply formatting to the sheet
    sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          // Bold headers
          {
            repeatCell: {
              range: {
                sheetId: 0, // First sheet in the document
                startRowIndex: 0,
                endRowIndex: 1, // Format only the header row
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    bold: true,
                  },
                },
              },
              fields: "userEnteredFormat.textFormat",
            },
          },
        ],
      },
    });

    successResponse(
      `New sheet created and data uploaded!`,
      200,
      res,
      "spreadsheetId",
      spreadsheetId
    );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

export const getAllSheets = async (req, res, next) => {
  try {
    // Extract and verify google tokens
    const tokens = req.cookies.googleToken;
    if (!tokens) {
      return next(
        new ErrorHandler(
          "User not authenticated!. Please connect your google account in order to upload.",
          401
        )
      );
    }

    oAuth2Client.setCredentials(tokens);

    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    // Fetch files with mimeType for Google Sheets
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      fields: "files(id, name)",
    });

    const sheets = response.data.files.map((file) => ({
      id: file.id,
      name: file.name,
    }));

    successResponse("Sheets fetched successfully", 200, res, "sheets", sheets);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

export const appendData = async (req, res, next) => {
  try {
    // Extract and verify google tokens
    const tokens = req.cookies.googleToken;
    if (!tokens) {
      return next(
        new ErrorHandler(
          "User not authenticated!. Please connect your google account in order to upload.",
          401
        )
      );
    }

    oAuth2Client.setCredentials(tokens);

    // Extract and valdate data & spreadsheet ID
    const { data, spreadsheetId } = req.body;
    if (!data) {
      return next(new ErrorHandler("Data is missing!", 400));
    }

    if (!spreadsheetId) {
      return res.status(400).send("SpreadsheetId is missing.");
    }

    const sheets = google.sheets({ version: "v4", auth: oAuth2Client });
    sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: { values: data },
    });

    successResponse("Data appended successfully!", 200, res);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

export const disconnectGoogleAccount = async (req, res) => {
  res.clearCookie("googleToken");
  successResponse("Google Account disconnected successfully", 200, res);
};
