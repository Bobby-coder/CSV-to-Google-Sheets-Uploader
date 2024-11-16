# CSV to Google Sheets Uploader

A powerful yet simple web application that allows users to parse CSV files, display their contents in a paginated table, and upload or append this data to Google Sheets. Built for seamless integration with Google services, this app simplifies CSV data management for users.

---

## **Project Features**

- **Fetching & Parsing CSV File Data**: Upload a CSV file URL, and the app fetches and parses the data for display.
- **Displaying CSV Data in Table Form**: View your CSV data in an organized, paginated table.
- **Pagination for Table**: Handle large datasets with easy navigation through paginated rows.
- **Connecting/Disconnecting Google Account**: OAuth integration allows you to connect and disconnect your Google account securely.
- **Uploading CSV Data to Google Sheets**: Upload parsed data to a new Google Sheet with a single click.
- **Appending CSV Data to an Existing Google Sheet**: Easily add data to existing sheets without overwriting.

---

## **Tech Stack**

- **Frontend**: React.js (Pagination, Google Account Integration)
- **Backend**: Node.js, Express.js
- **Database**: Google Sheets (via Google Sheets API)
- **APIs**:
  - Google Sheets API
  - Google Drive API
- **Authentication**: OAuth 2.0
- **Styling**: Tailwind CSS

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Bobby-coder/CSV-to-Google-Sheets-Uploader.git
   cd CSV-to-Google-Sheets-Uploader
   ```

2. Install dependencies for both client and server

   Navigate to the client folder and install dependencies:

   ```bash
   cd client
   npm install
   ```

   Navigate to the server folder and install dependencies:

   ```bash
   cd server
   npm install
   ```

3. Set up environment variables
   Configure your .env files in server with necessary variables:

   - PORT
   - CLIENT_ID
   - CLIENT_SECRET
   - REDIRECT_URI

   Create a web project in Google Cloud Console and obtain the CLIENT_ID, CLIENT_SECRET, and REDIRECT_URI.

   Add the following scopes in your project:

   Google Sheets API scope: "https://www.googleapis.com/auth/spreadsheets"

   Google Drive API scope: "https://www.googleapis.com/auth/drive"

   Enable Google Sheets API and Google Drive API in your Google Cloud Console project.

   Add your Gmail address in the test users section of the Google Cloud Console project to connect your account correctly.

   Note: Until your Google Cloud Console project is verified, you can only use test users.

4. Run the app

   Start the client (frontend):

   ```bash
   cd client
   npm run dev
   ```

   Start the server (backend):

   ```bash
   cd server
   npm run start
   ```

## **How to Use the App**

1. **Connect Your Google Account**:

   - Click the **"Connect to Google"** button.
   - Use the following Google account credentials to connect (since the app is in test mode):
     - **Email**: `d52827349@gmail.com`
     - **Password**: `dummy@999`
   - Note: Only test users mentioned in Bobby Sadhwani's Google Cloud Console are allowed to connect. Because this Google Cloud Console project is not verified.

2. **Upload CSV File**:

   - Paste the URL of your CSV file into the input field.
   - The app will fetch and parse the file, displaying the data in a paginated table.

3. **View and Verify Data**:

   - Review the parsed CSV data in the table.

4. **Upload to Google Sheets**:

   - Click the **"Upload to Google Sheets"** button.
   - The app creates a new Google Sheet and uploads the displayed data.

5. **Append to Existing Sheets**:

   - Use the **"Append to Google Sheets"** button to add data to an existing sheet.

6. **Disconnect Your Google Account**:
   - To disconnect, click the **"Disconnect Google"** button.

---

## **Notes**

- Since this app uses Bobby Sadhwani's Google Cloud Console (which is not verified), only authorized test accounts can connect. Use the provided credentials to test the app.

---

## **Future Enhancements**

- Verification of Google Cloud Console for broader user access.
- Ability to upload CSV files directly instead of URLs.
- Advanced data formatting options for Google Sheets.

---

I hope you enjoy using the CSV to Google Sheets Uploader! 😊
