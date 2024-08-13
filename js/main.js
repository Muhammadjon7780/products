const elCardList = document.querySelector("#card-list")
const elManfactureSelect = document.querySelector("#product-manufacturer")



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


for (let i = 0; i < products.length; i++) {
  const currentProducts = products[i];
  
  const productItem = createElement("li", "col-4");
  const productCard = createElement("div", "card");
  productItem.append(productCard)

  const productImg = createElement("img", "card-img-top");
  productImg.src = currentProducts.img;
  productCard.append(productImg);

  const productCardBody = createElement("div", "card-body");
  const productTitle = createElement("h3", "card-title", currentProducts.title);

  const productNewPrice = createElement("p", "card-text fw-bold");
  const productNewPriceMark = createElement("mark", "", currentProducts.price) ;
  productNewPrice.append(productNewPriceMark);
  

  const productOldPrice = createElement("p", "card-text fw-bold");
  const productOldPriceDel = createElement("s", "", "20000");
  productOldPrice.append(productOldPriceDel);

  const productBadge = createElement("p", "badge bg-success", currentProducts.model);

  const productDate = createElement("p", "card-text", showDate((currentProducts.addedDate)));
  console.log(showDate(currentProducts.addedDate));
  
  
  
  const productBenefitList = createElement("ul", "d-flex flex-wrap list-unstyled mt-3");
  const innerBenefits = currentProducts.benefits;
  for (let i = 0; i < innerBenefits.length; i++) {
    
    const currentBenefit = innerBenefits[i];
    
    const productBenefitItem = createElement("li", "badge bg-primary me-1 mb-1", currentBenefit);

    productBenefitList.append(productBenefitItem);
  }

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
  
  childrenAppend(productCardBody, [productTitle, productNewPrice, productOldPrice, productBadge, productDate, productBenefitList]);
  
  productCard.append(productCardBody);
  
  productItem.append(productCard);
  
  elCardList.append(productItem);
}


//////////Manfactures///////////////////////
  for (let i = 0; i < manufacturers.length; i++) {
    const currentManfactures = manufacturers[i];
    
    const manfacturesOption = createElement("option", "", currentManfactures.name)
    manfacturesOption.value = currentManfactures.id
    elManfactureSelect.append(manfacturesOption)
  }
  
  
  // console.log(products.addedDate);