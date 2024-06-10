const { keccak256 } = require('ethereum-cryptography/keccak');
const { bytesToHex } = require('ethereum-cryptography/utils');

const concat = (left, right) => keccak256(Buffer.concat([left, right]));

function verifyProof(proof, leaf, root) {
 
    proof = proof.map(({data, left}) => ({ 
    left, data: Buffer.from(data, 'hex')
  }));

  let data = keccak256(Buffer.from(leaf));
  console.log("Initial hash from leaf:", bytesToHex(data));

  for (let i = 0; i < proof.length; i++) {

    console.log(`Step ${i}, applying data: ${bytesToHex(proof[i].data)}, left: ${proof[i].left}`);

    data = proof[i].left ? concat(proof[i].data, data) : concat(data, proof[i].data);
    console.log(`Hash after step ${i}:`, bytesToHex(data));
  }

    const finalComputedRoot = bytesToHex(data);

  console.log("Computed root:", bytesToHex(data));
  console.log("Expected root:", root);

  return finalComputedRoot === root;
}

module.exports = { verifyProof, concat };



  


  



