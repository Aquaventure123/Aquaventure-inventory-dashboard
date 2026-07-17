document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = "";

  const match = USERS.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );

  if (!match) {
    errorMsg.textContent = "Invalid username or password.";
    return;
  }

  sessionStorage.setItem(
    "bw_user",
    JSON.stringify({ username: match.username, displayName: match.displayName })
  );
  window.location.href = "dashboard.html";
});
