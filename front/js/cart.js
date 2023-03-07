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


// AFFICHER UN TABLEAU RECAPITULATIF DES PRODUITS DANS LE PANIER
    async function displayCartProduct() {
    try {
  
        const products = collectCartItem();
        const cartContainer = document.getElementById('cart__items');
        cartContainer.innerHTML = '';

        for (const item of products) {
            const response = await fetch('http://localhost:3000/api/products/' + item.productId);
            const data = await response.json();
            console.log(data);
            console.log(item)


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

// Ajout des eventisteners pour les modification et supression
    const cartContainer = document.getElementById('cart__items');
    cartContainer.addEventListener('click', (event) => {
        const target = event.target;
        
        // suppression d'un produit dans le panier
        if (target.classList.contains('deleteItem')) {
        deleteCartItem(target);
        }
        
        // modification de la quantité d'un produit dans le panier
        if (target.classList.contains('itemQuantity')) {
        updateCartItem(target);
        }
        });

// SUPPRIMER UN PRODUIT DU PANIER
function deleteCartItem(target) {
    const productArticle = target.closest('.cart__item');
    const productId = productArticle.dataset.id;
    const productColor = productArticle.dataset.color;
    
    // Supprimer le produit du localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const updatedCartItems = cartItems.filter(item => !(item.id === productId && item.color === productColor));
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    
    // Réafficher tous les produits dans le panier (moins celui qui vient d'être supprimé)
    displayCartProduct();
    }




   
