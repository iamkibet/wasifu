function twoNumbers(num1, num2) {
  console.log(num1 + num2);
}

twoNumbers(5, 10);

const array = [1, 2, 3, 4, 5];

console.log(...array);

function info(a, b, ...c) {
  console.log(a, b, c);
  return "Dennis";
}

console.log(info(1, 2, 3, 4, 5, 6, 7));

//Map, filter, reduce
const personsArray = [
  { name: "Dennis", age: 25, country: "Kenya" },
  { name: "John", age: 30, country: "Uganda" },
  { name: "Jane", age: 35, country: "Tanzania" },
  { name: "Mary", age: 40, country: "Rwanda" },
  { name: "James", age: 45, country: "Kenya" },
];

const getAllNames = personsArray.map((singlePerson, index) => {
  console.log(singlePerson, index);
  return `Name: ${singlePerson.name} and the age is ${singlePerson.age}`;
});

console.log(getAllNames);

let getPersonFromKenya = personsArray.filter((singlePerson, index) => {
  return singlePerson.country === "Kenya";
});

console.log(getPersonFromKenya);

let checkArray = personsArray.some((singlePerson, index) => {
  return singlePerson.age > 30;
});

console.log(checkArray);

let checkEveryArray = personsArray.every((singlePerson, index) => {
  return singlePerson.age > 40;
});

console.log(checkEveryArray);

const fruitsArray = ["apple", "banana", "mango", "orange"];
console.log(fruitsArray.includes("apple"));

let getIndexOfPerson = personsArray.findIndex((singlePerson, index) => {
  return singlePerson.country === "Kenya";
});

console.log(getIndexOfPerson);

let getListOfProducts = document.querySelector(".list-of-products");

function renderProducts(getProducts) {
  getListOfProducts.innerHTML = getProducts.map(singleProduct => `<p>${singleProduct.title}</p>`
  ).join('');
}

async function fetchListOfProducts() {
  try {
    const apiResponse = await fetch("https://dummyjson.com/products", {
      method: "GET",
    });

    const result = await apiResponse.json();
    console.log(result);

    if (result?.products?.length > 0) renderProducts(result.products);
  } catch (error) {
    console.log(error);
  }
}

fetchListOfProducts();
