  // RECUPERER L'ID DU PRODUIT A AFFICHER 
  function productIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    return productId;
  }

  const productId = productIdFromUrl();
    console.log(productId);



// INSERER UN PRODUITS ET SES DETAILS DANS PAGE PRODUIT
async function getProductDetails(productId) {
    try {
      const response = await fetch('http://localhost:3000/api/products/' + productId);
      const data = await response.json();
  
  
  // Insertion des détails du produit dans la page HTML   
        const imageElement = document.querySelector('.item__img');
        let image = document.createElement('img');
        image.src = data.imageUrl;
        image.alt = data.altTxt;
        imageElement.appendChild(image);
        
        
        const productName = document.getElementById('title');
        productName.textContent = data.name;
  
        const productDescription = document.getElementById('description');
        productDescription.textContent = data.description;
  
        const productPrice = document.getElementById('price');
        productPrice.textContent = data.price;
  
        
        const productColor= document.getElementById('colors');
        data.colors.forEach((color) => {
        const colorOption = document.createElement('option');
        colorOption.textContent = color;
        productColor.appendChild(colorOption);
      });
    
  // Capturer les erreurs qui pourrait survenir pendant la récupération des données depuis l'API
    } catch (error) {
      console.error(error);
    }
  }
    
    getProductDetails(productId);

    // AJOUTER DES PRODUITS DANS LE PANIER
let cart = [];

function addToCart(productId, quantity, color) {
  if (productId && quantity && color) {
    const index = cart.findIndex(item => item.productId === productId && item.color === color);
    if (index !== -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
        color
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Le produit a été ajouté au panier !`);
  } else {
    alert(`Veuillez rajouter les éléments manquant`);
  }
}

const addButton = document.getElementById('addToCart');

addButton.addEventListener('click', () => {
  const queryParams = new URLSearchParams(window.location.search);
  const productId = queryParams.get('id');
  const productQuantity = parseInt(document.getElementById('quantity').value);
  if (isNaN(productQuantity) || productQuantity <= 0) {
    alert('Veuillez saisir une quantité valide.');
    return;
  }
  const productColor = document.getElementById('colors').value;
  addToCart(productId,productQuantity,productColor);
});

console.log(cart);




