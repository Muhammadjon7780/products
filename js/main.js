const elSection = document.querySelector("#section")
const elCardList = document.querySelector("#card-list")
const elAddManfactureSelect = document.querySelector("#addManufacturer")
const elEditManfactureSelect = document.querySelector("#editManufacturer");



function createElement(tagName, className, textContent) {
  const createdElement = document.createElement(tagName);
  createdElement.className = className;

  if (textContent) {
    createdElement.textContent = textContent;
  }
  return createdElement;
}

const childrenAppend = function (parentElement, children) {
  for (let i = 0; i < children.length; i++) {
    const currentChildren = children[i];
    parentElement.append(currentChildren)
  }
}

const addZero = function (number) {
  const resultNumber = number < 10 ? "0" + number : number;
  return resultNumber;
}

const  showDate = function (dateString) {
  const date = new Date(dateString);
  return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${addZero(date.getFullYear())}`;
}
   
const productTemplate = document.querySelector("#product-template")

const renderProduct = function (addProduct) {
  
const {id, title, img, price, model, addedDate, benefits} = addProduct;

const productItem = productTemplate.content.cloneNode(true);

// const productItem = createElement("li", "col-4");
// const productCard = createElement("div", "card");
// productItem.append(productCard)
productItem.querySelector(".product-card");


// const productImg = createElement("img", "card-img-top");
// productImg.src = img;
// productCard.append(productImg);
productItem.querySelector(".product-img").src = img;
// productImg.src = img

// const productCardBody = createElement("div", "card-body");
// const productTitle = createElement("h3", "card-title", title);
productItem.querySelector(".card-product");
productItem.querySelector(".product-title").textContent = title

// const productSalePrice = createElement("p", "card-text fw-bold");
// const productSalePriceMark = createElement("mark", "", salePrice) ;
// productSalePrice.append(productSalePriceMark);
const salePrice = (price * 25) / 100 
productItem.querySelector(".product-sale_price");
productItem.querySelector(".sale-price").textContent = salePrice;



// const productOldPrice = createElement("p", "card-text");
// const productOldPriceDel = createElement("s", "", price);
// productOldPrice.append(productOldPriceDel);
productItem.querySelector(".old-price").textContent = price;

// const productBadge = createElement("p", "badge bg-success", model);
productItem.querySelector(".badge-product").textContent = model

// const productDate = createElement("p", "card-text", showDate((addedDate)));
productItem.querySelector(".product-date").textContent = showDate(addedDate)

// const productBtnWrap = createElement("div", "position-absolute top-0 end-0 d-flex");
// productEditBtn.setAttribute("data-bs-toggle", "modal");
// productEditBtn.setAttribute("data-bs-target", "#edit-student-modal")
// const productEditBtnIcon = createElement("i", "fa-solid fa-pen");
// productEditBtnIcon.style.pointerEvents = "none"
// productEditBtn.append(productEditBtnIcon);
// productBtnWrap.append(productEditBtn);
const productEditBtn = productItem.querySelector(".edit-btn")
productEditBtn.setAttribute("data-id", id);



// const productDelBtnIcon = createElement("i", "fa-solid fa-trash");
// productDelBtnIcon.style.pointerEvents = "none"
// productDelBtn.append(productDelBtnIcon);
// productBtnWrap.append(productDelBtn);
const productDelBtn = productItem.querySelector(".btn-del");
productDelBtn.setAttribute("data-id", id);



// const productBenefitList = createElement("ul", "d-flex flex-wrap list-unstyled mt-3");
const productBenefitList = productItem.querySelector(".benefits-list")
const innerBenefits = benefits;

for (let i = 0; i < innerBenefits.length; i++) {
  
  const currentBenefit = innerBenefits[i];
  
  const productBenefitItem = createElement("li", "badge bg-primary me-1 mb-1", currentBenefit);
  
  productBenefitList.append(productBenefitItem);
}

// childrenAppend(productCardBody, [productTitle, productSalePrice, productOldPrice, productBadge, productDate, productBenefitList]);

// productCardBody.append(productBtnWrap);

// productCard.append(productCardBody);

// productItem.append(productCard);


return productItem;
} 



const elCount = document.querySelector(".count");

let showingProducts = products.slice();

const renderCurrentProducts = function () {
  elCardList.innerHTML = null;

  elCount.textContent ="Count: " + `${showingProducts.length}`
  
  const productFragment = document.createDocumentFragment();
  
  showingProducts.forEach(function(currentProducts) {
    const productItem = renderProduct(currentProducts);
    productFragment.append(productItem);
  });
  

  elCardList.append(productFragment);
}

renderCurrentProducts()
    
    
    





//__________________ADD MODAL________________________________________________/////////////////////////////////_______________________


const elAddForm = document.querySelector("#add-form");
   const elAddProductModal = document.querySelector(".add-modal");
   const addProductModal = new bootstrap.Modal(elAddProductModal);

   const elAddBenefitList = document.querySelector("#benefits-modal_list");
   const elAddBenefitInput = document.querySelector(".modal-benefits_input");
    
   
   let options = [];
   
   elAddBenefitInput.addEventListener("keyup", function(evt){
     
     if (elAddBenefitInput.value.trim()) {
      
     
     if (evt.key === ",") {
      
       // let splittedValue = elAddBenefitInput.value.trim().split(",")
      let splittedValue = elAddBenefitInput.value.split(",").map(item => item.trim()).filter(item => item.length > 0);
      
      
       if (splittedValue.length > 0){
         
         options.push(splittedValue[0]);
         
         elAddBenefitInput.value = "";
         
         elAddBenefitList.innerHTML = null;
         
         
         for (let i = 0; i < options.length; i++) {
           const optionElement = options[i];
           
           const addBenefitItem = createElement("li", "me-1 mb-1");
           const addBenefitBtn = createElement("button", "btn btn-sm badge rounded-pill btn-danger", optionElement);
           addBenefitBtn.type = "button";
           
           addBenefitItem.append(addBenefitBtn);
           elAddBenefitList.append(addBenefitItem);
          }
        
        }
      }
     }
     
    })
    //-----------------------------------------------------------------------------------------------------------------



    //////////ADD Manfactures///////////////////////
      for (let i = 0; i < manufacturers.length; i++) {
        const currentManfactures = manufacturers[i];
        
        const manfacturesOption = createElement("option", "", currentManfactures.name)
        manfacturesOption.value = currentManfactures.id
        
        elAddManfactureSelect.append(manfacturesOption)

      }
/////-----------------------------------------------------------------------------------------------------------------------
   

    
    elAddForm.addEventListener("submit", function (evt) {
      evt.preventDefault(); 

      const choosedElements = evt.target.elements;
      
      const addTitleInput = choosedElements.title.value;
      
      const addPriceInput = choosedElements.price.value
      const addOptionInput = +choosedElements.addManufacturer.value
      console.log(addOptionInput);
      
      
      
      if (addTitleInput.trim() && addPriceInput.trim()) {


      for (let i = 0; i < manufacturers.length; i++) {

        const currentManfactures = manufacturers[i];
        

        if (addOptionInput == currentManfactures.id) {
          console.log(currentManfactures.name);
          
          const addProduct = {
              id: Math.floor(Math.random() * 1000),
              title: addTitleInput,
              img: "../img/iphone-ez.jpg",
              price: addPriceInput,
              model: currentManfactures.name,
              addedDate: new Date().toISOString(),
              benefits: options
          }
           
          // const addedProduct = renderProduct(addProduct);
          // elCardList.append(addedProduct)
          
          products.push(addProduct);
          // localStorage.setItem("products", JSON.stringify(products));
          showingProducts.push(addProduct);
          renderCurrentProducts()
          
        }
      }
      elAddForm.reset();
      elAddBenefitList.innerHTML = null
      options = []
      addProductModal.hide();
      
      
    }
    })
 





 //_____________________DELETE AND EDIT MODAL__________________________________________________

 const elEditInputTitle = document.querySelector("#edit-title");
 const elEditInputPrice = document.querySelector("#edit-price");
 const elEditInputBenefits = document.querySelector("#edit-benefits");
 
 const elEditModal = document.querySelector(".edit-modal");
 const editModal = new bootstrap.Modal(elEditModal);
 
 const elEditForm = document.querySelector("#edit-form")
 

 

elCardList.addEventListener("click", (evt) => {


   if (evt.target.matches(".btn-del")) { 
    


     const clickedItemId = +evt.target.dataset.id;
     
     
     const clickedItemIndex = products.findIndex(function(product) {
       
       return product.id == clickedItemId
     });

     products.splice(clickedItemIndex, 1);
     localStorage.setItem("products", JSON.stringify(products));


     const clickedShowItemIndex = showingProducts.findIndex(function(product) {
       
       return product.id == clickedItemId
      });

      showingProducts.splice(clickedShowItemIndex, 1);

     
     renderCurrentProducts();
     
   }
   else if (evt.target.matches(".btn-secondary")) {
     
     
     const clickedId = +evt.target.dataset.id;
     
     const clickedItem = products.find(function(product) {
       
       return product.id == clickedId
     })
 
     elEditForm.setAttribute("data-editing-id", clickedItem.id);
 
 
     elEditInputTitle.value = clickedItem.title 
     elEditInputPrice.value = clickedItem.price;
     elEditInputBenefits.value = clickedItem.benefits;
    
     //////////EDIT Manfactures///////////////////////
     elEditManfactureSelect.innerHTML = null;
     
     for (let i = 0; i < manufacturers.length; i++) {
       
       const currentManfactures = manufacturers[i];
       
       const manfacturesOptions = createElement("option", "", currentManfactures.name);
       
       manfacturesOptions.value = currentManfactures.id
       elEditManfactureSelect.append(manfacturesOptions);
 
       let editOptions = elEditManfactureSelect.options
   
       for (let i = 0; i < editOptions.length; i++) {
   
         const editelement = editOptions[i];
   
         if (editelement.textContent == clickedItem.model) {
 
           editelement.setAttribute("selected", "")
           
         }
         }
       }  
       }
       
     })  


     //______________________EDIT FORM________________________________________________________________
    
 elEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  
  const clickedEditId = evt.target.dataset.editingId;
  console.log(clickedEditId);

  const choosedOption = evt.target.elements;
  const editOptionInput = +choosedOption.editManufacturer.value;

  const editTitleValue = elEditInputTitle.value;
  // console.log(editTitleValue);
  
  const editPriceValue = +elEditInputPrice.value;
  const editBenefitsValue = elEditInputBenefits.value.split(",").map(item => item.trim()).filter(item => item.length > 0);
  
  if (elEditInputTitle.value.trim() && elEditInputPrice.value.trim()) {

  manufacturers.forEach(element => {
    
    if (editOptionInput == element.id) {
      
      const editProduct = {
        id: clickedEditId,
        title: editTitleValue,
        img: "../img/iphone-ez.jpg",
        price: editPriceValue,
        model: element.name,
        addedDate: new Date().toISOString(),
        benefits: editBenefitsValue
      }
      
      
      const editItemIndex = products.findIndex(function (editingProduct) {
        return editingProduct.id == clickedEditId
      })

      products.splice(editItemIndex, 1, editProduct);
      // localStorage.setItem("products", JSON.stringify(products));

      const editShowItemIndex = showingProducts.findIndex(function (editingProduct) {
        return editingProduct.id == clickedEditId
      })

      showingProducts.splice(editShowItemIndex, 1, editProduct);
      
    }
  })
  
  elAddBenefitList.innerHTML = null;
  elEditForm.reset();
  editModal.hide();
  elCardList.innerHTML = null;
  renderCurrentProducts();
  } 
  })



    // ____________________________FILTER______________________


    
    //////////FILTER Manfactures///////////////////////
    const elFilterSelectTitle = document.querySelector("#manufacturer");

    for (let i = 0; i < manufacturers.length; i++) {
      const currentManfacturer = manufacturers[i];
      
      const manfacturerOption = createElement("option", "", currentManfacturer.name)
      manfacturerOption.value = currentManfacturer.id
      elFilterSelectTitle.append(manfacturerOption)
    }


    
    const formFilter = document.querySelector("#filter-form");
    const filterSelectSort = document.querySelector("#sortby");
    
    const filterFrom = document.querySelector("#from");
    const filterTo = document.querySelector("#to");
    const filterSearch = document.querySelector("#search");

    formFilter.addEventListener("submit", function (evt) {
      evt.preventDefault();
      
      const choosedElements = evt.target.elements;
      
      const fromValue = +choosedElements.from.value
      const toValue = +choosedElements.to.value
      const searchValue = choosedElements.search.value
      const sortValue = +choosedElements.sortby.value

      showingProducts = products.sort(function (a, b) {
        switch (sortValue) {
          case 1:
            if (a.title > b.title) {
              return 1
            }else if (a.title < b.title) {
              return -1
            }else{
              return 0;
            }
          case 2:
          return b.price - a.price;                                         
          case 3:
            return a.price - b.price;
            case 4:
              return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
              default:
                break;
        }         
      })
      .filter(function (product) {
  
        const productPrice = product.price
        const toMarkCondition = !toValue ? true : productPrice <= toValue;
        const searchRegExp = new RegExp(searchValue, "gi");
        return productPrice >= fromValue && toMarkCondition && product.title.match(searchRegExp);

      })
      
      renderCurrentProducts();
      
    })
      
 


    // const filterProduct = products.filter(function (product) {
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


  