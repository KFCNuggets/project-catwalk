import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewList from './ReviewList';
import RatingBreakdown from './RatingBreakdown';
import LoadingSpinner from '../SharedComponents/ElizabethDonatedSpinner';
import WriteReview from './WriteReview';
import Sorting from './Sorting';

const StyledDiv = styled.div`
  display: grid;
  grid-template-areas: "RatingBreakdown Sorting"
                       "RatingBreakdown ReviewList"
                       "ProductBreakdown ReviewList"
                       "CreateReview ReviewList";
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 3fr);
  grid-template-rows: auto auto minmax(0px, 1fr) auto;
  min-height: 80vh;
  max-width: 80vw;
  gap: 1em;
  padding: 2rem;
  margin: auto;
  place-items: center;
  font-size: 1.5em;
  text-align: center;
`;

class RatingAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      avg: 0,
      totalReviews: 2,
      recommended: '',
      sort: '',
      characteristics: {},
    };
  }

  componentDidMount() {
    const { productId, passBackAvgAndTotalReviews } = this.props;
    axios.get(`/reviews/meta/${productId}`)
      .then((res) => {
        const { data } = res;
        this.setState({
          loaded: true,
          avg: data.avg,
          totalReviews: data.reviews,
          recommended: data.recommended,
          characteristics: data.characteristics,
        }, () => {
          const { avg, totalReviews } = this.state;
          passBackAvgAndTotalReviews(avg, totalReviews);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // const { reviews } = this.props;
    let quickReviewList;
    const {
      loaded, avg, totalReviews, recommended, sort, characteristics,
    } = this.state;
    const { productId } = this.props;
    if (!loaded) {
      quickReviewList = (
        <LoadingSpinner />
      );
    } else {
      quickReviewList = (
        <ReviewList
          totalReviews={totalReviews}
          productId={productId}
          sort={sort}
        />
      );
    }
    return (
      <>
        <StyledDiv id="ratings-and-reviews">
          <RatingBreakdown
            avg={avg}
            totalReviews={totalReviews}
            recommended={recommended}
          />
          <Sorting totalReviews={totalReviews} />
          {quickReviewList}
          <WriteReview characteristics={characteristics} />
        </StyledDiv>
      </>
    );
  }
}

export default RatingAndReviews;
