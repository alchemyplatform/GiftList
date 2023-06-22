const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(body.proof, body.leaf, MERKLE_ROOT);
  if (isInTheList) {
    res.send(`${body.leaf} You got a toy robot!`);
  } else {
    res.send(`${body.leaf} You are not on the list :(`);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
