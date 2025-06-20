let s = new Zotero.Search();
s.libraryID = Zotero.Libraries.userLibraryID;
s.addCondition('itemType', 'is', 'attachment');
let ids = await s.search();
let items = await Zotero.Items.getAsync(ids);

let missing = [];
for (let item of items) {
  if (item.attachmentContentType === 'application/pdf') {
    let linkMode = item.attachmentLinkMode;
    if (linkMode === Zotero.Attachments.LINK_MODE_IMPORTED_FILE) {
      // Stored file: safe to use fileExists()
      let exists = await item.fileExists();
      if (!exists) {
        missing.push(item.getField('title') || item.getFilename());
      }
    } else if (linkMode === Zotero.Attachments.LINK_MODE_LINKED_FILE) {
      // Linked file: check existence using Zotero.File.existsAsync or handle gracefully
      let path = item.getFilePath();
      if (path) {
        let exists = false;
        try {
          exists = await Zotero.File.existsAsync(path); // If available
        } catch (e) {
          // If existsAsync is not available, try to read file contents
          try {
            await Zotero.File.getContentsAsync(path);
            exists = true;
          } catch (e2) {
            exists = false;
          }
        }
        if (!exists) {
          missing.push(item.getField('title') || item.getFilename());
        }
      } else {
        missing.push(item.getField('title') || item.getFilename());
      }
    }
  }
}
return missing;
