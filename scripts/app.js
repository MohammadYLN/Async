const catList = document.getElementById("cat-list");
const asideSec = document.getElementById("result");
const showSection = document.getElementById("show-info");

let resId = [];
let count = 0;

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
  let secrestaurants;
  fetch("https://developers.zomato.com/api/v2.1/restaurant?res_id=19360573", {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8"},"res_id":resId
     
  })
    .then((res) => res.json())
    .then((results) => (secrestaurants = results))
    .then(() => renderShowSelected(secrestaurants));
}

function renderShowSelected(searchs = []) {
  // console.log("new is "+searchs);
  const { restaurant } = searchs;
  for (let restt of restaurant) {
    const {
      restaurant: {
        photos,
        R
      }
    } = restt;
    // console.log(R);
    //     const elmts = `<div data-id="${id}">
    //      <img class=""show-image-one" srs="${url}"/>
    // </div>`;
    // showSection.innerHTML = showSection.innerHTML + elmts;
    // console.log(featured_image);
  }
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
