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

panier()
function panier () {
    //Target le bouton et lui ajouter un eventlistener
    const boutton = document.querySelector("#addToCart")
    //listener action quand le bouton est cliqué
    boutton.addEventListener("click", () => {
        //defenir les objets
        let choixQuantitee = document.querySelector("#quantity")
        let choixCouleur = document.querySelector("#colors")
        let quantitee = +choixQuantitee.value
        let _id = id
        let color = choixCouleur.value
        /*console.log(_id)
        console.log(choixQuantitee)
        console.log(choixCouleur)
        console.log(quantitee)
        console.log(color)*/
        //message d'erreur en cas de mauvaise selection des couleurs ou des quantitées
        if (color == "" || quantitee >= 101 || quantitee <= 0){
            return window.alert("merci de choisir une couleur et une quantité")
        }        
        //trouver si un produit est similaire pour incrementer la quantitée
        if (choixQuantitee.value >= 101){
            choixQuantitee.value = 0
        }
        if (choixQuantitee.value < 0){
            choixQuantitee.value = 0
        }
        
        // condition : verfifications des champs bien rentrés
        if (choixQuantitee.value > 0 && choixQuantitee.value < 101 && choixCouleur !== 0) {
            //condition : présence dans le panier
            if (localStorage.getItem("produitDuPannier")) {

                //récupération du panier
                let tableauObjet = getCart()
                //vérification présence d'item
                const produitATrouver = tableauObjet.find((el) =>
                    el._id === id && el.color === color
                    //console.log(el.color)
                )
                //condition si l'objet est trouvé
                if (produitATrouver) {
                    //définition de la variable de la nouvelle quantitée
                    let nouvelleQuantitee = quantitee + produitATrouver.quantity
                    console.log(nouvelleQuantitee)
                    //Ajout de la nouvelle quantité au produit
                    produitATrouver.quantity = nouvelleQuantitee
                    console.log(nouvelleQuantitee)
                    if (nouvelleQuantitee > 100) {
                        window.alert("merci de choisir une quantité de maximum 100 pour un même article")
                        return nouvelleQuantitee
                    }
                    localStorage.setItem("produitDuPannier", JSON.stringify(tableauObjet))
                }
                //condition si l'objet n'est pas trouvé
                else {
                    let tableauObjet = JSON.parse(localStorage.getItem("produitDuPannier"))
                    //création de la boite
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

                //condition non présence dans le panier
            }
            else {
                let tableauObjet = []

                //definitions des objet
                let choixQuantitee = document.querySelector("#quantity")
                let choixCouleur = document.querySelector("#colors")
                let _id = id
                let color = choixCouleur.value

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
            lienPannier()
            function lienPannier() {
                document.location.href = "cart.html"
            }
        }
    })
}

function getCart() {
    let cart = []
    if (localStorage.getItem("produitDuPannier")) {
        cart = JSON.parse(localStorage.getItem("produitDuPannier"))
    }
    return cart
}