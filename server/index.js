const express = require('express');
const { verifyProof, concat } = require('../utils/verifyProof');
const { keccak256 } = require('ethereum-cryptography/keccak');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// (paste the hex string in here, without the 0x prefix)
const MERKLE_ROOT = '4cdf89e56895bbcabd3551d431b8ba74239d026cfac7af5fcb1c15934a4eaf34';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof } = req.body;
  const leaf = keccak256(Buffer.from(name)).toString('hex'); // Assuming names are stored as simple hex strings in the tree

  console.log("Received proof for:", name, " with proof:", proof);

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, leaf, MERKLE_ROOT, concat);
  console.log("Verification result:", isInTheList);

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