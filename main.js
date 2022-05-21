const midiv = document.getElementById ('container')
const informacion = {
   personajes: []
}

const getdatafromApi =() => {
   const URI = "https://gateway.marvel.com/v1/public";
   const CREDENTIALS ="ts=1&apikey=368fc019a9f06ba3fc25b3550740bab1&hash=10886e4249a4e27474824d00e911fb0f"
   return fetch(`${URI}/characters?${CREDENTIALS}`)
}


const getCharacter = (name) => {
   const URI = "https://gateway.marvel.com/v1/public";
   const CREDENTIALS = "&ts=1&apikey=5230904141b43d248f5e8468e0ff6759&hash=81ab3e48092d910b0c726ab8f0e902be"
   if (name === "")  return fetch(URI + "/characters?" + CREDENTIALS) 
   const parsedName = name.replaceAll(" ", "%20")
   return fetch(URI + "/characters?" + "nameStartsWith=" + parsedName + CREDENTIALS)
}




const createAcard = ({thumbnail: {path, extension}, name}) =>{
   return `<div class="image-container">
               <img class = "card-image" src = "${path}.${extension}" />
            </div>
            <div class="description-container">
               <h1>${name}</h1>
            </div>`
}

//arreglo de nodos
const createListNodeElement = (personaje) => {
   const myDiv = document.createElement('div')
   myDiv.className = 'card-big-box'
   myDiv.innerHTML = createAcard(personaje)
   return myDiv
}

const renderNodes = (arrayNodes) => {
   midiv.innerHTML=null
   arrayNodes.forEach((Node) =>{
      midiv.appendChild(Node)
   })

}

const search = document.getElementById("search");
search.addEventListener("input",(event) => {
   getCharacter(event.target.value)
   .then(data=>data.json())
   .then(({data:{results}})=>{
      const nombresDePersonajes = results.map((personaje) => {
         return createListNodeElement(personaje)
      })
      renderNodes(nombresDePersonajes)
   })



})

//destructuring
//spread operator
const callbackFunction = () => {
   getdatafromApi()
   .then((data) => data.json())
   .then(({data: {results}}) => {
      const nombresDePersonajes = results.map((personaje) =>{
         return createListNodeElement(personaje)
      })
          renderNodes(nombresDePersonajes)
       
   
   })
}


window.addEventListener('load', callbackFunction)

