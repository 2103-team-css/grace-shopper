import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';
import { createCartItem } from '../store/cart';

const AllProducts = (props) => {
  useEffect(() => {
    props.getProducts();
  }, []);
  const { products, userId } = props;

  const percussionArr = products.filter(
    (product) => product.category === 'percussion'
  );

  const stringsArr = products.filter(
    (product) => product.category === 'string'
  );
  const keysArr = products.filter((product) => product.category === 'keys');
  const accessoriesArr = products.filter(
    (product) => product.category === 'accessories'
  );

  const [perc, setPerc] = useState(true);
  const [strs, setStr] = useState(true);
  const [keys, setKeys] = useState(true);
  const [access, setAccess] = useState(true);

  const filteredArr = (products, category) => {
    return products.filter((product) => product.category !== category);
  };

  const updatePercussion = (evt) => {
    setPerc(evt.target.checked);
  };

  const updateString = (evt) => {
    setStr(evt.target.checked);
  };

  const updateKey = (evt) => {
    setKeys(evt.target.checked);
  };

  const updateAccessory = (evt) => {
    evt.preventDefault;
    setAccess(evt.target.checked);
  };

  let filteredProd = [...products]; //all of the prod
  if (perc === false) filteredProd = filteredArr(filteredProd, 'percussion');
  if (strs === false) filteredProd = filteredArr(filteredProd, 'string');
  if (keys === false) filteredProd = filteredArr(filteredProd, 'keys');
  if (access === false) filteredProd = filteredArr(filteredProd, 'accessories');

  console.log('percussion>>>>>', perc);
  console.log('keys>>>>', keys);
  console.log('accessory', access);
  console.log('strings>>>>', strs);
  return (
    <div className='all-products-container'>
      <div className='filter-div'>
        <h3>Filter By Category</h3>
        <label>Percussion:</label>

        <input
          type='checkbox'
          name='perc'
          checked={perc}
          value={perc}
          onChange={updatePercussion}
        />
        <label>Strings:</label>
        <input
          type='checkbox'
          name='strs'
          checked={strs}
          value={strs}
          onChange={updateString}
        />
        <label>Keys:</label>
        <input
          type='checkbox'
          name='keys'
          checked={keys}
          value={keys}
          onChange={updateKey}
        />
        <label>Accesories:</label>
        <input
          type='checkbox'
          name='access'
          checked={access}
          value={access}
          onChange={updateAccessory}
        />
      </div>
      {filteredProd.map((product) => {
        return (
          <div key={product.id} className='product-container'>
            <img
              src={product.imageUrl}
              alt={product.name}
              heigt='150'
              width='200'
              className='product-image'
            />
            <h3>Name:{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button
              onClick={() => {
                props.addToCart(
                  userId,
                  product.name,
                  product.price,
                  1,
                  product.id
                );
              }}
            >
              Add to Cart
            </button>
            <p>{product.quantity} Left in Stock</p>
            <p>{product.category}</p>
          </div>
        );
      })}
    </div>
  );
};

const mapState = (state) => {
  return {
    products: state.products,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addToCart: (userId, name, price, quantity, productId) =>
      dispatch(createCartItem(userId, name, price, quantity, productId)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
