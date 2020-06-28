async function editFormHandler(event) {
    event.preventDefault();
    // extract product id from url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // get number of items in inventory
    const stock = document.querySelector('input[name="inventory"]').value.trim();
    console.log(" I am here")
    console.log(stock)
    console.log(id)
    await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          stock
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      document.location.replace('/product-inventory');
  }
  
  document.querySelector('#inventory-submit').addEventListener('click', editFormHandler);

async function editFormHandler2(event) {
    event.preventDefault();
    // extract product id from url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // get number of items sold
    const num_sold = document.querySelector('input[name="sold"]').value.trim();
    console.log(" I am here")
    // console.log(stock)
    console.log(id)
    await fetch(`/api/products/sold/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          num_sold
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      document.location.replace('/product-inventory');
  }
  
  document.querySelector('#sold-submit').addEventListener('click', editFormHandler2);