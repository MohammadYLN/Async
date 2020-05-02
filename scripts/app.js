const getInfo = document.getElementById("btn-get");
const catList = document.getElementById('cat-list');

// setTimeout(() => {
//     getCategories();
// }, 2000)

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
  

getInfo.addEventListener("click", getCategories);




