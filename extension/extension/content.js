// async function getEcoscore(product) {
//   let res = await fetch(
//     `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${product}&search_simple=1&action=process&json=1`
//   );
//   let data = await res.json();
  
//   const productsData = data.products || [];
//   const filtered = productsData.filter((product) => product.ecoscore_score !== undefined);
//   return filtered[0]?.ecoscore_score || "32";
// }


// // Define dynamic selectors for multiple websites
// const siteSelectors = {
//   "www.zeptonow.com": ".font-body.text-xs.line-clamp-2.text-skin-secondary-black.md\\:\\!text-base",
//   "www.swiggy.com": "#cartItemList1 div.sc-aXZVg.kbrLOj",
// };

// const extractCartItems = async () => {
//   const currentSite = window.location.hostname;
//   const selector = siteSelectors[currentSite];

//   if (!selector) {
//     console.warn(`No selector defined for ${currentSite}`);
//     return;
//   }

//   const cartItems = [];
//   const itemPromises = [];

//   // Loop through each item and fetch ecoscore asynchronously
//   document.querySelectorAll(selector).forEach((item) => {
//     const itemName = item.textContent.trim();
//     const ecoscorePromise = getEcoscore(itemName).then((ecoscore) => {
//       cartItems.push({ name: itemName, ecoscore: ecoscore });
//     });
//     itemPromises.push(ecoscorePromise);
//   });

//   // Wait for all ecoscore fetches to complete
//   await Promise.all(itemPromises);

//   console.log(`Cart items from ${currentSite}:`, cartItems);

//   // Now that all ecoscores are fetched, open the new window
//   const newWindow = window.open('', '_blank');
//   newWindow.document.write('<html><head><title>Cart Items</title>');
//   newWindow.document.write('<link rel="stylesheet" type="text/css" href="popup.css">');
//   newWindow.document.write('</head><body>');
//   newWindow.document.write('<h1>Extracted Cart Items</h1>');
//   newWindow.document.write('<ol>');
  
//   // Add each item to the list in the new window
//   cartItems.forEach(item => {
//     newWindow.document.write(`<li>${item.name} : ${item.ecoscore}</li>`);
//   });

//   newWindow.document.write('</ol>');
//   newWindow.document.write('</body></html>');
//   newWindow.document.close();  // Close the document to render it properly
// };

// const waitForSelector = (selector, callback) => {
//   const observer = new MutationObserver(() => {
//     if (document.querySelector(selector)) {
//       observer.disconnect(); // Stop observing once the selector is found
//       callback();
//     }
//   });
//   observer.observe(document.body, { childList: true, subtree: true });
// };

// // Observe and extract cart items dynamically
// const currentSite = window.location.hostname;
// console.log(currentSite);
// if (siteSelectors[currentSite]) {
//   waitForSelector(siteSelectors[currentSite], extractCartItems);
// }

const DEBUG = true; // Enable detailed logging

// Enhanced logging function
function debugLog(...args) {
  if (DEBUG) {
    console.log('[ECO-TRACKER]', ...args);
  }
}

// Improved site selectors with more specific checks
const siteSelectors = {
  "www.zeptonow.com": {
    selector: ".font-body.text-xs.line-clamp-2.text-skin-secondary-black.md\\:\\!text-base",
    validate: (element) => element && element.textContent.trim().length > 0
  },
  "www.swiggy.com": {
    selector: "#cartItemList1 div.sc-aXZVg.kbrLOj",
    validate: (element) => element && element.textContent.trim().length > 0
  }
};

async function getEcoscore(product) {
  try {
    debugLog('Fetching ecoscore for:', product);
    let res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(product)}&search_simple=1&action=process&json=1`
    );
    let data = await res.json();
    
    const productsData = data.products || [];
    const filtered = productsData.filter((p) => p.ecoscore_score !== undefined);
    
    debugLog('Filtered products:', filtered);
    return filtered[0]?.ecoscore_score || "32";
  } catch (error) {
    debugLog('Ecoscore fetch error:', error);
    return "32";
  }
}

async function findAlternativeProducts(itemName, currentEcoscore) {
  try {
    debugLog('Finding alternatives for:', itemName);
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(itemName)}&search_simple=1&action=process&json=1`
    );
    const data = await response.json();
    
    const alternatives = (data.products || [])
      .filter(product => 
        product.ecoscore_score !== undefined && 
        product.ecoscore_score > currentEcoscore
      )
      .sort((a, b) => b.ecoscore_score - a.ecoscore_score)
      .slice(0, 2);

    debugLog('Alternatives found:', alternatives);
    return alternatives.map(product => ({
      name: product.product_name || 'Unnamed Product',
      ecoscore: product.ecoscore_score
    }));
  } catch (error) {
    debugLog('Alternative products error:', error);
    return [];
  }
}

const extractCartItems = async () => {
  const currentSite = window.location.hostname;
  debugLog('Current site:', currentSite);

  const siteConfig = siteSelectors[currentSite];
  if (!siteConfig) {
    debugLog(`No configuration for site: ${currentSite}`);
    return;
  }

  const items = Array.from(document.querySelectorAll(siteConfig.selector))
    .filter(siteConfig.validate);

  debugLog(`Found ${items.length} items`);

  if (items.length === 0) {
    debugLog('No items found. Check your selector and page structure.');
    return;
  }

  const cartItems = [];
  
  // Use sequential processing to avoid overwhelming API
  for (const item of items) {
    try {
      const itemName = item.textContent.trim();
      const ecoscore = await getEcoscore(itemName);
      const alternatives = await findAlternativeProducts(itemName, ecoscore);
      
      cartItems.push({ 
        name: itemName, 
        ecoscore: ecoscore,
        alternatives: alternatives
      });
    } catch (error) {
      debugLog(`Error processing item: ${item.textContent}`, error);
    }
  }

  debugLog('Final cart items:', cartItems);

  // Display results
  if (cartItems.length > 0) {
    const resultsWindow = window.open('', '_blank');
    resultsWindow.document.write(`
      <html>
      <head>
        <title>Cart Eco-Analysis</title>
        <style>
          body { font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px; }
          .item { margin-bottom: 20px; border-bottom: 1px solid #eee; }
          .alternatives { margin-left: 20px; color: #666; }
        </style>
      </head>
      <body>
        <h1>Eco-Friendly Cart Analysis</h1>
        ${cartItems.map(item => `
          <div class="item">
            <h2>${item.name} (Ecoscore: ${item.ecoscore})</h2>
            ${item.alternatives.length > 0 ? `
              <div class="alternatives">
                <h3>Top Alternatives:</h3>
                <ul>
                  ${item.alternatives.map(alt => `
                    <li>${alt.name} (Ecoscore: ${alt.ecoscore})</li>
                  `).join('')}
                </ul>
              </div>
            ` : '<p>No better alternatives found.</p>'}
          </div>
        `).join('')}
      </body>
      </html>
    `);
    resultsWindow.document.close();
  }
};

// Enhanced wait for selector with timeout
const waitForSelector = (selector, callback, maxAttempts = 10, interval = 1000) => {
  let attempts = 0;
  const checkInterval = setInterval(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      clearInterval(checkInterval);
      callback();
    }
    
    attempts++;
    if (attempts >= maxAttempts) {
      clearInterval(checkInterval);
      debugLog(`Selector ${selector} not found after ${maxAttempts} attempts`);
    }
  }, interval);
};

// Main execution
const currentSite = window.location.hostname;
debugLog('Script initialized for:', currentSite);

if (siteSelectors[currentSite]) {
  debugLog('Waiting for selector:', siteSelectors[currentSite].selector);
  waitForSelector(
    siteSelectors[currentSite].selector, 
    extractCartItems
  );
} else {
  debugLog('No configuration for current site');
}

