// AFFICHER UN TABLEAU RECAPITULATIF DES PRODUITS DANS LE PANIER
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

    function displayCartProduct() {
        const products = collectCartItem();
        const cartContainer = document.getElementById('item__cart');
        cartContainer.innerHTML = '';

        for (const item of products) {
          const article = document.createElement('article');
          article.classList.add('cart__item');
          article.dataset.id = item.productId;
          article.dataset.id = item.productColor;

          const itemImage = document.createElement('div');
          imageElement.classList.add('cart__item__img');
          const image = document.createElement('img');
          image.src = element.imageUrl;
          image.alt = element.altTxt;
          itemImage.appendChild(image);

          const itemContent = document.createElement('div');
          itemContent.classList.add('cart__item__content');

          const itemDescription = document.createElement('div');
          itemDescription.classList.add('cart__item__content__description');

          const name = document.createElement('h2');
          name.textContent = item.name;
          itemDescription.appendChild(name);
          const color = document.createElement('p');
          color.textContent = item.color; 
          itemDescription.appendChild(color);
          const price = document.createElement('p');
          price.textContent = `${item.price} €`;
          itemDescription.appendChild(price);

          const ItemContentSetting = document.createElement('div');
          ItemContentSetting.classList.add('cart__item__content__settings');

          const quantityContainer = document.createElement('div');
          quantityContainer.classList.add('cart__item__content__settings__quantity');

          const itemQuantity = document.createElement('p');
          itemQuantity.textContent = 'Qté :';
          




        



        }



    }










