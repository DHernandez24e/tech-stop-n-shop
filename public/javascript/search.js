async function searchFormHandler(event) {
  event.preventDefault();

  console.log("SEARCHING");
  const query = document.querySelector('#search-field').value.trim();

  if (query) {
    const response = await fetch(`/api/products/search/${query}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

const submit = document.querySelector('#search-btn');
submit.addEventListener('click', searchFormHandler);
