async function editFormHandler(event) {
    event.preventDefault();
    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    // ];
    const username = document.querySelector('input[name="username"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    console.log(" I am here")
    // console.log(userName)
    console.log(email)
    console.log(password)
    // console.log(stock)
    if (username && email && password) {
    const response =    await fetch(`/api/users`, {
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
}  
  document.querySelector('#submitButton').addEventListener('click', editFormHandler);
