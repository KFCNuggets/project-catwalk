const express = require('express');
const productAPI = require('../../helpers/productsAPI');

const router = express.Router();

// router.get('/:productId', (req, res) => {
//   const { productId } = req.params;
//   productAPI.getProductInfo(productId, (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  productAPI.getProductInfo(productId, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// get all styles - Kate
router.get('/:productId/styles', (req, res) => {
  const { productId } = req.params;
  productAPI.getAllStyles(productId, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// get related items - Chhuong
// will send back an array of related items' unique ID
// IDEA CHANGE - Get productInformation of each related item
router.get('/:productId/related', (req, res) => {
  const { productId } = req.params;
  productAPI.getRelatedItems(productId, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const relatedItems = [];
      data.map((id) => productAPI.getProductInfo(id, (err2, data2) => {
        if (err2) {
          res.send(err2);
        } else {
          relatedItems.push(data2);
          // if data length is the same as the relatedItems length
          if (data.length === relatedItems.length) {
            // send that data over
            res.send(relatedItems);
          }
        }
      }));
    }
  });
});

module.exports = router;
