import "./styles.css";
import { Coins } from "./CoinList";
import Web3 from "web3";
import { abi } from "./pancakeabi.js";
// import { ChainId, Token, Fetcher, Pair } from "@pancakeswap-libs/sdk";
// import { Provider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
export default function App() {
  var pro = undefined;
  async function constructor() {
    pro = await detectEthereumProvider();
    console.log(window.ethereum === pro);
  }

  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/")
  );
  const pancake = new web3.eth.Contract(
    abi,
    "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F"
  );

  const selectedA = "BUSD";
  const selectedB = "USDT";
  const mapp = Coins.map((coin) => coin).filter(
    (fil) => fil.symbol !== selectedA && fil.symbol !== selectedB
  );
  console.log(mapp);
  var out = [];
  var check = [];
  var final = [];
  async function loop() {
    for (var i = 1; i < mapp.length; i++) {
      try {
        out[i] = await pancake.methods
          .getAmountsOut("1000000000000000000", [
            "0xe9e7cea3dedca5984780bafc599bd69add087d56",
            mapp[i].address,
            "0x55d398326f99059ff775485246999027b3197955"
          ])
          .call();
        check[i] = true;
      } catch {
        console.log(i, Error);
        check[i] = false;
        continue;
      }
      if (check[i] === true) {
        final[i] = out[i][2];
        console.log(final[i]);
      }
    }
    for (var j = 1; j < mapp.length; j++) {
      for (var k = j + 1; j < mapp.length; k++) {
        if (final[i] > final[j]) {
          console.log(i, final[i]);
        }
      }
    }
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button>check</button>
      <button onClick={loop}>Pair</button>
      <button onClick={constructor}>connect</button>
    </div>
  );
}
