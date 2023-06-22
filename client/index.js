const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const name = "Mr. Otis Koelpin III";
  const merkleTree = new MerkleTree(niceList);
  console.log(typeof merkleTree.getRoot());
  const index = niceList.indexOf(name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    leaf: name,
    proof,
  });

  console.log({ gift });
}

main();
