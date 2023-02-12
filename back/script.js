// Récupération des produits depuis l'API
async function getProducts() {
    let product_sheet = await fetch('http://localhost:3000/api/products')
  .then(function(response){
    return response.json()
  }).then(function(data){
    
     // appel de ta fonction d'affichage
     console.log(data);
     data.forEach(element => {
        console.log(element)
        const imageElement = document.createElement ("img");
imageElement.src = element.imageUrl;

const sectionItems = document.getElementById("items");
sectionItems.appendChild(imageElement);
     });
});

  }


const products = getProducts ();





