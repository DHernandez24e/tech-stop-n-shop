async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('input[name="username"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();

  if (username && password && email) {
    const response = await fetch(`/api/users`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // check response status
    if (response.ok) {
      const res2 = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res2.ok) {
        document.location.replace('/');
      }
    } else {
      alert(response.statusText)
    }

  }
};

document.querySelector('#submitButton').addEventListener('click', signupFormHandler);
