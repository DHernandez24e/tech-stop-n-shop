// const { search } = require("../../controllers/home-routes");

async function editFormHandler(event) {
    event.preventDefault();
    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    // ];
    const search = document.querySelector('input[name="search"]').value.trim();
    // const email = document.querySelector('input[name="email"]').value.trim();
    // const password = document.querySelector('input[name="password"]').value.trim();
    console.log(" I am here")
    // console.log(userName)
    // console.log(email)
    // console.log(password)
    // console.log(stock)

    await fetch(`/search`, {
        method: 'GET',
        search ,
        // body: JSON.stringify({
        //   username,
        //   email,
        //   password
        // }),
        headers: {
          'Content-Type': 'application/json'
        }
    //   }).then(response => { 
     }).then(dbProductData => {
      //  JSON.parse(dbProductData)
    let respJason =   JSON.parse(JSON.stringify(dbProductData));
    console.log("response is :")
    // console.log(response)
    // console.log("response json is :")
    // console.log(respJason[0].product_name)
    // document.location.replace('/search');
})
}
  document.querySelector('#search-button').addEventListener('click', editFormHandler);
