//  affichage numéro de commande 
const OrderNumber = new URL(location.href).searchParams.get("orderId");
document.getElementById("orderId").innerText = OrderNumber + "\n Merci beaucoup et à bientôt!";