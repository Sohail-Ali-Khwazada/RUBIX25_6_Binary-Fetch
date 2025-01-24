async function translate() {
  const res = await fetch("http://127.0.0.1:5000/translate", {
    method: "POST",
    body: JSON.stringify({
      q: "simple",
      source: "en",
      target: "hi",
      format: "text",
      alternatives: 3,
      api_key: ""
    }),
    headers: { "Content-Type": "application/json" }
  });
  
  const response = await res.json();
  console.log(response["translatedText"]);
}

translate();