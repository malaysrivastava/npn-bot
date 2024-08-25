import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { useAuth } from '../helpers/authContext';
import { useEffect, useState } from "react";
import RPC from "../helpers/ethersRPC";
import { TextField, Button, Typography, Container } from '@mui/material';


// IMP START - Dashboard Registration
const clientId = "BIIiazAq8n6j8hQrLOAVMkO8Y9orNdK0z6keePk4hKtLcXB-VJVMVc8Q25XXmMTOUJkwwP4FoA5Tgfsdfzm4Yec"; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://sepolia.infura.io/v3/b07082cc43224533aa3f3ca2fb8ed1cc",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const WalletAuth = () => {
  const { login } = useAuth();
  const { logout } = useAuth();
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  // Handle form submission
  const handleSubmit = async (event:any) => {
      event.preventDefault(); // Prevent the default form submission behavior
        try {
         sendTransaction(input1,input2);
      } catch (error) {
      }
  };
  const [balance, setBalance] = useState<string | null>(null); // State to store balance
  const [address, setAddress] = useState<string | null>(null); // State to store balance

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected && localStorage.getItem('isLoggedIn') === 'true') {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          setProvider(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(()=>{
    if(provider){
      const init = async () => {
        const address = await RPC.getAccounts(provider);
    const balance = await RPC.getBalance(provider);
    setBalance(balance);
    setAddress(address)
      }
      init();
    }
  },[provider])

  const Login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
      const user = await web3auth.getUserInfo();
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userInfo', user.profileImage as string);
      login(web3authProvider);
      window.location.href = '/';
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const Logout = async () => {
    await web3auth.logout();
    logout();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    window.location.href = '/';
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const address = await RPC.getAccounts(provider);
    uiConsole(address);
    setAddress(address)
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    setBalance(balance); // Update balance state
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
    uiConsole(signedMessage);
  };

   const sendTransaction = async (address:string,amount?:any) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    uiConsole("Sending Transaction...");
    const transactionReceipt = await RPC.sendTransaction(provider,address,amount);
    uiConsole(transactionReceipt);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
        </div>
      </div>
        <div>
        <Container>
            <Typography variant="h6" gutterBottom>
                Send Ether
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Address"
                    variant="outlined"
                    size="small"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Amount"
                    variant="outlined"
                    size="small"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Send
                </Button>
            </form>
        </Container>
        </div>
    </>
  );

  const unloggedInView = (
    <button onClick={Login} className="card">
      Login
    </button>
  );
  
  return (
    <div className="container">
      {/* Balance Display */}
      <div className="balance-display">
        {balance !== null ? `Balance: ${balance} ETH` : "Balance not available"}
      </div>
      <div className="balance-display">
        {address !== null ? `Address: ${address}` : "Address not available"}
      </div>
      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
}

export default WalletAuth;
