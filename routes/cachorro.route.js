const express = require('express');
const app = express();
const cachorroRoutes = express.Router();

let Cachorro = require('../model/Cachorro');

// api to add cachorro
cachorroRoutes.route('/add').post(function (req, res) {
  let cachorro = new Cachorro(req.body);
  cachorro.save()
  .then(cachorro => {
    res.status(200).json({'status': 'success','mssg': 'cachorro added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get cachorros
cachorroRoutes.route('/').get(function (req, res) {
  Cachorro.find(function (err, cachorros){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','cachorros': cachorros});
    }
  });
});

// api to get cachorro
cachorroRoutes.route('/cachorro/:id').get(function (req, res) {
  let id = req.params.id;
  Cachorro.findById(id, function (err, cachorro){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','cachorro': cachorro});
    }
  });
});

// api to update route
cachorroRoutes.route('/update/:id').put(function (req, res) {
    Cachorro.findById(req.params.id, function(err, cachorro) {
    if (!cachorro){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        cachorro.nome_animal = req.body.nome_animal;
        cachorro.raça = req.body.raça;
        cachorro.peso = req.body.peso;

        cachorro.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
cachorroRoutes.route('/delete/:id').delete(function (req, res) {
  Cachorro.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = cachorroRoutes;