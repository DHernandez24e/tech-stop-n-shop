async function searchFormHandler(event) {
  event.preventDefault();

  console.log("SEARCHING");
  const query = document.querySelector('#search-field').value.trim();

  if (query) {
    document.location.replace(`/search/${query}`);
  }
}

const submit = document.querySelector('#search-btn');
submit.addEventListener('click', searchFormHandler);
