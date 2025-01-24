const fetchFunction = async () => {
  const res= await fetch("https://zn4sjn71-3000.inc1.devtunnels.ms/api/translate", 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Hello, how are you'
    })
  }
  )
  const data = await res.json();
  console.log('data', data);
}

const val =fetchFunction();
console.log('val', val);