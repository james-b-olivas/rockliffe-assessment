# rockliffe-assessment
My submission for the Rockliffe internship's take-home test.

## Requirements

- Node.js v12.x
  - https://nodejs.org/

## Development

This application requires two different npm servers to run: one in the root directory, and one in the client folder.

Execute the following from the root directory:
```sh
npm install
npm start
```

In another terminal, execute the following from the root directory:
```sh
cd client
npm install
npm run serve
```

## Using the app

The app comes with multiple folders that each contain PDF files.

Click on a folder name to view the files contained within, and then click on a file name to display the PDF.

You can do the following with the PDF:
* Toggle between pages of a PDF with the "Previous Page" and "Next Page" buttons.
* Download the PDF with the "Download File" button.
* Stop viewing the PDF by clicking the "Home" button.
