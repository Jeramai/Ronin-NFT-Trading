import type { NFTData } from "./types"

// Mock data for demonstration purposes
const mockNFTs: NFTData[] = [
  {
    id: "1",
    tokenId: "1234",
    name: "Axie #1234",
    description: "A rare Axie with unique abilities",
    imageUrl: "/placeholder.svg?height=500&width=500",
    collectionName: "Axie Infinity",
    collectionAddress: "0x32950db2a7164ae833121501c797d79e7b79d74c",
    owner: "0x3a539ddf7f6957c7319ce2a8a10f1f9e8c11b1da",
    creator: "0x32950db2a7164ae833121501c797d79e7b79d74c",
    price: 0.5,
    rarity: "Rare",
    tokenStandard: "ERC-721",
    lastUpdated: "2023-10-15",
    attributes: [
      { trait_type: "Class", value: "Beast" },
      { trait_type: "HP", value: 45 },
      { trait_type: "Speed", value: 31 },
      { trait_type: "Skill", value: 35 },
      { trait_type: "Morale", value: 53 },
    ],
  },
  {
    id: "2",
    tokenId: "5678",
    name: "Land #5678",
    description: "A plot of land in Lunacia",
    imageUrl: "/placeholder.svg?height=500&width=500",
    collectionName: "Axie Land",
    collectionAddress: "0x8c811e3c958e190f5ec15fb376533a3398620500",
    owner: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
    price: 1.2,
    rarity: "Uncommon",
    tokenStandard: "ERC-721",
    lastUpdated: "2023-09-28",
    attributes: [
      { trait_type: "Type", value: "Savannah" },
      { trait_type: "X", value: 120 },
      { trait_type: "Y", value: 145 },
    ],
  },
  {
    id: "3",
    tokenId: "9012",
    name: "Katana #9012",
    description: "A legendary katana with fire damage",
    imageUrl: "/placeholder.svg?height=500&width=500",
    collectionName: "Ronin Weapons",
    collectionAddress: "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b",
    owner: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    creator: "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b",
    price: 0.8,
    rarity: "Legendary",
    tokenStandard: "ERC-1155",
    lastUpdated: "2023-10-10",
    attributes: [
      { trait_type: "Damage", value: 85 },
      { trait_type: "Element", value: "Fire" },
      { trait_type: "Durability", value: 100 },
    ],
  },
  {
    id: "4",
    tokenId: "3456",
    name: "Mavis Avatar #3456",
    description: "A unique avatar for the Mavis Hub",
    imageUrl: "/placeholder.svg?height=500&width=500",
    collectionName: "Mavis Avatars",
    collectionAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    owner: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    price: 0.3,
    rarity: "Common",
    tokenStandard: "ERC-721",
    lastUpdated: "2023-10-05",
    attributes: [
      { trait_type: "Background", value: "Blue" },
      { trait_type: "Outfit", value: "Casual" },
      { trait_type: "Hair", value: "Short" },
      { trait_type: "Eyes", value: "Green" },
    ],
  },
  {
    id: "5",
    tokenId: "7890",
    name: "Mystic Charm #7890",
    description: "A mystic charm that brings luck to its owner",
    imageUrl: "/placeholder.svg?height=500&width=500",
    collectionName: "Mystic Items",
    collectionAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    owner: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    creator: "0x6b175474e89094c44da98b954eedeac495271d0f",
    price: 0.15,
    rarity: "Epic",
    tokenStandard: "ERC-1155",
    lastUpdated: "2023-09-20",
    attributes: [
      { trait_type: "Type", value: "Charm" },
      { trait_type: "Luck Bonus", value: 15 },
      { trait_type: "Durability", value: 100 },
    ],
  },
  {
    id: "6",
    tokenId: "2345",
    name: "Dragon Egg #2345",
    description: "A rare dragon egg that will hatch into a powerful companion",
    imageUrl: "/placeholder.svg?height=500&width=500",
    collectionName: "Dragon Eggs",
    collectionAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    owner: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
    price: 2.5,
    rarity: "Mythic",
    tokenStandard: "ERC-721",
    lastUpdated: "2023-10-12",
    attributes: [
      { trait_type: "Element", value: "Fire" },
      { trait_type: "Maturity", value: "Unhatched" },
      { trait_type: "Potential", value: 95 },
    ],
  },
  {
    id: "7",
    tokenId: "6789",
    name: "Battle Shield #6789",
    description: "A sturdy shield that provides excellent protection",
    imageUrl: "/placeholder.svg?height=500&width=500",
    collectionName: "Battle Gear",
    collectionAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    owner: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    creator: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    price: 0.4,
    rarity: "Rare",
    tokenStandard: "ERC-1155",
    lastUpdated: "2023-09-25",
    attributes: [
      { trait_type: "Defense", value: 75 },
      { trait_type: "Weight", value: "Medium" },
      { trait_type: "Material", value: "Steel" },
    ],
  },
  {
    id: "8",
    tokenId: "0123",
    name: "Magic Potion #0123",
    description: "A magical potion that restores health",
    imageUrl: "/placeholder.svg?height=500&width=500",
    collectionName: "Alchemy Items",
    collectionAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    owner: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    price: 0.1,
    rarity: "Common",
    tokenStandard: "ERC-1155",
    lastUpdated: "2023-10-01",
    attributes: [
      { trait_type: "Effect", value: "Healing" },
      { trait_type: "Potency", value: 50 },
      { trait_type: "Duration", value: "Instant" },
    ],
  },
]

// Simulate API call with a delay
export async function fetchNFTs(filter: string): Promise<NFTData[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real app, you would fetch from the Ronin blockchain API
  // For now, we'll return mock data with some filtering
  switch (filter) {
    case "trending":
      return mockNFTs.sort(() => Math.random() - 0.5).slice(0, 6)
    case "recent":
      return [...mockNFTs].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    case "collections":
      // Group by collection and return one from each
      const collections = new Map<string, NFTData>()
      mockNFTs.forEach((nft) => {
        if (!collections.has(nft.collectionName)) {
          collections.set(nft.collectionName, nft)
        }
      })
      return Array.from(collections.values())
    case "my-nfts":
      // Simulate user owned NFTs (random selection for demo)
      return mockNFTs.filter((_, index) => index % 3 === 0)
    default:
      return mockNFTs
  }
}

// In a real application, you would implement these functions to interact with the Ronin blockchain
export async function fetchNFTDetails(id: string): Promise<NFTData | null> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockNFTs.find((nft) => nft.id === id) || null
}

export async function fetchCollections(): Promise<{ name: string; address: string }[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const collections = new Map<string, { name: string; address: string }>()

  mockNFTs.forEach((nft) => {
    if (!collections.has(nft.collectionName)) {
      collections.set(nft.collectionName, {
        name: nft.collectionName,
        address: nft.collectionAddress,
      })
    }
  })

  return Array.from(collections.values())
}

