import React, { useState } from 'react';
import styled from 'styled-components';
import Stars from '../SharedComponents/Stars';
import Heart from './IconHeart';
import Comparison from './Comparison';
// import OutfitList from './OutfitList';

const H = {};

H.Wrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
  position: absolute;
  margin-left: 205px;
  margin-top: 25px;
`;

H.BackHeartDiv = styled.button`
  display: flex;
  position: absolute;
  color: ${(props) => (props.selected ? '#FF5A5F' : 'gray')};
  border: none;
  background: none;

  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 240px;
  max-width: 240px;
  min-height: 500px;
  border-radius: 4px;
  border: solid 2px #767676;
  padding: 5px;
  margin: 1rem;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const Name = styled.p`
  font-family: 'Montserrat'
  color: gray;
  font-size: 20px;
  font-weight: 200;
  text-align: left;
  flex-basis:0.1rem;
  margin-top: -35px;
`;

const Description = styled.p`
  color: gray;
  text-align:left;
  margin-top: -35px;
`;

const Category = styled.p`
  color: gray;
  text-align: left;
  margin-top:-20px;
`;

const Image = styled.img`
  border-radius: 5px;
  min-width: 230px;
  max-width: 250px;
  height: 350px;
  object-fit: cover;
`;

const Line = styled.hr`
  color: black;
  width: 100%;
  margin-top: -10px;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 2;
  inset: 0px;
  width: 100%;
  height: 100%;
  overflow: auto;
  transition-duration: 4s;
  justify-content: center;
  background-color: rgba(0,0,0,0.4);
  display: flex;
`;

const StyledTable = styled.table`
  border-radius: 22px;
  position: fixed;
  background: white;
  min-width: 30%;
  min-height: 30%;
  padding: 2%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 2;
  overflow: auto;
  flex-direction: column;
  border-spacing: 15px;
  .th{
     padding: 5px 10px;
     width: 100%;
  }
  .td{
    text-align: center !important;
    min-width: 100%;
  }
`;

// The related product id is passed down from cardList
// Perform a get request in the child function to display the
// Correct photo that corresponds with the data
const Card = ({
  // eslint-disable-next-line react/prop-types
  id, itemName, price, image, ratings, category, product, features, getProdId,
}) => {
  const [currentCompare, setCurrentCompare] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHearts, setSelectedHearts] = useState(false);

  getProdId = getProdId.bind(this);

  const addOutfit = () => {
    setSelectedHearts(!selectedHearts);
  };

  const comparator = () => {
    const results = [];
    const overviewProduct = product.features;
    const relatedProduct = features;
    // const allFeatures = overviewProduct.concat(relatedProduct);
    let big;
    let small;
    if (overviewProduct.length > relatedProduct.length) {
      big = overviewProduct;
      small = relatedProduct;
    } else {
      big = relatedProduct;
      small = overviewProduct;
    }

    var skippedHash = {};

    for (let i = 0; i < big.length; i += 1) {
      for (let j = 0; j < small.length; j += 1) {
        if (big[i].feature === small[j].feature) {
          results.push({
            feature: big[i].feature,
            currentFeature: big[i].value,
            comparedFeature: small[j].value,
          });
          skippedHash[big[i].feature] = 1;
        } else if (big[i].feature !== small[j].feature) {
          if (skippedHash[big[i].feature] !== 1) {
            results.push({
              feature: big[i].feature,
              currentFeature: big[i].value,
              comparedFeature: 'Not Applicable',
            });
            skippedHash[big[i].feature] = 1;
          }
          if (skippedHash[small[j].feature] !== 1) {
            results.push({
              feature: small[j].feature,
              currentFeature: 'Not Applicable',
              comparedFeature: small[j].value,
            });
            skippedHash[small[j].feature] = 1;
          }
        }
      }
    }
    return results.map((element, index) => <Comparison feature={element} key={index} />);
  };

  let modal;
  let hearts;

  if (!selectedHearts) {
    hearts = (
      <H.BackHeartDiv className="outfit" onClick={addOutfit}>
        <Heart />
      </H.BackHeartDiv>
    );
  } else {
    hearts = (
      <H.BackHeartDiv selected className="outfit" onClick={addOutfit}>
        <Heart />
      </H.BackHeartDiv>
    );
  }

  if (showModal) {
    modal = (
      <Modal onClick={() => { setShowModal(!showModal); }}>
        <StyledTable>
          <thead>
            <th>{product.name}</th>
            <th>Description</th>
            <th>{itemName}</th>
          </thead>
          <tbody>
            {comparator()}
          </tbody>
        </StyledTable>
      </Modal>
    );
  }
  const compare = () => {
    setCurrentCompare(features);
  };

  const sendProdId = () => {
    getProdId(id);
  };

  // pass data that was selected to outfitList
  return (
    <>
      {modal}
      <Wrapper data-testid="card">
        <H.Wrapper>
          {hearts}
        </H.Wrapper>
        <Image src={image} alt="empty" loading="lazy" width="200" height="200" onClick={() => { compare(); setShowModal(!showModal); }} />
        <div><Line /></div>
        <Category>{category}</Category>
        <Name onClick={sendProdId}>{itemName}</Name>
        <Description>
          $
          {price}
        </Description>
        <Stars stars={ratings} />
      </Wrapper>
    </>
  );
};

export default Card;
