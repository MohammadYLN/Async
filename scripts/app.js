const catList = document.getElementById("cat-list");
const asideSec = document.getElementById("result");
const showSection = document.getElementById("show-info");

let resId = [];
let count = 0;
let secrestaurants;
let photoUrl;
let photoId;

async function getCategories() {
  let categories;
  fetch("https://developers.zomato.com/api/v2.1/categories", {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
  })
    .then((res) => res.json())
    .then((cats) => (categories = cats))
    .then(() => renderCategories(categories));
}

function renderCategories(cats = []) {
  const { categories } = cats;
  for (let category of categories) {
    const {
      categories: { id, name },
    } = category;
    const elmts = `<div data-id="${id}">
        <p>${name}</p>
    </div>`;
    catList.innerHTML = catList.innerHTML + elmts;
  }
}

async function fetchSearch() {
  let restaurants;
  fetch("https://developers.zomato.com/api/v2.1/search", {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
  })
    .then((res) => res.json())
    .then((results) => (restaurants = results))
    .then(() => renderSearch(restaurants));
}

async function fetchShowSelected() {
  
  fetch("https://developers.zomato.com/api/v2.1/restaurant?res_id=19360573", {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8"},"res_id":resId
     
  })
    .then((res) => res.json())
    .then((results) => (secrestaurants = results))
    .then(() => renderShowSelected(secrestaurants));
}

function renderShowSelected(searchs = []) {
  const restaurant = searchs;
  const{photos} = restaurant;

  console.log(photos);
  for(let photo of photos){
    const{photo:{url,id}}=photo;
    photoUrl = url;
    photoId = id;
  }
  console.log(photoUrl)

    
        const elmts = `<div data-id="${photoId}">
         <img id="show-image-one" show-image-one" src="${photoUrl}"/>
    </div>`;
    showSection.innerHTML = showSection.innerHTML + elmts;
    
  }




async function renderSearch(searchs = []) {
  const { restaurants } = searchs;
  for (let rest of restaurants) {
    const {
      restaurant: {
        id,
        name,
        R: { res_id },
      },
    } = rest;
    resId[0] = res_id;
    const elmts = `<div id="left-items" data-id="${res_id}">
    <p>${name}</p>
</div>`;
    asideSec.innerHTML = asideSec.innerHTML + elmts;
    console.log(searchs);
  }
  // console.log(resId);
}


window.addEventListener("load", getCategories);
window.addEventListener("load", fetchSearch);
window.addEventListener("load", fetchShowSelected);











