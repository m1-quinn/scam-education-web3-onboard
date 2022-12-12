import { useState, useEffect } from 'react';
import React from 'react';
import { ThemeProvider } from "styled-components";
import { Window, WindowHeader, Button } from 'react95';
import { init, useConnectWallet,  } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import original from "react95/dist/themes/original";
import { ethers } from 'ethers';
import { Container, Row, Col } from 'react-bootstrap';
import { GlobalStyles } from './helpers/globalStyles';
import { ClaimTokens, BurnTokens, TransferTokens, ApproveSpender, ApproveSpenderUnlimited} from './utils/erc20';
import { ApproveNFT, Mint, SafeTransferFrom, ContractSetApprovalForAll, UserSetApprovalForAll } from './utils/erc721';
import { DepositWeth, SendEth, RandomContract } from './utils/misc';
import { ClaimTokensTest, WethTest } from './utils/allowlistTesting';

const { REACT_APP_API_KEY } = process.env
const rpcUrl = `https://eth-mainnet.g.alchemy.com/v2/${REACT_APP_API_KEY}`;
const injected = injectedModule()

init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    }
  ]
})

function App() {
  const [account, setAccount] = useState(null);
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setEthersProvider] = useState(null);

  useEffect(() => {
    if (wallet) {
        setAccount(wallet.accounts[0].address.toLowerCase())
        setEthersProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  const connectWalletButton = () => {
    return (
      <button disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
    )
  }

  return (
   <div className="App" style={{background: '#008080', 'font-family': 'ms_sans_serif' }}>
    <GlobalStyles/>
      <ThemeProvider theme={original}>
      <br style={{size:5}}/>
      <Window className='window'>
        <WindowHeader style={{'text-align':'left'}}>Scam Education</WindowHeader>
        <div className='body'>
          <Container>
            <Row>
              <Col style={{paddingTop:15}}>
                <h4 style={{'font-weight':'bold'}}>This is meant for educational / testing purposes.</h4>
              </Col>
             </Row>
              <Row>
                <Col style={{padding:5, paddingTop:15}}>
                  {connectWalletButton()}
                </Col>
              </Row>
              <Container style={{paddingTop:15}}>
                <h4 style={{color:'#FF5300','font-weight':'bold'}}>ERC721 functions</h4>
                <Row>
                  <Col>
                    <Button onClick={() => Mint(account, ethersProvider)} style={{'font-size':15}}>Free Mint</Button>
                    <h5>Mint before calling ERC721 functions below.</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={() => SafeTransferFrom(account, ethersProvider)} style={{'font-size':15}}>safeTransferFrom</Button>
                    <h5>(Send NFT without receiving anything)</h5>
                    <h5>Token will be transferred from/to your wallet.</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={() => ContractSetApprovalForAll(account, ethersProvider)} style={{'font-size':15}}>setApprovalForAll</Button>
                    <h5>Gives another address(contract) the ability to move a specific token.</h5>
                    <h5>Approval given to test contract.</h5>
                  </Col>
                  <Col>
                    <Button onClick={() => UserSetApprovalForAll(account, ethersProvider)} style={{'font-size':15}}>setApprovalForAll</Button>
                    <h5>Gives another address(user) the ability to move a specific token.</h5>
                    <h5>Approval given to test contract deployer.</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={() => ApproveNFT(account, ethersProvider)} style={{'font-size':15}}>Approve one NFT</Button>
                    <h5>Gives another address the ability to move one token.</h5>
                    <h5>Must have a token minted before calling.</h5>
                    <h5>Approval given to test contract.</h5>
                  </Col>
                </Row>
              </Container>
              <Container style={{paddingTop:15}}>
                <h4 style={{color:'#FF5300','font-weight':'bold'}}>ERC20 functions</h4>
                <Row>
                  <Col>
                    <Button onClick={() => ClaimTokens(account, ethersProvider)} style={{'font-size':15}}>Claim Tokens</Button>
                    <h5>Claims 10 ERC20 tokens.</h5>
                    <h5>(Similar to claiming NFT staking rewards.)</h5>
                  </Col>
                  <Col>
                    <Button onClick={() => BurnTokens(account, ethersProvider)} style={{'font-size':15}}>Burn Tokens</Button>
                    <h5>Burns 10 ERC20 tokens.</h5>
                    <h5>Must have 10 tokens in account to call this.</h5>
                  </Col>
                </Row>
                <Row style={{paddingTop:15}}>
                  <Col>
                    <Button onClick={() => TransferTokens(account, ethersProvider)} style={{'font-size':15}}>Transfer Tokens</Button>
                    <h5>This will transfer test tokens from/to your wallet.</h5>
                    <h5>Must have 10 tokens in account to call this.</h5>
                  </Col>
                  <Col>
                    <Button onClick={() => ApproveSpender(account, ethersProvider)} style={{'font-size':15}}>Approve Spender</Button>
                    <h5>Gives another address the ability to spend your ERC20 tokens.</h5>
                    <h5>Approval given to test contract.</h5>
                  </Col>
                </Row>
                  <Col>
                    <Button onClick={() => ApproveSpenderUnlimited(account, ethersProvider)} style={{'font-size':15}}>Approve Spender (unlimited)</Button>
                    <h5>Gives another address the ability to spend your ERC20 tokens.</h5>
                    <h5>Approval given to test contract.</h5>
                  </Col>
                <Row>
                </Row>
              </Container>
              <Container style={{paddingBottom:15}}>
                <h4 style={{color: '#FF5300','font-weight':'bold'}}>Allowlist Testing</h4>
                <Row style={{paddingTop:15}}>
                  <Col>
                    <Button onClick={() => ClaimTokensTest(account, ethersProvider)} style={{'font-size':15}}>Not allowlisted</Button>
                    <h5>Claims 10 tokens from a contract that is not allowlisted for this site.</h5>
                  </Col>
                  <Col>
                    <Button onClick={() => WethTest(account, ethersProvider)} style={{'font-size':15}}>Opensea call</Button>
                    <h5>Deposits 0 WETH into the WETH contract.</h5>
                    <h5>(WETH contract is allowlisted for Opensea.)</h5>
                    <h5>
                      <a href='https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'>Click here for contract.</a>
                    </h5>
                  </Col>
                </Row>
              </Container>
              <Container style={{paddingBottom:15}}>
                <h4 style={{color:'#FF5300', 'font-weight':'bold'}}>Misc</h4>
                <Row style={{paddingTop:15}}>
                  <Col>
                    <Button onClick={() => SendEth(account, ethersProvider)} style={{'font-size':15}}>Send ETH</Button>
                    <h5>Transfers .001 ETH to yourself.</h5>
                  </Col>
                  <Col>
                    <Button onClick={() => DepositWeth(account, ethersProvider)} style={{'font-size':15}}>WETH</Button>
                    <h5>Deposits/swaps .001 ETH into WETH.</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={() => RandomContract(account, ethersProvider)} style={{'font-size':15, 'background-color': 'red'}}>Contract Age Check</Button>
                    <h5>Interacts with a recently deployed contract.</h5>
                    <h5>Do not confirm this transaction.</h5>
                    <h5>Contract you are interacting with is random and has not been audited.</h5>
                    <h5>Contract can be found
                    <a href='https://etherscan.io/address/0xe295ce5572387ab0d7c7fb914e2e19d9d44aeadb'> here</a>
                    . Recently deployed contracts are found
                    <a href='https://etherscan.io/contractsVerified'> here.</a>
                    </h5>
                    <h6>Updated 12/11/22</h6>
                  </Col>
                </Row>  
              </Container>
            </Container>
          </div>
        </Window>
      <br/>
    </ThemeProvider>
    <br/>
  </div>
  );
}

export default App;
