function displayPetCards (dogs) {
  for (let i = 0; i < dogs.length; i++){
    let galleryContainer = document.getElementById('galleryContainer');
    let img = document.createElement('img');
    let wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('class', 'site-section__pet-card');
    img.src = dogs[i].image;
    img.alt = 'pet image';
    img.style.width ='300px';
    img.style.height = '300px';
    wrapperDiv.appendChild(img);
    galleryContainer.appendChild(wrapperDiv);
   }
}

window.onload = function() {
  $("#header").load("snippets/header.html");
  $("#section").load("snippets/section.html"); 
  $("#footer").load("snippets/footer.html"); 

  fetch('/assets/data/dogs.json').then((response) => response.json()).then((data) => {
    displayPetCards(data.dogs);
  });
}