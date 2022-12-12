const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const index = niceList.findIndex(n => n === process.argv[2]);
if (!index || index < 0 || index > niceList.length || !process.argv[2]) {
  console.log('Name not found in nice list!');
  process.exit(1);
}

const leaf = process.argv[3];
const merkleTree = new MerkleTree(niceList);
const proof = merkleTree.getProof(index);


async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    leaf,
    proof,
  });

  console.log({ gift });
}

main();