const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserCrtl = require('../controllers/user');

//UserCrtl.authMiddleware se encarga de hacer la validacion del token, se llama en el 2do parametro. si esta ok sigue con la callback function, sino devuelve error
router.get('/secret', UserCrtl.authMiddleware, function (err, res) { //solo se usa para testing, no se llama nunca 
  res.json({"secret":true});
});

router.get('', function (req, res) {
  Rental.find({}).select('-bookings').exec(function (err, foundRentals) {
    res.json(foundRentals);
  }); //traigo todos los rentals para listar, pero al agregarle el select, le digo que no me traiga los bookigs, por un tema de performance
});

router.get('/:Id', function (req, res) {
  const rentalId = req.params.Id;

  Rental.findById(rentalId).populate('user', 'username -_id').populate('bookings', 'startAt endAt -_id').exec(function (err, foundRental) { //dentro del populate especifico que propiedades quiero, asi no traigo todo
    if (err) {
      return res.status(422).send({ errors: [{ title: 'Rental Error!', detail: "Could not find rental" }] });
    }
    return res.json(foundRental);
  });
});

module.exports = router;
