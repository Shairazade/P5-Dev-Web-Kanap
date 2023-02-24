// Récupération des produits depuis l'API
async function getProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const data = await response.json();

    const sectionItems = document.getElementById('items');

// Insérer les produits dans la page HTML

    data.forEach((element) => {
      const linkElement = document.createElement('a');
      linkElement.href = './product.html?id=' + element._id;

      const articleElement = document.createElement('article');
      linkElement.appendChild(articleElement);

      const imageElement = document.createElement('img');
      imageElement.src = element.imageUrl;
      imageElement.alt = element.altTxt;
      articleElement.appendChild(imageElement);

      const productName = document.createElement('h3');
      productName.classList.add('productName');
      productName.textContent = element.name;
      articleElement.appendChild(productName);

      const productDescription = document.createElement('p');
      productDescription.classList.add('productDescription');
      productDescription.textContent = element.description;
      articleElement.appendChild(productDescription);

      sectionItems.appendChild(linkElement);
    });

// Capturer les erreurs qui pourrait survenir pendant la récupération des données depuis l'API
  } catch (error) {
    console.error(error);
  }
}

const products = getProducts();


function productIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  return productId;
}

const productId = productIdFromUrl();
console.log(productId);

// Récupération des détails du produit depuis l'API
async function getProductDetails(productId) {
  try {
    const response = await fetch('http://localhost:3000/api/products/' + productId);
    const data = await response.json();

// Insertion des détails du produit dans la page HTML
   

      const imageElement = document.getElementById('item-img');
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


