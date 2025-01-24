document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");

  // Fetch cart items from storage
  chrome.storage.local.get(null, (data) => {
    if (Object.keys(data).length === 0) {
      cartItemsContainer.innerHTML = "<p>No cart items found.</p>";
    } else {
      cartItemsContainer.innerHTML = "";
      for (const [site, items] of Object.entries(data)) {
        const siteHeader = document.createElement("h3");
        siteHeader.textContent = `Site: ${site}`;
        cartItemsContainer.appendChild(siteHeader);

        items.forEach((item) => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "cart-item";
          itemDiv.textContent = item;
          cartItemsContainer.appendChild(itemDiv);
        });
      }
    }
  });
});
