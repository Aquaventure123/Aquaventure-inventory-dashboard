const STATUS_META = {
  out_of_stock: { label: "Out of stock", color: "#E24B4A" },
  one_month: { label: "1 month", color: "#378ADD" },
  two_three_months: { label: "2-3 months", color: "#EF9F27" },
  three_twelve_months: { label: "3-12 months", color: "#639922" },
  dead_stock: { label: "Dead stock (1yr+)", color: "#000000" },
};

let allRows = [];

// ---- Auth guard ----
const userJson = sessionStorage.getItem("bw_user");
if (!userJson) {
  window.location.href = "index.html";
}
const user = JSON.parse(userJson || "{}");
document.getElementById("userGreeting").textContent = user.displayName ? `Hi, ${user.displayName}` : "";

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("bw_user");
  window.location.href = "index.html";
});

// ---- Load data ----
async function loadDashboard() {
  try {
    const data = await fetchInventoryData();

    allRows = data.rows;
    document.getElementById("generatedAt").textContent =
      `Last updated: ${new Date(data.generatedAt).toLocaleString()}`;

    populateSalesPersonFilter(data.rows);
    renderSummary(data.summary, data.totalSkus);
    renderTable(data.rows);

    document.getElementById("loadingBox").style.display = "none";
    document.getElementById("dashboardContent").style.display = "block";
  } catch (err) {
    console.error(err);
    document.getElementById("loadingBox").textContent =
      "Could not load inventory data. Check that the sheet is set to 'Anyone with the link can view', and that gid values in config.js are correct.";
  }
}

function populateSalesPersonFilter(rows) {
  const select = document.getElementById("salesPersonFilter");
  const names = [...new Set(rows.map((r) => r.salesPerson).filter(Boolean))];
  names.forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });
}

function renderSummary(summary, totalSkus) {
  const cardsGrid = document.getElementById("cardsGrid");
  cardsGrid.innerHTML = "";

  Object.keys(STATUS_META).forEach((key) => {
    const meta = STATUS_META[key];
    const s = summary[key] || { skuCount: 0, pcs: 0 };
    const card = document.createElement("div");
    card.className = `status-card ${key}`;
    card.innerHTML = `
      <p class="label">${meta.label}</p>
      <p class="count">${s.skuCount} <span style="font-size:12px;font-weight:400;">SKUs</span></p>
      <p class="sub">${s.pcs} pcs</p>
    `;
    cardsGrid.appendChild(card);
  });

  renderPie(summary, totalSkus);
}

function renderPie(summary, totalSkus) {
  document.getElementById("pieTotal").textContent = totalSkus;

  let cumulative = 0;
  const stops = [];
  Object.keys(STATUS_META).forEach((key) => {
    const meta = STATUS_META[key];
    const count = (summary[key] || {}).skuCount || 0;
    const pct = totalSkus ? (count / totalSkus) * 100 : 0;
    const start = cumulative;
    cumulative += pct;
    stops.push(`${meta.color} ${start}% ${cumulative}%`);
  });

  const pieChart = document.getElementById("pieChart");
  pieChart.style.background = `conic-gradient(${stops.join(", ")})`;

  const legend = document.getElementById("pieLegend");
  legend.innerHTML = Object.keys(STATUS_META)
    .map((key) => {
      const meta = STATUS_META[key];
      const count = (summary[key] || {}).skuCount || 0;
      return `<span class="legend-item"><span class="dot" style="background:${meta.color}"></span>${meta.label} &middot; ${count}</span>`;
    })
    .join("");
}

function renderTable(rows) {
  const tbody = document.getElementById("tableBody");

  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="empty-text">No matching SKUs found</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((r) => {
      const meta = STATUS_META[r.status] || { label: r.statusLabel || "Unknown" };
      return `
        <tr>
          <td class="sku-cell">${r.sku}</td>
          <td>${r.jaipur}</td>
          <td>${r.mumbai}</td>
          <td>${r.aqv}</td>
          <td>${r.total}</td>
          <td>${r.monthlyAvgSold}</td>
          <td>${r.stockMonths}</td>
          <td><span class="status-badge ${r.status}">${meta.label}</span></td>
        </tr>
      `;
    })
    .join("");
}

// ---- Filters ----
function applyFilters() {
  const search = document.getElementById("skuSearch").value.trim().toLowerCase();
  const age = document.getElementById("ageFilter").value;
  const salesPerson = document.getElementById("salesPersonFilter").value;

  const filtered = allRows.filter((r) => {
    const matchesSearch = !search || r.sku.toLowerCase().includes(search);
    const matchesAge = age === "all" || r.status === age;
    const matchesSalesPerson = salesPerson === "all" || r.salesPerson === salesPerson;
    return matchesSearch && matchesAge && matchesSalesPerson;
  });

  renderTable(filtered);
}

document.getElementById("skuSearch").addEventListener("input", applyFilters);
document.getElementById("ageFilter").addEventListener("change", applyFilters);
document.getElementById("salesPersonFilter").addEventListener("change", applyFilters);

loadDashboard();
