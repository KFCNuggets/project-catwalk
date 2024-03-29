import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faInstagram, faFacebook, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';

// //////////////// ASSIGNED GRID AREA //////////////// //
const AddToCartArea = styled.div`
  grid-area: AddToCart;
`;

// //////////////// STYLED COMPONENTS //////////////// //
const DropdownWrapper = styled.div`
  display: flex;

  .empty-div {
    margin: 10px;
  }
`;

const StyledDropdown = styled.select`
  width: 100%;
  height: 70%;
  padding: 0.5rem;
  margin-bottom: 15px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  font-size: 15px;
  align-items: center;
  color: white;
  background-color: #FF5A5F;
  border: 2px solid #FF5A5F;
  border-radius: 1.5em;
  cursor: pointer;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const SocialMediaShare = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  .fa-icon {
    cursor: pointer;
  }
`;

const Dropdown = (props) => (
  <StyledDropdown className={props.className} onChange={props.onChange} disabled={props.disabled}>
    {props.children}
  </StyledDropdown>
);

// //////////////// HELPER FUNCTIONS //////////////// //
// input: skus <- an object with sku id as it's key and a nested object containing size and quantity
// as it's value
// output: sizes <- an array of all available sizes (quantity has to be greater than 0)
const getAvailableSizes = (skus) => {
  const sizes = Object.values(skus).filter((sku) => sku.quantity > 0).map((sku) => sku.size);
  return sizes;
};

// input: skus, size
// output: max quantity is either the remaining quantity of the selected size or 15
const getMaxQuantity = (skus, size) => {
  const maxQuantity = Object.values(skus).filter((sku) => sku.size === size)[0].quantity;
  return (maxQuantity > 15) ? 15 : maxQuantity;
};

// input: N <- maximum number
// output: an array containing 1, 2, ..., N
const getArrayOneToN = (n) => [...Array(n).keys()].map((num) => num + 1);

// input: style, size
// output: sku id
const getSkuId = (skus, size) => Object.keys(skus).find((key) => skus[key].size === size);

// //////////////// MAIN COMPONENT //////////////// //
const AddToCart = (props) => {
  const { style } = props;
  const { skus } = style;
  const [size, setSize] = useState('SELECT SIZE');
  const [quantity, setQuantity] = useState(1);
  const sizes = getAvailableSizes(skus);
  const handleSizeSelect = (event) => {
    setSize(event.target.value);
  };
  const handleQuantitySelect = (event) => {
    setQuantity(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/cart', {
      skuId: getSkuId(skus, size),
      quantity,
    })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AddToCartArea>
      <DropdownWrapper>
        <Dropdown
          className="size-selector"
          onChange={handleSizeSelect}
        >
          <option>SELECT SIZE</option>
          {sizes.map((size, index) => (<option key={index}>{size}</option>))}
        </Dropdown>
        <div className="empty-div" />
        {(size === 'SELECT SIZE') ? (
          <Dropdown
            className="qty-selector"
            onChange={handleQuantitySelect}
            disabled
          >
            <option>1</option>
          </Dropdown>
        ) : (
          <Dropdown
            className="qty-selector"
            onChange={handleQuantitySelect}
            action="/"
          >
            {getArrayOneToN(getMaxQuantity(skus, size)).map((quantity, index) => (<option key={index}>{quantity}</option>))}
          </Dropdown>
        )}
      </DropdownWrapper>
      <Button onClick={handleSubmit}>ADD TO BAG</Button>
      <SocialMediaShare>
        <FontAwesomeIcon className="fa-icon" icon={faInstagram} size="2x" color="#FF5A5F" onClick={() => window.open('http://www.instagram.com/')} />
        <FontAwesomeIcon className="fa-icon" icon={faFacebook} size="2x" color="#FF5A5F" onClick={() => window.open('http://www.facebook.com/')} />
        <FontAwesomeIcon className="fa-icon" icon={faPinterest} size="2x" color="#FF5A5F" onClick={() => window.open('http://www.pinterest.com/')} />
        <FontAwesomeIcon className="fa-icon" icon={faTwitter} size="2x" color="#FF5A5F" onClick={() => window.open('http://www.twitter.com/')} />
      </SocialMediaShare>
    </AddToCartArea>
  );
};

export default AddToCart;
