const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{

  res.send(JSON.stringify(friends, null, 4));

  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email
  
  res.send(friends[email])//This line is to be replaced with actual return value
});


// POST request: Add a new friend
router.post("/", function(req,res) {
  //check if email is provided in the request body

  if(req.body.email) {
    friends[req.body.email] = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "DOB": req.body.DOB,
    };
  }
  res.send("The user" + (req.body.firstname) + " has been added");

});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  //extract email parameter from request URL
  //This is for changing the details of a curreny friend in the list
  const email = req.params.email;
  let friend = friends[email];
    //check if the friend exists
  if(friend) {
    let DOB = req.body.DOB;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if(DOB) {
         friend["DOB"] = DOB;
    }
    if(firstName) {
        friend[firstName] = firstName;
    }
    if(lastName) {
        friend[lastName] = lastName;
    }

    friend[email] = friend; //update friend details in friends object -- 
    res.send(`Friend with the email ${email} has been upstaed.`);
  } else {
    res.send("Could not find your friend");
  }

});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email

  //filterd_users = user((user) => user.email !=email)
  if(email) {
    delete friends[email]
  }

  res.send(`Friend with email ${email} deleted`);//This line is to be replaced with actual return value
});

module.exports=router;
