function init () {
  confirmationNum();
  displayPurchase();
  sessionStorage.clear();
}

function confirmationNum () {
  let num = Math.floor((Math.random() * 10000) + 10000); 
  let numarea = document.querySelector('#confirmationNum');

  numarea.textContent = `#${num}`;
}

function displayPurchase () {
  let purchase = JSON.parse(sessionStorage.getItem('shoppingCart'));
  console.log(purchase);

  let output = "";
  let total = [];
  for(var i in purchase) {
    total.push(purchase[i].count * purchase[i].price);
    output += `
    <tr>
      <th scope="row">${purchase[i].count}</th>
      <td>$${purchase[i].price}</td>
      <td>${purchase[i].name}</td>
      <td>$${purchase[i].count * purchase[i].price}</td>
      </tr>
    `;
  }

  let grandTotal = 0;
  for (let i = 0; i < total.length; i ++) {
    grandTotal += total[i];
    console.log(total[i]);
  }

  $('#items').html(output);
  $('#total').html(`$${grandTotal}`);
}

init();