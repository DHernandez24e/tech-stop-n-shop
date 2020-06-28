async function searchFormHandler(event) {
  event.preventDefault();

  console.log("SEARCHING");
  const query = document.querySelector('#search-field').value.trim();

  // if user has entered a search query, use that to call search route
  if (query) {
    document.location.replace(`/search/${query}`);
  }
}

document.querySelector('#search-btn').addEventListener('click', searchFormHandler);
