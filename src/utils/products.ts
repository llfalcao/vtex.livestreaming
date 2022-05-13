export const filterAvailableProducts = (product: any) => {
  const filterItems = product?.items.filter((item: any) => {
    const availableSellers = item.sellers.filter((seller: any) =>
      seller.commertialOffer.IsAvailable &&
      seller.commertialOffer.Price > 0 &&
      seller.commertialOffer.AvailableQuantity > 0)
    return availableSellers.length > 0
  })

  const item = filterItems[0]
  const seller = item?.sellers.find((seller: { sellerDefault: boolean }) => seller.sellerDefault === true)

  return {
    item,
    seller
  }
}
