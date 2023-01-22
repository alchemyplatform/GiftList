const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const tree = new MerkleTree(niceList)
  const name = process.argv.slice(2).length === 1 ? process.argv.slice(2).toString() : 'Gerald McGlynn'
  const index = niceList.findIndex(n => n === name);
  const proof = tree.getProof(index)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    name: name
  });

  console.log({ gift });
}

main();