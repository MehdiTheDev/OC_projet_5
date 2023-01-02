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

function ajoutPanier () {
    const addcart = document.querySelector("#addToCart")
    addcart.addEventListener("click", () =>{
        //loger le produit pour le localestorage
        const color = document.querySelector('#colors').value
        const quantity = document.querySelector('#quantity').value
        const price = document.querySelector('#price').textContent
        //choisir une couleur et une quantitées réel
        if (color == "" || quantity <= 0 || quantity >= 101) {
            return alert("Choisiez une couleur et une quantitées entre 1 et 100.")
        }
        const data = {
            id: id,
            quantity: Number(quantity),
            color: color,
        }
        localStorage.setItem(id, JSON.stringify(data))
    })
}
ajoutPanier()
