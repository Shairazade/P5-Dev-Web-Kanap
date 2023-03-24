//  affichage numéro de commande 
const orderNumber = new URL(location.href).searchParams.get("orderId");
document.getElementById("orderId").innerText = orderNumber + "\n Merci et à bientôt!";
console.log(orderNumber);