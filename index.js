(function () {

 /**  
  * function to fetch text data from source.
  * @param {string}      url        location of html snippet file.
  * @param {HTMLElement} element    DOM node to load on the page.
  */
  let fetchHTMLDataFromSource = function (url, element) {
    if (window.fetch) {
      fetch(url).then(response => response.text()).then(data => {
        element.innerHTML = data;
      }).catch((e) => { console.log(e) });
    } else {
      console.log('Your browser does not support fetch API');
      /* Implement using XMLHttpRequest */
    }
  }

 /**  
  * function to load html snippets.
  */
  let loadHTMLSnippetsToDOM = function () {
    let snippets = ['header', 'section' ,'button', 'footer', 'modal'];
    for(i=0; i<snippets.length ; i++) {
      fetchHTMLDataFromSource(`snippets/${snippets[i]}.html`, document.getElementById(`${snippets[i]}`));
    }
  }

  loadHTMLSnippetsToDOM();

 /**  
  * function to fetch  JSON data from source.
  * @param {string}   url   location of pet JSON file.
  */
  let fetchJSONDataFromSource = function (url) {
    if (window.fetch) {
      fetch(url).then(response => response.json()).then(data => {
        if (data && data.dogs) {
          displayPetGallery(data.dogs);
        } else {
          displayNotFoundError();
        }
      }).catch((e) => { console.log(e) });
    } else {
      console.log('Your browser does not support fetch API');
      /* Implement using XMLHttpRequest */
    }
  }

  
  fetchJSONDataFromSource('/assets/data/dogs.json');

 /**  
  * function to display gallery thumbnail cards using pure javascript.
  * @param {Array}    pets    paginated pet data.
  * @param {number}   page    page Number.
  */
  let displayPetCards = function (pets, page) {
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

 /**  
  * function to display full size image in a modal.
  * @param {number}   index   pet index.
  * @param {number}   page    page Number.
  */
  let displayPetModal = function (index, page) {
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

 /**  
  * function to split data into multiple chunks for lazy loading.
  * @param   {Array}   pets   flat pet Array.
  * @returns {Array}   paginated pet Array. 
  */
  let getPaginatedData = function (pets) {
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

 /**  
  * function to display load more button.
  * @param {Array}  paginatedPetData   paginated pet Array.
  */
  let displayLoadMoreButton = function (paginatedPetData) {
    let button = document.getElementById('loadMoreBtn');
    let i = 1;
    let pageNo = 2;
    button.onclick = function () {
      if (i < paginatedPetData.length) {
        displayPetCards(paginatedPetData[i++], pageNo);
        pageNo++
      } else {
        button.disabled = true;
        button.innerHTML = 'no more data'
      }
    }
  }

 /**  
  * function to display gallery data with button.
  * @param {Array}  paginatedPetData   paginated pet Array.
  */
  let displayPetGallery = function (pets) {
    let paginatedPetData = getPaginatedData(pets);
    displayPetCards(paginatedPetData[0], 1);
    displayLoadMoreButton(paginatedPetData);
  }

 /**  
  * function to display error message if there is no data available.
  */
  let displayNotFoundError = function () {
    let galleryContainer = document.getElementById('galleryContainer');
    const notFoundError = document.createElement('h3');
    notFoundError.innerHTML = 'Pet data unavailable!';
    notFoundError.style.color = 'red';
    galleryContainer.appendChild(notFoundError);
  }
}());

