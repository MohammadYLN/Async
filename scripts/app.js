const catList = document.getElementById('cat-list');
const asideSec = document.getElementById('result');
const showSection = document.getElementById('show-info');

async function getCategories() {
  let categories;
  fetch(
    "https://developers.zomato.com/api/v2.1/categories",
    {
      headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
    }
  ).then(res => res.json())
    .then(cats => categories = cats)
    .then(() => renderCategories(categories));
}


async function fetchSearch() {
  let restaurants;
  fetch(
    "https://developers.zomato.com/api/v2.1/search",
    {
      headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
    }
  ).then(res => res.json())
    .then(results => restaurants = results)
    .then(() => renderSearch(restaurants));
}

async function fetchShowSelected() {
  let restaurants;
  fetch(
    "https://developers.zomato.com/api/v2.1/search",
    {
      headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
    }
  ).then(res => res.json())
    .then(results => restaurants = results)
    .then(() => renderShowSelected(restaurants));
}


function renderCategories(cats = []) {

  const { categories } = cats;
  for (let category of categories) {
    const {
      categories: {
        id,
        name
      }
    } = category;
    const elmts = `<div data-id="${id}">
        <p>${name}</p>
    </div>`;
    catList.innerHTML = catList.innerHTML + elmts;
  }
}


function renderSearch(searchs = []) {
  
  const {restaurants} = searchs;  
  for(let rest of restaurants){
    const {
      restaurant:{
        id,
        name
      }
    } = rest;
    const elmts = `<div data-id="${id}">
    <p>${name}</p>
</div>`;
asideSec.innerHTML = asideSec.innerHTML + elmts;
    console.log(searchs);
  }
}

function renderShowSelected(searchs = []) {
  
  const {restaurants} = searchs;
  for(let rest of restaurants){
    const
    {restaurant:
      {photos:
        {photo:
          {url}
        }}}=rest;
    console.log(url);
//     const elmts = `<div data-id="${id}">
//      <img class=""show-image-one" srs="${url}"/>
// </div>`;
// showSection.innerHTML = showSection.innerHTML + elmts;
    // console.log(featured_image);
  }
}


window.addEventListener("load", getCategories);
window.addEventListener("load",fetchSearch);
window.addEventListener("load",fetchShowSelected);



