async function logout() {
  console.log('We get here');
  const response = await fetch('/api/users/logout', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logout').addEventListener('click', logout);