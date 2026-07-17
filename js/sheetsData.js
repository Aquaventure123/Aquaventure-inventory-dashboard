const STATUS_LABELS = {
  out_of_stock: "Out of stock",
  one_month: "1 month",
  two_three_months: "2-3 months",
  three_twelve_months: "3-12 months",
  dead_stock: "Dead stock (1 year+)",
  unknown: "Unknown",
};

function colLetterToIndex(letter) {
  let result = 0;
  for (let i = 0; i < letter.length; i++) {
    result = result * 26 + (letter.charCodeAt(i) - 64);
  }
  return result - 1;
}

function classify(totalQty, stockMonths) {
  const qty = Number(totalQty) || 0;
  const months = Number(stockMonths);

  if (qty <= 0) return "out_of_stock";
  if (isNaN(months)) return "unknown";
  if (months >= 12) return "dead_stock";
  if (months === 1) return "one_month";
  if (months >= 2 && months <= 3) return "two_three_months";
  return "three_twelve_months"; // covers >3 and <12
}

async function fetchTabRows(tab) {
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&gid=${tab.gid}`;

  let text;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Could not fetch tab "${tab.name}" (gid ${tab.gid}) - HTTP ${res.status}`);
      return [];
    }
    text = await res.text();
  } catch (err) {
    console.error(`Network/CORS error fetching tab "${tab.name}" (gid ${tab.gid}):`, err);
    return [];
  }

  const allRows = parseCSV(text);

  const colIndex = Object.fromEntries(
    Object.entries(tab.columns).map(([key, letter]) => [key, colLetterToIndex(letter)])
  );

  const dataRows = allRows.slice(tab.dataStartRow - 1);
  const result = [];

  for (const row of dataRows) {
    const sku = row[colIndex.sku];
    if (!sku || !sku.trim()) continue; // skip only this row, keep reading further rows

    const jaipur = Number(row[colIndex.jaipur]) || 0;
    const mumbai = Number(row[colIndex.mumbai]) || 0;
    const aqv = Number(row[colIndex.aqv]) || 0;
    const total = row[colIndex.total] !== undefined && row[colIndex.total] !== ""
      ? Number(row[colIndex.total]) || 0
      : jaipur + mumbai + aqv;
    const monthlyAvgSold = Number(row[colIndex.monthlyAvgSold]) || 0;
    const stockMonths = Number(row[colIndex.stockMonths]);

    const status = classify(total, stockMonths);

    result.push({
      sku: sku.trim(),
      salesPerson: tab.salesPerson,
      jaipur,
      mumbai,
      aqv,
      total,
      monthlyAvgSold,
      stockMonths: isNaN(stockMonths) ? 0 : stockMonths,
      status,
      statusLabel: STATUS_LABELS[status],
    });
  }

  return result;
}

async function fetchInventoryData() {
  const allRowsPerTab = await Promise.all(SHEET_TABS.map(fetchTabRows));
  const rows = allRowsPerTab.flat();

  const summary = {
    out_of_stock: { skuCount: 0, pcs: 0 },
    one_month: { skuCount: 0, pcs: 0 },
    two_three_months: { skuCount: 0, pcs: 0 },
    three_twelve_months: { skuCount: 0, pcs: 0 },
    dead_stock: { skuCount: 0, pcs: 0 },
  };

  for (const row of rows) {
    if (!summary[row.status]) continue;
    summary[row.status].skuCount += 1;
    summary[row.status].pcs += row.total;
  }

  return {
    generatedAt: new Date().toISOString(),
    totalSkus: rows.length,
    summary,
    rows,
  };
}
