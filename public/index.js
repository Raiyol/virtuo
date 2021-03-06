'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance' : 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

// Step 1
function whichCar(id)
{
  for(var i = 0; i < cars.length; i++)
  {
    if(cars[i].id == id)
    {
      return cars[i];
    }
  }
}

for(var i = 0; i < rentals.length; i++)
{
  var day = new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate);
  day /= 24*60*60*1000;
  day += 1;
  rentals[i].price = whichCar(rentals[i].carId).pricePerKm * rentals[i].distance + day * whichCar(rentals[i].carId).pricePerDay;
  console.log(rentals[i].price)
}

// Step 2
for(var i = 0; i < rentals.length; i++)
{
  var day = new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate);
  day /= 24*60*60*1000;
  day += 1;
  if(day > 10)
  {
    rentals[i].price *= 0.5;
  }
  else if(day > 4)
  {
    rentals[i].price *= 0.7;
  }
  else if(day > 1)
  {
    rentals[i].price *= 0.9;
  }
  console.log(rentals[i].price)
}

// Step 3
for(var i = 0; i < rentals.length; i++)
{
  var day = new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate);
  day /= 24*60*60*1000;
  day += 1;
  rentals[i].commission.insurance = rentals[i].price * 0.3 / 2;
  rentals[i].commission.treasury = day;
  rentals[i].commission.virtuo = rentals[i].price * 0.3 - rentals[i].commission.insurance - rentals[i].commission.treasury;
}

// Step 4
for(var i = 0; i < rentals.length; i++)
{
  var day = new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate);
  day /= 24*60*60*1000;
  day += 1;
  if(rentals[i].options.deductibleReduction == true)
  {
    rentals[i].commission.virtuo += 4 * day;
    rentals[i].price += 4 * day;
  }
}

// Step 5
for(var i = 0; i < actors.length; i++)
{
  for(var j = 0; j < rentals.length; j++)
  {
    if(actors[i].rentalId == rentals[j].id)
    {
      actors[i].payment[0].amount = rentals[j].price;
      actors[i].payment[1].amount = rentals[j].price * 0.7;
      actors[i].payment[2].amount = rentals[j].commission.insurance;
      actors[i].payment[3].amount = rentals[j].commission.treasury;
      actors[i].payment[4].amount = rentals[j].commission.virtuo;
    }
  }
}

console.log(cars);
console.log(rentals);
console.log(actors);
