
export const CONTRACT_ADX = "0x4B0a24db3a6e5F5247a7868C02230f8F1ba0c9D1";
export const ADD_TWEET_FUNC_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tweetTxt",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tweetImg",
        "type": "string"
      }
    ],
    "name": "createTweet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];
export const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "tweetTxt",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "tweetImg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tweeter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "TweetCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tweetTxt",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tweetImg",
        "type": "string"
      }
    ],
    "name": "createTweet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getTweet",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

