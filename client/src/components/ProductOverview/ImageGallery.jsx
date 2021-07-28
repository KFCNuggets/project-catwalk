import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// /////////////// ASSIGNED GRID AREA //////////////// //
const ImageGalleryArea = styled.div`
  position: relative;
  grid-area: ImageGallery;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  height: 100%;
`;

// //////////////// STYLED COMPONENTS //////////////// //
const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  margin-top: 30px;
  margin-right: 30px;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 65px;
  border: 2px solid;
  border-color: ${(props) => (props.selected ? '#FF5A5F' : '#ddd')};
  border-radius: 7%;
  padding: 3px;
  margin: 2px;
  cursor: pointer;
  &:hover {
    border-color: #FF5A5F;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  align-self: stretch;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    opacity: 0.8;
    cursor: zoom-in;
  }
`;

const Modal = styled.div`
  display: flex;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
`;

const ModalImage = styled.img`
  position: relative;
  background-color: white;
  margin: auto;
  width: 85%;
`;

// //////////////// HELPER FUNCTIONS //////////////// //
// input: photos <- an array with objects containing thumbnail url
// output: an array of all thumbnail urls
const getThumbnailUrls = (photos) => photos.map((photo) => photo.thumbnail_url);

// //////////////// MAIN COMPONENT //////////////// //
const ImageGallery = (props) => {
  const { style } = props;
  const { photos } = style;
  const thumbnailUrls = getThumbnailUrls(photos);
  const [expandedView, setExpandedView] = useState(false);
  const [mainImage, setMainImage] = useState(photos[0].url);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const handleThumbnailClick = (index) => {
    setThumbnailIndex(index);
    setMainImage(photos[index].url);
  };
  const handleImageClick = () => {
    setExpandedView(!expandedView);
  };

  useEffect(() => {
    setMainImage(photos[0].url);
    setThumbnailIndex(0);
  }, [style]);

  return (
    <ImageGalleryArea>
      <ThumbnailWrapper>
        {thumbnailUrls.map((thumbnailUrl, index) => (index === thumbnailIndex ? (
          <Thumbnail key={index} selected src={thumbnailUrl} alt="thumbnail" loading="lazy" width="200" height="200" onClick={() => handleThumbnailClick(index)} />
        ) : (
          <Thumbnail key={index} src={thumbnailUrl} alt="thumbnail" loading="lazy" width="200" height="200" onClick={() => handleThumbnailClick(index)} />
        )))}
      </ThumbnailWrapper>
      <MainImage src={mainImage} alt="main-image" loading="lazy" width="200" height="200" onClick={handleImageClick} />
      {expandedView ? (
        <Modal onClick={handleImageClick}>
          <ModalImage src={mainImage} loading="lazy" alt="modal" />
        </Modal>
      ) : null}
  );
};

export default ImageGallery;
