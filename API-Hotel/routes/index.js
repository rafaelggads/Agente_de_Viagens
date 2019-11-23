var express = require('express');
var router = express.Router();

var hoteis = [
    {
      id:1, 
      nome: 'Angica Golden Hotel',
      cidade:'Fortaleza',
      precoDiaria: 128.00
    },
    {
      id:2, 
      nome: 'Hotel Aquarius',
      cidade:'Fortaleza', 
      precoDiaria: 171.00
    },
    {
      id:3, 
      nome: 'Pousada Mar e Mar',
      cidade:'Fortaleza', 
      precoDiaria: 89.90
    },
    {
      id:4, 
      nome: 'Best Western Hotel Caicara',
      cidade:'João Pessoa', 
      precoDiaria: 210.00
    },
    {
      id:5, 
      nome: 'Pousada Kaliman Ubatuba',
      cidade:'Ubatuba', 
      precoDiaria: 189.90
    },
    {
      id:6, 
      nome: 'Samuka Hotel',
      cidade:'Florianopolis', 
      precoDiaria: 134.00
    },
    {
      id:7, 
      nome: 'ibis Florianopolis',
      cidade:'Florianopolis', 
      precoDiaria: 154.60
    },
    {
      id:8, 
      nome: 'Hotel Lunes',
      cidade:'Florianopolis', 
      precoDiaria: 203.00
    },
    {
      id:9, 
      nome: 'Hotel Villa Rica',
      cidade:'João Pessoa', 
      precoDiaria: 102.00
    },
    {
      id:10, 
      nome: 'Hotel Filipeia Bessa',
      cidade:'João Pessoa', 
      precoDiaria: 162.00
    },
    {
      id:2, 
      nome: 'Best Western Hotel Caicara',
      cidade:'João Pessoa', 
      precoDiaria: 210.00
    }
  ];

// Retorna o estado de saúde da API
router.get('/hoteis/health', (req, res, next) => {
  res.json({status: 'UP'});
})

/* GET home page. */
router.get('/hoteis', function(req, res, next) {
  res.json(hoteis);
});

router.get('/hoteis/:id', function(req, res, next) 
{
  hoteis.forEach(function(item){
    if(item.id == parseInt(req.params.id, 10)){
      res.json(item);
    }
  });
});

router.get('/hoteis/busca/:string', function(req, res, next) 
{
  var result = [];
  hoteis.forEach(function(item)
  {
    if (item.nome.toLowerCase().includes(req.params.string.toLowerCase())) 
    { 
       result.push(item);
    }
    if (item.cidade.toLowerCase().includes(req.params.string.toLowerCase())) 
    { 
       result.push(item);
    }
  });
  res.json(result);
});

module.exports = router;
