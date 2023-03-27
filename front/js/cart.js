const cartContainer = document.getElementById('cart__items');
const inputsQuantity = document.getElementsByClassName("itemQuantity");
const deleteItemButton = document.getElementsByClassName('deleteItem');
const totalQuantity = document.getElementById("totalQuantity");
let totalPrice = 0;

// regex
const regexFirstLastName = /^[A-Za-z][A-Za-z' -]*$/;
const regexaddress = /^[A-Za-z0-9\é\è\ê\-\s\.\,]{5,100}$/;
const regexCity = /^[A-Za-z\é\è\ê\ \,\-]{2,20}$/;
const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;



// Collecter les produits du panier
let cartItems = JSON.parse(localStorage.getItem('cart')) || [] ;
console.log(cartItems);

// parcours le localstorage lors du chargement et recupère les produits
(async function PageLoad() {
    // verfication du panier vide 
    for (let product of cartItems) {

        const baseProduct = await getProduct(product.productId);
        console.log(product.productId);
        cartContainer.innerHTML += displayCartProduct(product,baseProduct);
        totalPrice += baseProduct.price * product.quantity;
        updateQuantity();
        deleteCartItem();
        totalProduct();
        displayTotalPrice();
    }
    validCommand();
})();

// APPEL API

async function getProduct(productId) {
   const response = await fetch(`http://localhost:3000/api/products/` + productId);
   if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
   }
   return   response.json();
}

// AFFICHER UN TABLEAU RECAPITULATIF DES PRODUITS DANS LE PANIER
   function displayCartProduct(product, baseProduct) {

      try {                 
         return `
         
         <article class="cart__item" " id="${product.id}" data-color="${product.color}">
            <div class="cart__item__img">
               <img src="${baseProduct.imageUrl}" alt="${baseProduct.altTxt}">
            </div>
            <div class="cart__item__content">
               <div class="cart__item__content__description">
               <h2>${baseProduct.name}</h2>
               <p>${product.color}</p>
               <p>${baseProduct.price} €</p>
               <p><span class="item_price_cart">${baseProduct.price}</span> €</p>
               </div>
               <div class="cart__item__content__settings">
               <div class="cart__item__content__settings__quantity">
                     <p>Qté : </p>
                     <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}"  id="quantity-${product.id} quantity-${product.color}">
               </div>
               <div class="cart__item__content__settings__delete">
                     <p class="deleteItem" id="del-${product.id} del-${product.color}">Supprimer</p>
               </div>
               </div>
            </div>
         </article> `;
        
      } catch (error) {
         console.error(error);
      }
   }
    

 
  // MODIFIER LA QUANTITE
  function updateQuantity() {

      for (let input of inputsQuantity) {
         input.addEventListener('change', ()=> {
            let modifyQuantity = parseInt(input.value);
            if (parseInt(modifyQuantity) > 0 && parseInt(modifyQuantity) <= 100) {
               cartItems.forEach(p => {
                  if (("quantity-"+p.id + ' quantity-'+p.color) === input.id) {
                     p.quantity = modifyQuantity;
                  }
               });
               localStorage.setItem("cart", JSON.stringify(cartItems));              
               totalProduct();                        
               
            }
         });
      }
   }    
 

 //  SUPPRIMER UN PRODUIT
   function deleteCartItem() {   
      for (let input of deleteItemButton) {
        
         input.addEventListener('click', () => {
         
            if (window.confirm('Supprimer le produit ?'))
            {
               let i = 0;
               cartItems.forEach(p =>{
                  if (("del-"+p.id + ' del-'+p.color) === input.id) {
                     cartItems.splice(i, 1);
                  }
                  i++;
               });
               localStorage.setItem('cart', JSON.stringify(cartItems));
               location.reload();
            }    
         })
      }
   }

   // BOUTON COMMANDE 
 
   function validCommand() {
  
      const CommandButton = document.getElementById("order");
      CommandButton.addEventListener("click", (e) => {
         e.preventDefault();
         if (cartItems.length > 0) {
             if (validateForm()) {
               let productOrder = [];
                cartItems.forEach(order => {
                  productOrder.push(order.productId);
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
 
 
 // RECALCULE DES QUANTITE 
   function totalProduct() {
      const quantityProduct = document.querySelectorAll(".itemQuantity");
      const priceProduct = document.querySelectorAll(".item_price_cart");
      let totalNumber = 0;
      let total = 0;

      for (let i=0;i < quantityProduct.length; i++){
         totalNumber += parseInt(quantityProduct[i].value);  
         total += parseInt(quantityProduct[i].value) * parseInt(priceProduct[i].innerHTML);
      }

      /*quantityProduct.forEach((quantity) => {

         totalNumber += parseInt(quantity.value);        

      });*/

      totalQuantity.innerText = totalNumber;
      document.getElementById("totalPrice").innerHTML = total;

   }
 
 
 // PRIX TOTAL
 function displayTotalPrice(){
   const getTotalPrice = document.getElementById("totalPrice");
   getTotalPrice.innerText = totalPrice;
 }


 
//-------------- FORMULAIRE------------------
 
 
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

 // envoi au backend
   function addServer(order) {  
      fetch("http://localhost:3000/api/products/order", {
         method: "POST",
         headers: {
            "Content-Type": "application/json;charset=utf-8",
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
   
   
 