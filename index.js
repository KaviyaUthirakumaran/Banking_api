const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

 
const customers =  [
  { id: 1, name: 'Arisha Barron' },
  { id: 2, name: 'Branden Gibson' },
  { id: 3, name: 'Rhonda Church' },
  { id: 4, name: 'Georgina Hazel' },
];

 //getting all customer details

 app.get('/api/customers', (req,res) => {
 	res.send(customers);
 });

 
// create a new bank account for a costumers 


 app.post('/api/customers', (req, res) => {
   const schema = {
    name: Joi.string().min(3).required()
   };

   const result = Joi.validate(req.body, schema);
   console.log(result);

   if(result.error){
   	res.status(400).send(result.error);
   	return;
   }
 	
   const customer = {
   	id: customers.length + 1,
   	name: req.body.name
   };
   customers.push(customer);
   res.send(customer);
 });


// a single customer may have multiple bank account 
//update a customer another bank account using put method


app.put('/api/customers/:id', (req, res) => {
   const customer = customers.find(c=> c.id === parseInt(req.params.id));
   if(!customer) res.status(404).send('the customer with the given ID is not found');
   
   customer.name = req.body.name;
   res.send(customer);
   
});


//  Retrieve balances for a given account using the respective customer id

// Retrieve transfer history for a given account using customer id

 app.get('/api/customers/:id', (req,res) =>{
   const customer = customers.find(c=> c.id === parseInt(req.params.id));
   if(!customer) res.status(404).send('the customer with the given ID is not found');
   res.send(customer);     
 });


app.listen(3000, () => console.log('Listening on port 3000...'));