function displayPetCards(dogs) {
  let galleryContainer = document.getElementById('galleryContainer');
  if (dogs && dogs.length > 0) {
    for (let i = 0; i < dogs.length; i++) {
      let img = document.createElement('img');
      let wrapperDiv = document.createElement('div');
      wrapperDiv.setAttribute('class', 'site-section__pet-card');
      img.id = `petCard__${i}`;
      img.src = dogs[i].image;
      img.alt = dogs[i].source;
      img.style.width = '300px';
      img.style.height = '300px';
      wrapperDiv.appendChild(img);
      galleryContainer.appendChild(wrapperDiv);
      displayPetImage(i);
    }
  } else {
    const notFoundError = document.createElement('h3');
    notFoundError.innerHTML = 'Pet data unavailable!';
    notFoundError.style.color = 'red';
    galleryContainer.appendChild(notFoundError);
  }

}

function displayPetImage(num) {

  let modal = document.getElementById('siteModal');
  let img = document.getElementById(`petCard__${num}`);
  let modalImg = document.getElementById('siteModalContent');
  let modalInfo = document.getElementById('siteModalInfo');
  img.onclick = function () {
    modal.style.display = 'block';
    modalImg.src = this.src;
    modalInfo.innerHTML = this.alt;
  }

  let span = document.getElementsByClassName('site-modal__close')[0];
  span.onclick = function () {
    modal.style.display = 'none';
  }

}

window.onload = function () {
  $('#header').load('snippets/header.html');
  $('#section').load('snippets/section.html');
  $('#footer').load('snippets/footer.html');
  $('#modal').load('snippets/modal.html');

  fetch('/assets/data/dogs.json').then((response) => response.json()).then((data) => {
    displayPetCards(data.dogs);
  }).catch((e) => { console.log(e) });
}