import { OnrampWebSDK } from '@onramp.money/onramp-web-sdk';

const Events = {ONRAMP_WIDGET_TX_INIT:"ONRAMP_WIDGET_TX_INIT", 
    ONRAMP_WIDGET_TX_FINDING:"ONRAMP_WIDGET_TX_FINDING", 
    ONRAMP_WIDGET_TX_PURCHASING:"ONRAMP_WIDGET_TX_PURCHASING", 
    ONRAMP_WIDGET_TX_SENDING:"ONRAMP_WIDGET_TX_SENDING", 
    ONRAMP_WIDGET_TX_COMPLETED:"ONRAMP_WIDGET_TX_COMPLETED",
    ONRAMP_WIDGET_TX_SENDING_FAILED:"ONRAMP_WIDGET_TX_SENDING_FAILED", 
    ONRAMP_WIDGET_TX_PURCHASING_FAILED:"ONRAMP_WIDGET_TX_PURCHASING_FAILED", 
    ONRAMP_WIDGET_TX_FINDING_FAILED:"ONRAMP_WIDGET_TX_FINDING_FAILED",
    ONRAMP_WIDGET_READY:"ONRAMP_WIDGET_READY", 
ONRAMP_WIDGET_FAILED:"ONRAMP_WIDGET_FAILED", 
ONRAMP_WIDGET_CLOSE_REQUEST:"ONRAMP_WIDGET_CLOSE_REQUEST",
ONRAMP_WIDGET_CONTENT_COPIED:"ONRAMP_WIDGET_CONTENT_COPIED",
}

const OnRamp =()=> {
  const onrampInstance = new OnrampWebSDK({
    appId: 1, // replace this with the appID you got during onboarding process
    walletAddress: '0x495f519017eF0368e82Af52b4B64461542a5430B', // replace with user's wallet address
    flowType: 1, // 1 -> onramp || 2 -> offramp || 3 -> Merchant checkout
    fiatType: 1, // 1 -> INR || 2 -> TRY || 3 -> AED || 4 -> MXN || 5-> VND || 6 -> NGN etc. visit Fiat Currencies page to view full list of supported fiat currencies
    paymentMethod: 1, // 1 -> Instant transafer(UPI) || 2 -> Bank transfer(IMPS/FAST)
    lang: 'en', // for more lang values refer 
    // fiatAmount: 500,
    coinAmount: 20,
    // ... pass other configs
  });
    onrampInstance.on(Events.ONRAMP_WIDGET_CLOSE_REQUEST,()=>{
        console.log("close")
    })
    onrampInstance.on(Events.ONRAMP_WIDGET_CLOSE_REQUEST,()=>{
        console.log("cancelled")
    })
    onrampInstance.on(Events.ONRAMP_WIDGET_FAILED,()=>{
        console.log("failed")
    })
    onrampInstance.on(Events.ONRAMP_WIDGET_READY,()=>{
        console.log("ready")
    })
  const openWidget = () =>{
    onrampInstance.show()
    
  }
  return (
    <div className="App">
    <button onClick={openWidget}>Open</button>
    </div>
  );
}

export default OnRamp;
