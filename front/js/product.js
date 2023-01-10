const id = window.location.search.split("?id=").join("")
//console.log(id)

fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(res){
        if(res.ok){
            return res.json()
     }
    })
    .then(function(value){
        //utiliser le DOM pour modifier l'HTML grace a innerHTML
        
        //image du produit
        document.getElementsByClassName('item__img')[0].innerHTML =
        `<img src=${value.imageUrl} alt="Photographie d'un canapé"></img>`
         
        //titre du produit et prix
         document.getElementsByClassName('item__content__titlePrice')[0].innerHTML = 
        `<h1 id="title">${value.name}</h1><p>Prix : <span id="price">${value.price}</span>€</p>`

        //description du produit
        document.getElementsByClassName('item__content__description')[0].innerHTML = 
        `<p class="item__content__description__title">Description :</p><p id="description">${value.description}</p>`

        //option de couleurs
        const color = document.getElementById('colors')
        //console.log(color)
        for (let i = 0; i < value.colors.length; i++){
             //console.log(value.colors[i])
             //const color = document.getElementById('colors')
                
            const couleurs = document.createElement('option') 
            couleurs.innerHTML = `<option value="${value.colors[i]}">${value.colors[i]}</option>`
            //console.log(couleurs)
            color.append(couleurs)
            //return couleurs | marche pas
        }
    })
    .catch(function(error){
        console.log(error)
})


function panier () {
    //Target le bouton et lui ajouter un eventlistener
    const boutton = document.querySelector("#addToCart")
    //setup du localestorage
    let cart = []
    localStorage.setItem("produitDuPannier", JSON.stringify(cart))

    boutton.addEventListener("click", () => {
        //defenir les objets
        let quantitee = document.querySelector("#quantity").value
        let couleur = document.querySelector("#colors").value

        //message d'erreur en cas de mauvaise selection des couleurs ou des quantitées
        if (couleur == "" || quantitee >= 101 || quantitee <= 0){
            return window.alert("merci de choisir une couleur et une quantité")
        }

    })
}
panier()




































/*function ajoutPannier() {
    //Loger le bouton ajouter au panier
    const bouttonPannier = document.querySelector("#addToCart")

    // Listener du bouton quand il est cliqué
    bouttonPannier.addEventListener("click", () => {

        //Definition des objets
        let choixQuantitee = document.querySelector("#quantity")
        let choixCouleur = document.querySelector("#colors")
        let quantitee =+ choixQuantitee.value
        let color = choixCouleur.value
        let _id = id

        //Afficher un message d'erreur si il manque un champ non remplis
        if (color == null || color == "" || quantitee == null || quantitee == 0) {
            return window.alert("Merci de choisir une couleur et une quantité")
        } 

        //permet de limité la quantité d'un article
        if (choixQuantitee.value >= 101) {
            choixQuantitee.value = 0
        }
        if (choixQuantitee.value < 0) {
            choixQuantitee.value = 0
        }

        // condition verification des champs bien rentrés
        if (choixQuantitee.value > 0 && choixQuantitee < 101 && choixCouleur.value != 0) {
            if (localStorage.getItem("produitDuPannier")) {
                // condition présence dans le panier
                let tableauObjet = getCart()
                //verification présence d'item
                const produitATrouver = tableauObjet.find(
                    (el) => el._id === id && el.color === color
                )
                if (produitATrouver) {
                    // definition de la variable de la nouvelle quantitée
                    let nouvelleQuantitee = quantitee + produitATrouver.quantity

                    // Ajout de la nouvelle quantitée au produit
                    produitATrouver.quantity = nouvelleQuantitee
                    if(nouvelleQuantitee > 100) {
                        window.alert("merci de choisir une quantité de maximum 100 pour un même article")
                        return nouvelleQuantitee
                    }
                    localStorage.setItem("produitDuPannier", JSON.stringify(tableauObjet))
                }
                // condition si l'objet n'est pas trouvé
                else {
                    //recupération du localstorage
                    let tableauObjet = JSON.parse(localStorage.getItem("produitDuPannier"))
                    let boiteProduit = {
                        quantitee: parseFloat(choixQuantitee.value),
                        color,
                        _id
                    }

                    //intégration de la boite dans le LS
                    tableauObjet.push(boiteProduit)
                    let stockProduit = JSON.stringify(tableauObjet)
                    localStorage.setItem('produitDuPannier', stockProduit)
                }
            } //condition non présence dans le panier
            else {
                let tableauObjet = []

                //definition des objets
                let choixQuantitee = document.querySelector("#quantity")
                let choixCouleur = document.querySelector('#colors')
                let _id = id;
                
                let boiteProduit = {
                    quantity: parseFloat(choixQuantitee.value),
                    color,
                    _id
                }

                //intégration de la boite dans le LS
                tableauObjet.push(boiteProduit)
                let stockProduit = JSON.stringify(tableauObjet)
                localStorage.setItem("produitDuPannier", stockProduit)
            }
            //transport vers la page panier
            lienPannier(),
            function lienPannier() {
                document.location.href = "cart.html"
            }
        }
    })
}
ajoutPannier()

function getCart(){
    let cart = []
    if (localStorage.getItem("produitDuPannier")) {
        cart = JSON.parse(localStorage.getItem("produitDuPannier"))
    }
    return cart
}*/





/*function ajoutPanier () {
    const addcart = document.querySelector("#addToCart")
    addcart.addEventListener("click", () =>{
        //loger le produit pour le localestorage
        const color = document.querySelector('#colors').value
        let quantity = document.querySelector('#quantity').value

        if (cart.length !== null) {
            let cart = []
        }
        //let cart = []
        //choisir une couleur et une quantitées réel
        if (color == "" || quantity <= 0 || quantity >= 101) {
            return alert("Choisiez une couleur et une quantitées entre 1 et 100.")
        }
        let cartItem = {
            id: id,
            color: color,
            quantity: quantity
        }
        cart.push(cartItem)

        localStorage.setItem('cart', JSON.stringify(cart))
    })
}
ajoutPanier()*/
