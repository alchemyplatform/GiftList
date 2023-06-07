const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
 const root='ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';


app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const proof = body.proof;
  const name = body.name;
  
  //console.log("server side, params ",proof,index)

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, root);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
