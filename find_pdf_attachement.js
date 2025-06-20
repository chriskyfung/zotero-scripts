const list = `TITLE.pdf
ZOTEROID\\TITLE.pdf
ZOTEROID\\AUTHTORS - YEAR - TITLE.pdf`;

function parser(input) {
    let lines = input.split('\n');
    const re = /(?<id>[0-9A-Z]{8})?\\?((?<author>.+)( 與 | et al.)? - (?<year>\d{4}) - )?(?<title>.*)\.pdf/i;
    return lines.map(line => re.exec(line));
}

// For testing purposes, you can uncomment the following line to see the output of the parser
// return parser(list);

async function searchPDF(criteria, entity) {
    // Create a new search object
    var search = new Zotero.Search();
    // Use the user's library (you can change this if searching elsewhere)
    search.libraryID = Zotero.Libraries.userLibraryID;
    search.addCondition('joinMode', 'any'); // joinMode defaults to 'all' as per the 
    
    // Add a search condition.
    // Here we search for items whose title contains the specified text.
    search.addCondition("title", "contains", criteria.title);
    search.addCondition("creator", "contains", criteria.author);
    
    // (Optional) To search another field (e.g., abstract notes), uncomment below:
    // search.addCondition("abstractNote", "contains", searchText);
    
    // Execute the search to get an array of item IDs that match the condition.
    var itemIDs = await search.search();
    
    if (itemIDs.length === 0) {
        return "No items found matching for:\n🆖 " + entity;
    }
    
    // Retrieve full Zotero item objects asynchronously
    var items = await Zotero.Items.getAsync(itemIDs);
    
    // Output each matched item's title in the error console.
    let pdf = items.filter(item => {
        return item.isAttachment() && item?.attachmentContentType == 'application/pdf'
    });
    
    if (pdf.length > 0) {
        return 'PDF found: \n' + pdf[0].getField("title")
        + '\n for \n📄 ' + entity; 
    };
    
    return items.length + " item(s) found: \n"
        + items.map(item => item.getField("title")).join('\n')
        + '\n for \n🔍 ' + entity; 
}

async function main() {
    let queries = parser(list);
    let output = [];
    for (let query of queries) {
        output.push(await searchPDF(query.groups, query.input));
    }
    return output.join('\n\n');
}

return main();
