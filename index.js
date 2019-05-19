function displayPetCards(pets, page) {
  if (pets && pets.length > 0) {
    for (let i = 0; i < pets.length; i++) {
      let img = document.createElement('img');
      let wrapperDiv = document.createElement('div');
      wrapperDiv.setAttribute('class', 'site-section__pet-card');
      let thumbnailUrl = pets[i].image.replace('/raw/', '/thumbnail/');
      img.id = `petCard__${i}__page${page}`;
      img.src = thumbnailUrl;
      img.alt = pets[i].source;
      img.setAttribute('class', 'site-section__pet-img')
      wrapperDiv.appendChild(img);
      document.getElementById('galleryContainer').appendChild(wrapperDiv);
      displayPetModal(i, page);
    }
  }
}

function displayPetModal(index, page) {
  let modal = document.getElementById('siteModal');
  let img = document.getElementById(`petCard__${index}__page${page}`);
  let modalImg = document.getElementById('siteModalContent');
  let modalInfo = document.getElementById('siteModalInfo');
  img.onclick = function () {
    modal.style.display = 'block';
    modalImg.src = this.src.replace('/thumbnail/', '/raw/');
    modalInfo.innerHTML = this.alt;
  }

  let span = document.getElementsByClassName('site-modal__close')[0];
  span.onclick = function () {
    modal.style.display = 'none';
  }
}

function getPaginatedData(pets) {
  let numOfPetsPerPage = 10;
  let paginatedPetData = []
  if (pets && pets.length > numOfPetsPerPage) {
    for (let i = 0; i < pets.length; i += numOfPetsPerPage) {
      paginatedPetData.push(pets.slice(i, i + numOfPetsPerPage))
    }
    return paginatedPetData;
  }
  return pets;
}

function displayLoadMoreButton(paginatedPetData) {
  let button = document.getElementById('loadMoreBtn');
  let i = 1;
  let pageNo = 2;
  button.onclick = function () {
    if (i < paginatedPetData.length) {
      displayPetCards(paginatedPetData[i++], pageNo);
      pageNo++
    }
  }
}

function displayPetGallery(pets) {
  let paginatedPetData = getPaginatedData(pets);
  displayPetCards(paginatedPetData[0], 1);
  displayLoadMoreButton(paginatedPetData);
}

function displayNotFoundError() {
  let galleryContainer = document.getElementById('galleryContainer');
  const notFoundError = document.createElement('h3');
  notFoundError.innerHTML = 'Pet data unavailable!';
  notFoundError.style.color = 'red';
  galleryContainer.appendChild(notFoundError);
}

window.onload = function () {
  $('#header').load('snippets/header.html');
  $('#section').load('snippets/section.html');
  $('#button').load('snippets/button.html');
  $('#footer').load('snippets/footer.html');
  $('#modal').load('snippets/modal.html');

  if (window.fetch) {
    fetch('/assets/data/dogs.json').then(response => response.json()).then(data => {
      if (data && data.dogs) {
        displayPetGallery(data.dogs);
      } else {
        displayNotFoundError();
      }
    }).catch((e) => { console.log(e) });
  } else {
    console.log('Your browser doe not support fetch API');
    /*Implement using XMLHttpRequest*/
  }

}