const contractAddress = "https://gateway.pinata.cloud/ipfs/QmPChd1nnNcFmHs9x9QuTk4zxU3AwjETug9zSxHQDaZxgd";
const abi = [ './path/to/build/contracts/MyNFT.sol' ];

document.addEventListener('DOMContentLoaded', () => {
    const Web3Modal = window.Web3Modal.default;
    const WalletConnectProvider = window.WalletConnectProvider.default;
    let provider = null;
    let web3 = null;
    let myNFT = null;

    async function init() {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: process.env.INFURA_API_KEY,
                }
            },
        };

        const web3Modal = new Web3Modal({
            cacheProvider: false,
            providerOptions,
        });

        provider = await web3Modal.connect();
        web3 = new Web3(provider);

        myNFT = new web3.eth.Contract(abi, contractAddress);
    }

    async function mintNFT(tokenURI) {
        const accounts = await web3.eth.getAccounts();
        const result = await myNFT.methods.mintNFT(accounts[0], tokenURI).send({ from: accounts[0] });
        console.log(result);
    }

    document.getElementById('mint').addEventListener('click', function() {
        const tokenURI = document.getElementById('tokenURI').value;
        mintNFT(tokenURI);
    });

    init();
});