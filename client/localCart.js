// newItem = {productId, quantity, price, total}
const addItemToLocalCart = (newItem) => {
  if (localStorage.getItem('localCart')) {
    const localCart = JSON.parse(localStorage.getItem('localCart'));
    localCart.push(newItem);
    localStorage.setItem('localCart', JSON.stringify(localCart));
  } else {
    const localCart = [newItem];
    localStorage.setItem('localCart', JSON.stringify(localCart));
  }
};

const removeItemFromLocalCart = (productId) => {
  const localCart = JSON.parse(localStorage.getItem('localCart'));
  const filteredCart = localCart.filter(product => )
};

const changeQuantityInLocalCart = (productId, newQuantity) => {};
