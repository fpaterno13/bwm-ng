const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserCrtl = require('../controllers/user');

//UserCrtl.authMiddleware se encarga de hacer la validacion del token, se llama en el 2do parametro. si esta ok sigue con la callback function, sino devuelve error
router.get('/secret', UserCrtl.authMiddleware, function (err, res) { //solo se usa para testing, no se llama nunca 
  res.json({"secret":true});
});

router.get('', function (req, res) {
  Rental.find({}, function (err, foundRentals) {
    res.json(foundRentals);
  });
});

router.get('/:Id', function (req, res) {
  const rentalId = req.params.Id;
  Rental.findById(rentalId, function(err, foundRental){
    if (err) {
      res.status(422).send({ errors: [{ title: 'Rental Error!', detail: "Could not find rental" }] });
    }

    res.json(foundRental);
  });
});

module.exports = router;
