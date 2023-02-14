// Récupération des produits depuis l'API
async function getProducts() {
    let product_sheet = await fetch('http://localhost:3000/api/products')
  .then(function(response){
    return response.json()
  }).then(function(data){
    
   
    const sectionItems = document.getElementById("items");

     // appel de ta fonction d'affichage
     console.log(data);
     data.forEach(element => {
        console.log(element)

    // Insérer les produits dans la page HTML

    const sectionItems = document.getElementById("items");
      const linkElement = document.createElement('a');
      linkElement.href = "./product.html?id=" + element._id;

      const articleElement = document.createElement('article');
      linkElement.appendChild(articleElement);

      const imageElement = document.createElement ("img");
      imageElement.src = element.imageUrl;
      imageElement.alt = element.altTxt;
      articleElement.appendChild(imageElement);

      const productName = document.createElement ('h3');
      productName.classList.add('productName');
      productName.textContent = element.name;
      articleElement.appendChild(productName);

      const productDescription = document.createElement('p');
      productDescription.classList.add('productDescription');
      productDescription.textContent = element.description;
      articleElement.appendChild(productDescription);

      
      sectionItems.appendChild(linkElement);



     });
});

}

const products = getProducts ();





