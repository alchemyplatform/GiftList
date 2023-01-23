const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
// verify proof?
//root
const root = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

const verifyProof = require('../utils/verifyProof');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
   const name = 'Norman Block'
   console.log('name', name)
   // find index in the nice list
   const index = niceList.findIndex(_name => _name === name );
  console.log('index', index)
   // get proof

   const merkleTree = new MerkleTree(niceList)
   //console.log('merkletree', merkleTree)
   const proof = merkleTree.getProof(index)
   //console.log('proof', proof)
   //const inList = verifyProof(proof, name, root)
   

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    // verify proof is on the server
    // surround with own object
    proof: proof,
    name: name
  });

  console.log({ gift });
}

main();