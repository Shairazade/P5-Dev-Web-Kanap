// AFFICHER UN TABLEAU RECAPITULATIF DES PRODUITS DANS LE PANIER
async function displayCartProduct() {
   try {
 
       const products = collectCartItem();
       const cartContainer = document.getElementById('cart__items');
       cartContainer.innerHTML = '';
       

       for (const item of products) {
           const response = await fetch('http://localhost:3000/api/products/' + item.productId);
           const data = await response.json();
          
         const article = document.createElement('article');
         article.classList.add('cart__item');
         article.dataset.id = data._id;
         article.dataset.color = data.colors;
         cartContainer.appendChild(article);

         const itemImage = document.createElement('div');
         itemImage.classList.add('cart__item__img');
         article.appendChild(itemImage);

         const image = document.createElement('img');
         image.src = data.imageUrl;
         image.alt = data.altTxt;
         itemImage.appendChild(image);

         const itemContent = document.createElement('div');
         itemContent.classList.add('cart__item__content');
         article.appendChild(itemContent);

         const itemDescription = document.createElement('div');
         itemDescription.classList.add('cart__item__content__description');
         itemContent.appendChild(itemDescription);
       
         const name = document.createElement('h2');
         name.textContent = data.name;
         itemDescription.appendChild(name);
         const color = document.createElement('p');
         color.textContent = item.color; 
         itemDescription.appendChild(color);
         const price = document.createElement('p');
         price.textContent = `${data.price} €`;
         itemDescription.appendChild(price);

         const itemContentSetting = document.createElement('div');
         itemContentSetting.classList.add('cart__item__content__settings');
         itemContent.appendChild(itemContentSetting);

         const quantityContainer = document.createElement('div');
         quantityContainer.classList.add('cart__item__content__settings__quantity');
         itemContentSetting.appendChild(quantityContainer);

         const itemQuantity = document.createElement('p');
         itemQuantity.textContent = 'Qté :';
         quantityContainer.appendChild(itemQuantity);

         const quantityInput = document.createElement('input')
         quantityInput.type = 'number';
         quantityInput.className = 'itemQuantity';
         quantityInput.name = 'itemQuantity';
         quantityInput.min = 1;
         quantityInput.max = 100;
         quantityInput.value = item.quantity;
         quantityContainer.appendChild(quantityInput);

         const deleteContainer = document.createElement('div');
         deleteContainer.classList.add('cart__item__content__settings__delete');
         itemContentSetting.appendChild(deleteContainer);
         
         const deleteButton = document.createElement('p');
         deleteButton.classList.add('deleteItem');
         deleteButton.textContent = 'Supprimer';
         deleteContainer.appendChild(deleteButton);            
        
     }  
       
   } catch (error) {
       console.error(error);
   }
   }
   displayCartProduct();

// COLLECTER LES PRODUITS DU PANIER
function collectCartItem() {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const products = [];

    if (cartItems !== null) {
        cartItems.forEach(item => {
          let productExists = false;
          products.forEach(product => {
            if (item.id === product.id && item.color === product.color) {
              product.quantity += item.quantity;
              productExists = true;
            }
          });
    
          if (!productExists) {
            products.push(item);
          }
        });
      }
    
      return products;
    }

 collectCartItem();



    

//  SUPPRIMER UN PRODUIT


/*function deleteCartItem() {
  let cart = collectCartItem();

  for ( let input of deleteItemButton) {
    input.addEventListener('click', () => {
      if (window.confirm('Supprimer le produit ?'))
      {
        cart = cart.filter(p => (p.id + p.color)!= input.id)

      } 
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();   
    });
  }
}

deleteCartItem();*/

const deleteItemButton = document.querySelectorAll('.deleteItem');

function deleteCartItem() {
  let cart = collectCartItem();

  for (let input of deleteItemButton) {
      console.log(input);
      input.addEventListener('click', () => {
      console.log(input.id);
      if (window.confirm('Supprimer le produit ?'))
      {
        let i = 0;
        cart.forEach(p =>{
          if ((p.id + p.color) === input.id) {
            cart.splice(i,1);
          }
          i++;
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
      }    
    })
  }
}


// MODIFIER LA QUANTITE
  const inputQuantity = document.querySelectorAll('.itemQuantity');

  function updateQuantity() {
    let cart = collectCartItem();

    for (let input of inputQuantity) {
      input.addEventListener('change', ()=> {
         let modifyQuantity = parseInt(input.value);
         if (parseInt(modifyQuantity) > 0 && parseInt(modifyQuantity) <= 100) {
            cart.forEach(p => {
               if ((p.id + p.color) === input.id) {
                  p.quantity = modifyQuantity;
               }
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
         }
      });
   }
  }
    updateQuantity();

// RECALCULE DES QUANTITE 
function totalProduct() {
  const quantityProduct = document.querySelectorAll(".itemQuantity");
  console.log(quantityProduct.length);
  let totalNumber = 0;
  quantityProduct.forEach((quantity) => {
     totalNumber += parseInt(quantity.value);
      
      });
  totalQuantity.innerText = totalNumber;
}

totalProduct();

// PRIX TOTAL
let totalPrice = 0;
totalPrice += displayCartProduct.price * collectCartItem.quantity;

function displayTotalPrice (){
  const getTotalPrice = document.getElementById("totalPrice");
  getTotalPrice.innerText = totalPrice;
}

displayTotalPrice();


    //-------------- FORMULAIRE------------------

// regex
const regexFirstLastName = /^[A-Za-z][A-Za-z' -]*$/;
const regexaddress = /^[A-Za-z0-9\é\è\ê\-\s\.\,]{5,100}$/;
const regexCity = /^[A-Za-z\é\è\ê\ \,\-]{2,20}$/;
const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;


function validateForm() {
  let validData = true;

  // declaration des constantes des input
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");

  // declaration des messages erreurs
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  const emailErrorMsg = document.getElementById("emailErrorMsg");

  // Suppression des messages existants
  firstNameErrorMsg.innerText = "";
  lastNameErrorMsg.innerText = "";
  addressErrorMsg.innerText = "";
  cityErrorMsg.innerText = "";
  emailErrorMsg.innerText = "";

  if (!regexFirstLastName.test(firstName.value.trim())) {
     firstNameErrorMsg.innerText =
        "Le prénom doit contenir entre 3 et 20 lettres";
     validData = false;
  }
  if (!regexFirstLastName.test(lastName.value.trim())) {
     lastNameErrorMsg.innerText =
        "Le nom doit contenir entre 3 et 20 lettres";
     validData = false;
  }
  if (!regexaddress.test(address.value.trim())) {
     addressErrorMsg.innerText = "";
     validData = false;
     addressErrorMsg.innerText =
        "L'adresse doit contenir entre 5 et 100 caractères sans caractère spéciaux";   }
  if (!regexCity.test(city.value.trim())) {
     validData = false;
     cityErrorMsg.innerText =
        "La ville doit contenir entre 2 et 20 lettres"; }
  if (!regexEmail.test(email.value.trim())) {
     validData = false;
     emailErrorMsg.innerText =
        "Veuillez saisir une adresse mail valide";
  }
  return validData;

}

validateForm();



// BOUTON COMMANDE 

function validCommand() {
let cartItems = collectCartItem();
  const CommandButton = document.getElementById("order");
  CommandButton.addEventListener("click", (e) => {
     e.preventDefault();
     if (cartItems.length > 0) {
        if (validateForm()) {
           let productOrder = [];
           cartItems.forEach(order => {
              productOrder.push(order.id);
           });
           const order = {
              contact: {
                 firstName: firstName.value,
                 lastName: lastName.value,
                 address: address.value,
                 city: city.value,
                 email: email.value,
              },
              products: productOrder,
           };
           addServer(order);
        } else {
           e.preventDefault();
           alert("Veuillez vérifier le formulaire.");
        }
     } else {
        alert("Ajouter des produits dans le panier");
     }

  });
}
validCommand();

// envoi au backend
function addServer(order) {
  fetch("http://localhost:3000/api/products/order", {
     method: "POST",
     headers: {
        "Content-Type": "application/json",
     },
     body: JSON.stringify(order),
  })
     .then((response) => response.json())
     .then((response) => {
        localStorage.clear();
        window.location.href = "./confirmation.html?orderId=" + response.orderId;
     })
     .catch((error) => {
        alert(
           "Problème de chargement des produits.\nVeuillez nous excuser du désagrément.\nNous mettons tout en oeuvre pour régler le problème.\n" +
           error.message,
        );
     });
}


