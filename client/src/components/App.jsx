import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Banner from './Banner/Banner';
import ProductOverview from './ProductOverview/ProductOverview';
import RatingAndReviews from './RatingsAndReviews/RatingAndReviews';
import RelatedItems from './RelatedItems/RelatedItems';
import LoadingSpinner from './SharedComponents/ElizabethDonatedSpinner';

const VerticalContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 25167,
      product: null,
      styles: null,
      cart: null,
      related: null,
      rating: 0,
      totalReviews: 0,
      // reviews: null,
    };
    // initializer();
    this.setRatingAndTotalRev = this.setRatingAndTotalRev.bind(this);
    this.setProductId = this.setProductId.bind(this);
  }

  componentDidMount() {
    const { productId } = this.state;
    const getProduct = () => (axios.get(`/products/${productId}`));
    const getCart = () => (axios.get('/cart'));
    const getStyles = () => (axios.get(`products/${productId}/styles`));
    const getRelated = () => (axios.get(`/products/${productId}/related`));

    Promise.all([getProduct(), getCart(), getStyles(), getRelated()])
      .then((results) => {
        this.setState({
          product: results[0].data,
          cart: results[1].data,
          styles: results[2].data,
          related: results[3].data,
        });
      })
      .catch((err) => {
        console.log('Error: error getting API data', err);
      });
  }

  setRatingAndTotalRev(rating, totalReviews) {
    this.setState({ rating, totalReviews });
  }

  setProductId(productId) {
    this.setState({ productId });
  }

  render() {
    const {
      productId, product, styles, cart, related, rating, totalReviews,
    } = this.state;
    if (product && styles && cart && related) {
      return (
        <VerticalContainer>
          <Banner />
          <ProductOverview
            product={product}
            styles={styles}
            cart={cart}
            rating={rating}
            totalReviews={totalReviews}
          />
          <RelatedItems
            productId={productId}
            related={related}
            styles={styles}
            product={product}
            passBackProductId={this.setProductId}
          />
          <RatingAndReviews
            productId={productId}
            passBackAvgAndTotalReviews={this.setRatingAndTotalRev}
          />
        </VerticalContainer>
      );
    }
    return <LoadingSpinner />;
  }
}

export default App;

// attempted to initialize the state via initializing inside the constructor,
// which runs before the component... but failed.
// const initializer = () => {
//   axios.get('/products/25168')
//   .then((res) => {
//     const product = res.data;
//     this.setState({ product: product });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // fetch reviews from API - Steven
// axios.get('/reviews/25168')
//   .then((res) => {
//     this.setState({ reviews: res.data });
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// }
