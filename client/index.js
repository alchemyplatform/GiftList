const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const tree = new MerkleTree(niceList);

    const name = "Ephyrian";  // Example name to prove

    const index = niceList.findIndex(n => n === name); 

      const proof = tree.getProof(index);

      const root = tree.getRoot();   /* Only for demonstration, not to be sent */


      const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        // TODO: add request body parameters here!
        name: name,
        proof: proof,
        root: root  /* This could be for additional verification */
      });

      console.log("Sending to server:", { name, proof });
      console.log({ gift });
}

main();