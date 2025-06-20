# Zotero Scripts

This repository contains JavaScript utilities for use with [Zotero](https://www.zotero.org/), a free and open-source reference management software. These scripts are designed to be run in the Zotero client JavaScript console or as part of custom plugins to automate tasks such as finding broken attachments and searching for PDF files.

## Scripts

### 1. `find_broken_attachments.js`

**Purpose:**  
Scans your Zotero library for PDF attachments and reports those whose files are missing or broken.

**How it works:**
- Searches for all attachment items in the user's library.
- Checks if the attachment is a PDF.
- For stored files, uses Zotero's `fileExists()` method.
- For linked files, checks file existence using `Zotero.File.existsAsync()` or attempts to read the file.
- Returns a list of missing or broken PDF attachments by title or filename.

**Usage:**
1. Open Zotero.
2. Go to `Tools` > `Developer` > `Run JavaScript`.
3. Paste the contents of `find_broken_attachments.js` and run the script.
4. The script returns an array of missing PDF attachments.

---

### 2. `find_pdf_attachement.js`

**Purpose:**  
Parses a list of PDF filenames and searches for corresponding items in your Zotero library, reporting whether a matching PDF attachment is found.

**How it works:**
- Parses each line of a provided list to extract metadata (Zotero ID, author, year, title).
- Searches the Zotero library for items matching the extracted title and author.
- Checks if a matching item has a PDF attachment.
- Returns a summary of results for each entry.

**Usage:**
1. Open Zotero.
2. Go to `Tools` > `Developer` > `Run JavaScript`.
3. Paste the contents of `find_pdf_attachement.js` and run the script.
4. The script outputs the search results for each entry in the provided list.

---

## Requirements

- Zotero desktop client (tested with Zotero 6+).
- Access to the JavaScript Runner via `Tools` > `Developer` > `Run JavaScript`.

## Disclaimer

These scripts are provided as-is. Use at your own risk. Always back up your Zotero data before running custom scripts.

## License

GPL-3.0 License

---

## Contributing

Pull requests and suggestions are welcome! Please open an issue or submit a PR for improvements or bug fixes.

