const catList = document.getElementById("cat-list");
const catList2 = document.getElementById("cat-list2");
const asideSec = document.getElementById("result");
const showSection = document.getElementById("show-row");
const cuisineShow = document.getElementById('col-cuisine');



let resId = [];
let count = 0;
let photsss;
let photoUrl = [];
let photoId = [];
let resAddress;
let resPhone;
let resCuisines;
let resDelivery ;
let resName;

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
    const elmts = `<div class="check-cats1">
    <input type="checkbox" data-id="${id}" name="cat"
    />
<label for="cat">${name}</label>
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
  let restaurants;
  fetch("https://developers.zomato.com/api/v2.1/restaurant?res_id=19360573", {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" }, "res_id": resId

  })
    .then((res) => res.json())
    .then((results) => (restaurants = results))
    .then(() => renderShowSelected(restaurants));
}

function renderShowSelected(searchs = []) {
  const{photos} = searchs;
  console.log(searchs);
  let index = 0;
  for(phot of photos){
    const{photo:
      {url,id} } = phot;
      index+=1;
      photoUrl[index] = url;
      photoId[index] = id;
  }
  photoUrl = photoUrl[1];
  photoId = photoId[1];
  // console.log(photoUrl,photoId);

    // const elmts = `<div data-id="${photoId}">
    //      <img id="img-show" src=${photoUrl} />
    // </div>`;
    // showSection.innerHTML = showSection.innerHTML + elmts;
  

}



async function renderSearch(searchs = []) {
  const { restaurants } = searchs;
  console.log(searchs);
  for (let rest of restaurants) {
    const {
      restaurant: {
        id,
        name,
        R: { res_id,has_menu_status:{delivery,takeaway} },
        location:{address},
        phone_numbers,
        cuisines,
      },
    } = rest;
    resId[0] = res_id;
    resAddress = address;
    resPhone = phone_numbers;
    resCuisines = cuisines;
    resDelivery = delivery;
    resName = name;
    const elmts = `<div id="left-items" data-id="${res_id}">
    <p>${name}</p>
</div>`;
    asideSec.innerHTML = asideSec.innerHTML + elmts;
    
    
  }
    console.log(resName);
    console.log(resDelivery);
    console.log(resAddress);
    console.log(resPhone);
    console.log(resCuisines);
  
}

function showId() {
  const { id } = photsss;
  console.log(id);
}

function fetchCuisines(){
  let cuisines;
  fetch("https://developers.zomato.com/api/v2.1/cuisines?city_id=250",
    {headers:{"user-key":"6c11b6f8975b808590064388ed3f37a8"},})
    .then((res) => res.json())
    .then((results) => (cuisines = results))
    .then(() => renderCuisines(cuisines));
}

async function renderCuisines(result = []) {
   const{cuisines} = result;
   for(cuis of cuisines){
     const{cuisine:{cuisine_id,cuisine_name}} = cuis;
    //  console.log(cuisine_name);

     const elmts = `<div id="cuisine-list" data-id="${cuisine_id}">
    <p>${cuisine_name}</p>
</div>`;
    cuisineShow.innerHTML = cuisineShow.innerHTML + elmts;
   }
}


window.addEventListener("load", getCategories);
window.addEventListener("load", fetchCuisines);
window.addEventListener("load", fetchSearch);
window.addEventListener("load", fetchShowSelected);
// showSection.addEventListener('click', showId);





/*
for (let category of categories) {
    const {
      categories: { id, name },
    } = category;
    const elmts = `<div class="check-cats1" data-id="${id}">
    <input type="checkbox" data-id="${id}" name="cat1"
    />
<label for="cat1">${name}</label>
    </div>`;
    catList.innerHTML = catList.innerHTML + elmts;
  }


let counter = 1;
for(let i=0; i<data.length; i++) {
  if(counter === 1) {
    console.log('Start Column <div class="column">')
  }
  console.log(data[i]+'\n')
  if( i%8 === 0 && counter!== 1 ) {
    console.log('End  Column </div>')
    counter = 1; //Reset counter
  } else {
    counter++
  }
  
}

if(counter > 1  ) {
  console.log('End  Column </div>')
}*/