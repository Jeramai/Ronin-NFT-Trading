const ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradeId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address'
      }
    ],
    name: 'TradeAgreed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradeId',
        type: 'uint256'
      }
    ],
    name: 'TradeCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradeId',
        type: 'uint256'
      }
    ],
    name: 'TradeCompleted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradeId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address'
      }
    ],
    name: 'TradeConfirmed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradeId',
        type: 'uint256'
      }
    ],
    name: 'TradeProposed',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tradeId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_fromNftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_fromNftId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_toNftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_toNftId',
        type: 'uint256'
      }
    ],
    name: 'agreeTrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tradeId',
        type: 'uint256'
      }
    ],
    name: 'confirmTrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tradeId',
        type: 'uint256'
      }
    ],
    name: 'getTrade',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'fromAddress',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'fromNftContract',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'fromNftId',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'fromHasAgreed',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'fromHasConfirmed',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'toAddress',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'toNftContract',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'toNftId',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'toHasAgreed',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'toHasConfirmed',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256'
          },
          {
            internalType: 'enum NftSwap.TradeStatus',
            name: 'status',
            type: 'uint8'
          }
        ],
        internalType: 'struct NftSwap.Trade',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_fromAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_toAddress',
        type: 'address'
      }
    ],
    name: 'proposeTrade',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'trades',
    outputs: [
      {
        internalType: 'address',
        name: 'fromAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'fromNftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'fromNftId',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'fromHasAgreed',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'fromHasConfirmed',
        type: 'bool'
      },
      {
        internalType: 'address',
        name: 'toAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'toNftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'toNftId',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'toHasAgreed',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'toHasConfirmed',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256'
      },
      {
        internalType: 'enum NftSwap.TradeStatus',
        name: 'status',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

export default ABI;
