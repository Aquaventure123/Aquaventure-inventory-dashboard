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
    gid: "876226920",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
  {
    name: "CS (Kevin)",
    salesPerson: "Kevin",
    gid: "1460532173",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
  {
    name: "CS (William)",
    salesPerson: "William",
    gid: "740036039",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
{
    name: "CS (Kelliy)",
    salesPerson: "Kelliy",
    gid: "246295338",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
{
    name: "CS (Quinee)",
    salesPerson: "Quinee",
    gid: "7035894",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
{
    name: "CS (Jessie/Edu)",
    salesPerson: "Jessie/Edu",
    gid: "1047391516",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
{
    name: "CS (Fiona)",
    salesPerson: "Fiona",
    gid: "1975741950",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
{
    name: "CS (Cheery)",
    salesPerson: "Cheery",
    gid: "628773754",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
{
    name: "CS (Shelling/Lisa)",
    salesPerson: "Shelling/Lisa",
    gid: "2024616904",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
{
    name: "CS (DD Raja)",
    salesPerson: "DD Raja",
    gid: "749730178",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
{
    name: "CS (Fred)1",
    salesPerson: "Fred",
    gid: "1091498777",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
{
    name: "CS (Garfield)",
    salesPerson: "Garfield",
    gid: "919457709",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
{
    name: "CS (Genkino)",
    salesPerson: "Genkino",
    gid: "1335970843",
    dataStartRow: 4,
    columns: { sku: "B", jaipur: "E", mumbai: "F", aqv: "G", total: "H", monthlyAvgSold: "K", stockMonths: "L" },
  },
];
