const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
const MERKLE_ROOT = new MerkleTree(niceList);
const root = MERKLE_ROOT.getRoot();
//console.log("root is ",root);

const name = 'Norman Block';
const index = niceList.findIndex(n => n === name);
const proof = MERKLE_ROOT.getProof(index);

const requestBody = {
  proof: proof,
  name : name
};
  // TODO: how do we prove to the server we're on the nice list? 

  const { data: gift } = await axios.post(`${serverUrl}/gift`, requestBody);
  console.log("req sent from client");
  console.log({ gift });
}

main();