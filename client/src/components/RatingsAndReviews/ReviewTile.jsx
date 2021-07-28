import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Stars from '../SharedComponents/Stars';

const TileArea = styled.div`
  display: grid;
  grid-template-areas: "StarRating ReviewerName Date"
                       "Summary Summary Summary"
                       "ReviewBody ReviewBody ReviewBody"
                       "Response Response Response"
                       "Helpful Helpful Helpful";
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto auto;
  grid-gap: 5px;
  margin-bottom: 30px;
`;

const RatingArea = styled.div`
  grid-area: StarRating;
  place-self: center;
`;

const ReviewerName = styled.div`
  font-style: oblique;
  grid-area: ReviewerName;
  place-self: center;
  font-size: 15px;
`;

const Date = styled.div`
  grid-area: Date;
  place-self: center end;
  padding-right: 10px;
  font-size: 15px;
`;

const ReviewSummary = styled.div`
  margin-top: 20px;
  grid-area: Summary;
  place-self: center start;
  font-size: 20px;
 `;

const ReviewBody = styled.div`
  grid-area: ReviewBody;
  place-self: start;
  display: block;
  max-width: 100%;
  font-size: 15px;
  text-align: left;

  .green {
    color: green;
  }
  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: 0;
    font-size: 12px;
    color: black;
    text-decoration: underline;
    cursor: pointer;
  };
`;

const Photos = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
.photo {
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background: white;
  display: block;
  object-fit: contain;
  width: 5%;
  max-height: 69px;
  min-height: 0;
  transition-duration: 0.3s;
  &:hover {
    border: 1px solid black;
    cursor: pointer;
  };
}
`;

const ReviewResponse = styled.div`
  grid-area: Response;
  place-self: center start;
`;

const Helpful = styled.span`
  grid-area: Helpful;
  place-self: start;
  text-align: right;
  font-size: 12px;
  padding-bottom: 30px;
  border-bottom: solid 1px black;
  min-width: 100%;
  .leftSide {
    text-align: left;
  }
  .green {
    color: green;
  }
`;

const Modal = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);

  .modal-content {
    position: relative;
    border-radius: 10%;
    background-color: white;
    margin: auto;
    width: 80%;
  }
`;

const Container = styled.div`
  word-wrap: break-word;
`;

// let clickedImage;

const Tile = (props) => {
  // const [productInfo, setProductInfo] = useState(props.); NOOOOooooooo
  const { data } = props;
  const { body, date, helpfulness, photos, rating,
    recommend, response, reviewer_name, summary } = data;
  const formattedDate = new window.Date(date);
  const prettyDate = formattedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const [expand, setExpand] = useState(false);
  const [helpful, setHelpful] = useState(0);
  const [notHelpful, setNotHelpful] = useState(0);
  const [clickedImage, setClickedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rated, setRated] = useState(false);

  // useEffect(() => {
  //   setShowModal(true);
  // }, [clickedImage]);

  let showButton;
  let sellerResponse;
  let modalImage;
  let recommended;

  const showImages = (photo) => <img className="photo thumbnail" key={photo.id} loading="lazy" alt={photo.id} src={photo.url} />;

  if (body.length > 250) {
    if (expand) {
      showButton = <button aria-label="shrink review body" type="button" onClick={() => { setExpand(!expand); }}>Show Less</button>;
    } else {
      showButton = <button aria-label="expand review body" type="button" onClick={() => { setExpand(!expand); }}>Show More</button>;
    }
  } else {
    showButton;
  }

  if (response) {
    if (response.length > 0) {
      sellerResponse = (
        <div className="response">
          Response from Seller:
          {response}
        </div>
      );
    }
  }

  if (showModal) {
    modalImage = (
      <Modal onClick={() => { setShowModal(!showModal); }}>
        <img alt="modal" loading="lazy" className="modal-content" src={clickedImage} />
      </Modal>
    );
  }

  if (recommend) {
    recommended = (
      <span className="leftSide">
        <span className="green">
          &#10003;
        </span>
        {' I recommend this product'}
      </span>
    );
  }

  // console.log(data);

  return (
    <TileArea data-testid="Tile">
      <RatingArea>
        <Stars stars={rating} />
      </RatingArea>
      <ReviewerName>{reviewer_name}</ReviewerName>
      <Date>{prettyDate}</Date>
      <ReviewSummary>
        <b>
          {summary}
        </b>
      </ReviewSummary>
      <ReviewBody>
        <Container>
          {expand ? body : (`${body.slice(0, 250)}`)}
        </Container>
        {showButton}
        <br />
        <Photos onClick={(e) => { setClickedImage(e.target.src); setShowModal(!showModal); }}>
          {photos.map(showImages)}
          {modalImage}
        </Photos>
      </ReviewBody>
      <ReviewResponse>
        {sellerResponse}
      </ReviewResponse>
      <Helpful>
        {recommended}
        <br />
        Was this review helpful?
        <span onClick={() => { if (!rated) {
          setHelpful(helpful + 1);
          setRated(true); }
        }}> Yes: {helpful}
        </span>
        <span onClick={() => {
          if (!rated) { setNotHelpful(notHelpful + 1); setRated(true); }}}> No: {notHelpful}
        </span>
      </Helpful>
    </TileArea>
  );
};

export default Tile;

// const showMore = (
//   <button onClick={setExpand(!expand)} value="Show more"></button>
// )

// const showLess = (
//   <button onClick={setExpand(!expand)} value="Show less"></button>
// )
