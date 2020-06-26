async function searchFormHandler(event) {
  event.preventDefault();

  console.log("SEARCHING");
  const query = document.querySelector('#search-field').value.trim();

  if (query) {
    document.location.replace(`/search/${query}`);
  }
}

document.querySelector('#search-btn').addEventListener('click', searchFormHandler);
