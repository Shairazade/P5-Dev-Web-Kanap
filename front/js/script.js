// RECUPERR LES PRODUITS A PARTIR DE L'API
async function getProducts() {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
  
      
  
  // ET INSERER PRODUIT DANS LA PAGE D'ACCUEIL 
  
      data.forEach((element) => {
        const sectionItems = document.getElementById('items');
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
  
