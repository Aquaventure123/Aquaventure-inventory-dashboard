// ================================================================
// EDIT THIS FILE to match your Google Sheet.
// ================================================================

const SPREADSHEET_ID = "14FuoqpB0A7X46EpxkP1ouhho-BmvygqpVP9mTPk4hXY";

// For each sales-person tab you want on the dashboard, add an entry below.
//
// How to find "gid": open that tab in Google Sheets, look at the browser
// URL — the number after "gid=" is what you need.
// Example: .../edit?gid=743251402#gid=743251402  ->  gid: "743251402"
//
// "columns" = the column LETTERS in that tab (as shown in Google Sheets).
// "dataStartRow" = the row number where the first SKU row begins
// (i.e. the row right after your headers).

const SHEET_TABS = [
  {
    name: "Current Stock (Alice)",
    salesPerson: "Alice",
    gid: "743251402",
    dataStartRow: 4,
    columns: {
      sku: "B",
      jaipur: "E",
      mumbai: "F",
      aqv: "G",
      total: "H",
      monthlyAvgSold: "K",
      stockMonths: "L",
    },
  },
  {
    name: "CS (Wendy)1",
    salesPerson: "Wendy",
    gid: "771564451",
    dataStartRow: 4,
    columns: {
      sku: "B",
      jaipur: "E",
      mumbai: "F",
      aqv: "G",
      total: "H",
      monthlyAvgSold: "K",
      stockMonths: "L",
    },
  },
  // --- Add the rest of your tabs below. Fill in the correct "gid" for each. ---
  {
    name: "CS (Jamison)",
    salesPerson: "Jamison",
    gid: "PASTE_GID_HERE",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
  {
    name: "CS (Kevin)",
    salesPerson: "Kevin",
    gid: "PASTE_GID_HERE",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
  {
    name: "CS (William)",
    salesPerson: "William",
    gid: "PASTE_GID_HERE",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
];
