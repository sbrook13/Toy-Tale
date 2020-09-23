let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollection = document.querySelector('#toy-collection')

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(createCards)

  const newToyForm = document.querySelector('.add-toy-form')
  newToyForm.addEventListener('submit', event => {
    event.preventDefault()
    handleForm(newToyForm)
  })

  function handleForm(newToyForm){
    const newToyData = new FormData(newToyForm)
    const name = newToyData.get('name')
    const image = newToyData.get('image')

    const toyCard = document.createElement('div')
    toyCard.classList.add('card')

    renderNewToy(name, image, toyCard)
    persistNewToy(name, image)
  }

  function renderNewToy(name, image, toyCard, likes = 0){
    addTitle(name, toyCard)
    addImage(image, toyCard)
  }

  function createCards(toys){
    toys.forEach(showToy)
  }

  function showToy(toy){
    const toyCard = document.createElement('div')
    toyCard.classList.add('card')
    addTitle(toy.name, toyCard)
    addImage(toy.image, toyCard)
    createLikeButton(toy, toyCard)
  }
       
  function addTitle(name, toyCard){
    const h2 = document.createElement('h2')
    h2.textContent = name
    toyCard.append(h2)
    toyCollection.append(toyCard)
  }

  function addImage(image, toyCard){
    const img = document.createElement('img')
    img.src = image
    img.classList.add('toy-avatar')
    toyCard.append(img)
    toyCollection.append(toyCard)
  }

  function createLikeButton(toy, toyCard){
    const button = document.createElement('button')
    button.classList.add('like-btn')
    button.innerText = 'Like'

    const likesLine = document.createElement('p')
    likesLine.textContent = `${toy.likes} Likes`

    toyCard.append(likesLine, button)
    toyCollection.append(toyCard)

    button.addEventListener('click', () => increaseLikes(toy, likesLine)) 
  }

  function increaseLikes(toy, likesLine){
    toy.likes++
    likesLine.textContent = `${toy.likes} Likes`
    persistLikes(toy)
  }
    
  function persistNewToy(name, image){
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, image, likes: 0 })
    }).then(response => response.json())
    .then(createLikeButton(toy.likes, toyCard))
    //  need to pass in the toyCard
  }

  function persistLikes(toy){
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: toy.likes})
    })
  }

});
