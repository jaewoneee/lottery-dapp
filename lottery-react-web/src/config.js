export const CONTACT_ADDRESS = "0xED43Bcf94743F0248d896D52A9693F775FE3642C";
export const CONTACT_ABI = [
  {
    constant: true,
    inputs: [],
    name: "answerForTest",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x84f7e4f0",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x8da5cb5b",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
    signature: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        name: "challenges",
        type: "bytes1",
      },
      {
        indexed: false,
        name: "answerBlockNumber",
        type: "uint256",
      },
    ],
    name: "BET",
    type: "event",
    signature:
      "0x100791de9f40bf2d56ffa6dc5597d2fd0b2703ea70bc7548cd74c04f5d215ab7",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        name: "challenges",
        type: "bytes1",
      },
      {
        indexed: false,
        name: "answer",
        type: "bytes1",
      },
      {
        indexed: false,
        name: "answerBlockNumber",
        type: "uint256",
      },
    ],
    name: "WIN",
    type: "event",
    signature:
      "0x8219079e2d6c1192fb0ff7f78e6faaf5528ad6687e69749205d87bd4b156912b",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        name: "challenges",
        type: "bytes1",
      },
      {
        indexed: false,
        name: "answer",
        type: "bytes1",
      },
      {
        indexed: false,
        name: "answerBlockNumber",
        type: "uint256",
      },
    ],
    name: "FAIL",
    type: "event",
    signature:
      "0x3b19d607433249d2ebc766ae82ca3848e9c064f1febb5147bc6e5b21d0adebc5",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        name: "challenges",
        type: "bytes1",
      },
      {
        indexed: false,
        name: "answer",
        type: "bytes1",
      },
      {
        indexed: false,
        name: "answerBlockNumber",
        type: "uint256",
      },
    ],
    name: "DRAW",
    type: "event",
    signature:
      "0x72ec2e949e4fad9380f9d5db3e2ed0e71cf22c51d8d66424508bdc761a3f4b0e",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        name: "challenges",
        type: "bytes1",
      },
      {
        indexed: false,
        name: "answerBlockNumber",
        type: "uint256",
      },
    ],
    name: "REFUND",
    type: "event",
    signature:
      "0x59c0185881271a0f53d43e6ab9310091408f9e0ff9ae2512613de800f26b8de4",
  },
  {
    constant: true,
    inputs: [],
    name: "getPot",
    outputs: [
      {
        name: "pot",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x403c9fa8",
  },
  {
    constant: false,
    inputs: [
      {
        name: "challenges",
        type: "bytes1",
      },
    ],
    name: "betAndDistribute",
    outputs: [
      {
        name: "result",
        type: "bool",
      },
    ],
    payable: true,
    stateMutability: "payable",
    type: "function",
    signature: "0xe16ea857",
  },
  {
    constant: false,
    inputs: [
      {
        name: "challenges",
        type: "bytes1",
      },
    ],
    name: "bet",
    outputs: [
      {
        name: "result",
        type: "bool",
      },
    ],
    payable: true,
    stateMutability: "payable",
    type: "function",
    signature: "0xf4b46f5b",
  },
  {
    constant: false,
    inputs: [],
    name: "distribute",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xe4fc6b6d",
  },
  {
    constant: false,
    inputs: [
      {
        name: "answer",
        type: "bytes32",
      },
    ],
    name: "setAnswerForTest",
    outputs: [
      {
        name: "result",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x7009fa36",
  },
  {
    constant: true,
    inputs: [
      {
        name: "challenges",
        type: "bytes1",
      },
      {
        name: "answer",
        type: "bytes32",
      },
    ],
    name: "isMatch",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
    signature: "0x99a167d7",
  },
  {
    constant: true,
    inputs: [
      {
        name: "index",
        type: "uint256",
      },
    ],
    name: "getBetInfo",
    outputs: [
      {
        name: "answerBlockNumber",
        type: "uint256",
      },
      {
        name: "bettor",
        type: "address",
      },
      {
        name: "challenges",
        type: "bytes1",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x79141f80",
  },
  {
    constant: false,
    inputs: [
      {
        name: "challenges",
        type: "bytes1",
      },
    ],
    name: "pushBet",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x03282096",
  },
  {
    constant: false,
    inputs: [
      {
        name: "index",
        type: "uint256",
      },
    ],
    name: "popBet",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xd04c9a8c",
  },
];
