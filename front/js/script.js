function getProduct (){
    fetch('http://localhost:3000/api/products')
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    })
    .then(function(products){
        for (let i = 0; i < products.length; i++){
            const product = products[i]
            
            const sectionItems = document.querySelector('#items')
            // Récupération de l'élément du DOM
            //Target la section hôte
            const lienElt = document.createElement('a')
            lienElt.href = `./product.html?id=${product._id}`
            
            const articleElt = document.createElement('article')

            const imageElt = document.createElement('img')
            imageElt.src = product.imageUrl
            imageElt.alt = 'Lorem ipsum dolor sit amet, Kanap name1'

            const headerElt = document.createElement('h3')
            headerElt.className = 'productName'
            headerElt.innerText = `${product.name}`

            const paragraphElt = document.createElement('p')
            paragraphElt.className = 'productDescription'
            paragraphElt.innerText = `${product.description}`

            //Emboitage de tout les element
            articleElt.appendChild(imageElt)
            articleElt.appendChild(headerElt)
            articleElt.appendChild(paragraphElt)
            lienElt.appendChild(articleElt)
            sectionItems.appendChild(lienElt)
        }       
    })
    .catch(function(error){
        console.log(error)
    })
}

getProduct()


