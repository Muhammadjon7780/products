const elCardList = document.querySelector("#card-list")
const elManfactureSelect = document.querySelector("#addManufacturer")



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
    
const {title, img, price, model, addedDate, benefits} = addProduct

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
const productEditBtnIcon = createElement("i", "fa-solid fa-pen");
productEditBtn.append(productEditBtnIcon);
productBtnWrap.append(productEditBtn);

const productDelBtn = createElement("button", "btn rounded-0 btn-danger");
const productDelBtnIcon = createElement("i", "fa-solid fa-trash");
productDelBtn.append(productDelBtnIcon);
productBtnWrap.append(productDelBtn);

productCardBody.append(productBtnWrap);


productCard.append(productCardBody);

productItem.append(productCard);

elCardList.append(productItem);




const productBenefitList = createElement("ul", "d-flex flex-wrap list-unstyled mt-3");
const innerBenefits = benefits;

for (let i = 0; i < innerBenefits.length; i++) {
  
  const currentBenefit = innerBenefits[i];
  
  const productBenefitItem = createElement("li", "badge bg-primary me-1 mb-1", currentBenefit);

  productBenefitList.append(productBenefitItem);
}

childrenAppend(productCardBody, [productTitle, productSalePrice, productOldPrice, productBadge, productDate, productBenefitList]);

return productItem;
} 


for (let i = 0; i < products.length; i++) {
  
  const currentProducts = products[i];
  renderProduct(currentProducts);

}


//////////Manfactures///////////////////////
  for (let i = 0; i < manufacturers.length; i++) {
    const currentManfactures = manufacturers[i];
    
    const manfacturesOption = createElement("option", "", currentManfactures.name)
    manfacturesOption.value = currentManfactures.id
    elManfactureSelect.append(manfacturesOption)
  }

  //___________________________MODAL_______________

 


   const elAddForm = document.querySelector("#add-form");

   const elAddProductModal = document.querySelector(".add-modal");
   const addProductModal = new bootstrap.Modal(elAddProductModal);

   const elAddBenefitList = document.querySelector("#benefits-modal_list");
   const elAddBenefitInput = document.querySelector(".modal-benefits_input");
    
   
   let options = []
   
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
      const addOptionInput = choosedElements.addManufacturer.value

      if (addTitleInput.trim() && addPriceInput.trim()) {



      for (let i = 0; i < manufacturers.length; i++) {
        const currentManfactures = manufacturers[i];
        
        
        
        if (addOptionInput == currentManfactures.id) {
          
          const addProduct = {
              id: Math.floor(Math.random() * 1000),
              title: addTitleInput,
              img: "https://picsum.photos/300/200",
              price: addPriceInput,
              model: currentManfactures.name,
              addedDate: new Date().toISOString(),
              benefits: options
          }
           console.log(options);
          
          
          const addedProduct = renderProduct(addProduct);
          elCardList.append(addedProduct)
          
          products.push(addProduct);
          
        }
      }
      elAddForm.reset();
      elAddBenefitList.innerHTML = null
      options = []
      addProductModal.hide();
      
      
    }
    })
 

    