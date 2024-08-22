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
   


const renderProduct = function (addProduct) {
  
const {id, title, img, price, model, addedDate, benefits} = addProduct;

const productItem = createElement("li", "col-4");
const productCard = createElement("div", "card");
productItem.append(productCard)

const productImg = createElement("img", "card-img-top");
productImg.src = img;
productCard.append(productImg);

const productCardBody = createElement("div", "card-body");
const productTitle = createElement("h3", "card-title", title);

const salePrice = (price * 25) / 100 
const productSalePrice = createElement("p", "card-text fw-bold");
const productSalePriceMark = createElement("mark", "", salePrice) ;
productSalePrice.append(productSalePriceMark);


const productOldPrice = createElement("p", "card-text");
const productOldPriceDel = createElement("s", "", price);
productOldPrice.append(productOldPriceDel);

const productBadge = createElement("p", "badge bg-success", model);

const productDate = createElement("p", "card-text", showDate((addedDate)));

const productBtnWrap = createElement("div", "position-absolute top-0 end-0 d-flex");

const productEditBtn = createElement("button", "btn rounded-0 btn-secondary");
productEditBtn.setAttribute("data-bs-toggle", "modal");
productEditBtn.setAttribute("data-bs-target", "#edit-student-modal")
const productEditBtnIcon = createElement("i", "fa-solid fa-pen");
productEditBtnIcon.style.pointerEvents = "none"
productEditBtn.setAttribute("data-id", id);

productEditBtn.append(productEditBtnIcon);
productBtnWrap.append(productEditBtn);

const productDelBtn = createElement("button", "btn rounded-0 btn-danger btn-del");
const productDelBtnIcon = createElement("i", "fa-solid fa-trash");
productDelBtnIcon.style.pointerEvents = "none"

productDelBtn.setAttribute("data-id", id);

productDelBtn.append(productDelBtnIcon);
productBtnWrap.append(productDelBtn);

const productBenefitList = createElement("ul", "d-flex flex-wrap list-unstyled mt-3");
const innerBenefits = benefits;

for (let i = 0; i < innerBenefits.length; i++) {
  
  const currentBenefit = innerBenefits[i];
  
  const productBenefitItem = createElement("li", "badge bg-primary me-1 mb-1", currentBenefit);
  
  productBenefitList.append(productBenefitItem);
}

childrenAppend(productCardBody, [productTitle, productSalePrice, productOldPrice, productBadge, productDate, productBenefitList]);

productCardBody.append(productBtnWrap);

productCard.append(productCardBody);

productItem.append(productCard);

elCardList.append(productItem);

return productItem;
} 

let showingProducts = products;

const renderCurrentProducts = function () {
  elCardList.innerHTML = null;
  showingProducts.forEach(currentProducts => {
    renderProduct(currentProducts);
  });
}



    renderCurrentProducts()
    
    
    




//////////ADD Manfactures///////////////////////
  for (let i = 0; i < manufacturers.length; i++) {
    const currentManfactures = manufacturers[i];
    
    const manfacturesOption = createElement("option", "", currentManfactures.name)
    manfacturesOption.value = currentManfactures.id
    elAddManfactureSelect.append(manfacturesOption)
  }






  //__________________ADD MODAL___________________________________________________________________________________________
   const elAddForm = document.querySelector("#add-form");
   const elAddProductModal = document.querySelector(".add-modal");
   const addProductModal = new bootstrap.Modal(elAddProductModal);

   const elAddBenefitList = document.querySelector("#benefits-modal_list");
   const elAddBenefitInput = document.querySelector(".modal-benefits_input");
    
   
   let options = [];
   
   elAddBenefitInput.addEventListener("keyup", function(event){
     
     if (elAddBenefitInput.value.trim()) {
      
     
     if (event.key === ",") {
       
       //  let splittedValue = elAddBenefitInput.value.trim().split(",")
       let splittedValue = elAddBenefitInput.value.split(",").map(item => item.trim()).filter(item => item.length > 0);
       
       if (splittedValue.length > 0){
         
         options.push(splittedValue[0]);
         
         elAddBenefitInput.value = ""
         
         elAddBenefitList.innerHTML = null
         
         
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
    

    elAddForm.addEventListener("submit", function (evt) {
      evt.preventDefault(); 

      const choosedElements = evt.target.elements;
      
      const addTitleInput = choosedElements.title.value
      const addPriceInput = choosedElements.price.value
      const addOptionInput = +choosedElements.addManufacturer.value
      
      
      
      if (addTitleInput.trim() && addPriceInput.trim()) {


      for (let i = 0; i < manufacturers.length; i++) {
        const currentManfactures = manufacturers[i];
        
        
        
        if (addOptionInput == currentManfactures.id) {
          
          const addProduct = {
              id: Math.floor(Math.random() * 1000),
              title: addTitleInput,
              img: "../img/iphone-ez.jpg",
              price: addPriceInput,
              model: currentManfactures.name,
              addedDate: new Date().toISOString(),
              benefits: options
          }
           
          const addedProduct = renderProduct(addProduct);
          elCardList.append(addedProduct)
          
          products.push(addProduct);
          showingProducts.push(addProduct);
          
        }
      }
      elAddForm.reset();
      elAddBenefitList.innerHTML = null
      options = []
      addProductModal.hide();
      
      
    }
    })
 





 //_____________________EDIT MODAL__________________________________________________

 const elEditInputTitle = document.querySelector("#edit-title");
 const elEditInputPrice = document.querySelector("#edit-price");
 const elEditInputBenefits = document.querySelector("#edit-benefits");
 
 const elEditModal = document.querySelector(".edit-modal");
 const editModal = new bootstrap.Modal(elEditModal);
 
 const elEditForm = document.querySelector("#edit-form")
 
 
 elCardList.addEventListener("click", function (evt) {
 
   if (evt.target.matches(".btn-danger")) { 
    
     const clickedItemId = +evt.target.dataset.id;
     
     
     const clickedItemIndex = products.findIndex(function(product) {
       
       return product.id == clickedItemId
     });

 
     showingProducts.splice(clickedItemIndex, 1);
     products.splice(clickedItemIndex, 1);

     
     elCardList.innerHTML = null;
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
  
  const clickedEditId = evt.target.dataset.editingId

  const choosedOption = evt.target.elements;
  const editOptionInput = +choosedOption.editManufacturer.value

  const editTitleValue = elEditInputTitle.value;
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
      console.log(clickedEditId);
      
      
      const editItemIndex = products.findIndex(function (editingProduct) {
        return editingProduct.id == clickedEditId
      })
  
      products.splice(editItemIndex, 1, editProduct);
      showingProducts.splice(editItemIndex, 1, editProduct);
      
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


    const formFilter = document.querySelector("#filter-form");
    const filterFrom = document.querySelector("#from");
    const filterTo = document.querySelector("#to");
    const filterSearch = document.querySelector("#search");

    formFilter.addEventListener("submit", function (evt) {
      evt.preventDefault();

      const choosedElements = evt.target.elements;

      const fromValue = +choosedElements.from.value
      const toValue = choosedElements.to.value
      const searchValue = choosedElements.search.value
    
      showingProducts = products.filter(function (product) {
  
        const productPrice = product.price
        const toMarkCondition = !toValue ? true : productPrice <= toValue;
        const searchRegExp = new RegExp(searchValue, "gi");
        return productPrice >= fromValue && toMarkCondition && product.title.match(searchRegExp);
        
      })
      elCardList.innerHTML = null;
      
      renderCurrentProducts();
      
    })
      
 





  