// const products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [

const products = [
  {
    id: 123,
    title: "Redmi Note 10 Pro",
    img: "../img/iphone-ez.jpg",
    price: 10300000,
    model: "Xiaomi",
    addedDate: new Date("2021-4-7").toISOString(),
    benefits: ["8gb", "128gb", "Waterproof"]
  },
  {
    id: 124,
    title: "Samgung Note 20 Ultra",
    img: "../img/iphone-ez.jpg",
    price: 20300000,
    model: "Samsung",
    addedDate: new Date("2021-10-1").toISOString(),
    benefits: ["32gb", "1tb"]
  },
  {
    id: 125,
    title: "Samgung S21 Ultra",
    img: "../img/iphone-ez.jpg",
    price: 4300000 ,
    model: "Samsung",
    addedDate: new Date("2023-6-3").toISOString(),
    benefits: ["128gb", "2tb", "288Mpx"]
  },
  {
    id: 126,
    title: "Iphone 16 ProMax",
    img: "../img/iphone-ez.jpg",
    price: 8300000,
    model: "Apple",
    addedDate: new Date("2020-1-9").toISOString(),
    benefits: ["128gb", "1tb", "48MP camera"]
  }
]


const manufacturers = [
  {
    id: 1,
    name: "Xiaomi"
  },
  {
    id: 2,
    name: "Apple"
  },
  {
    id: 3,
    name: "Samsung"
  }
];







   //   const filterProduct = products.filter(function (product) {
    //     const productPrice = product.price;
    //     return productPrice >= fromValue

    //   }).filter(function (product) {
    //     const productPrice = product.price
    //       return !toValue ? true : productPrice <= toValue;

    //   }).filter(function (product) {
    //     const searchRegExp = new RegExp(searchValue, "gi");
    //     return product.title.match(searchRegExp);
    //   })
      
      
    //   renderCurrentProducts(filterProduct);