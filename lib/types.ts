export interface NFTAttribute {
  trait_type: string
  value: string | number
}

export interface NFTData {
  id: string
  tokenId: string
  name: string
  description?: string
  imageUrl: string
  collectionName: string
  collectionAddress: string
  owner: string
  creator?: string
  price?: number
  rarity?: string
  tokenStandard: string
  lastUpdated: string
  attributes?: NFTAttribute[]
}

