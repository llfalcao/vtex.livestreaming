/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'

import { useFetchProducts } from '../../hooks/useFetchProducts'
import { ActionsContext, SettingContext } from '../../context'

import styles from '../ProductSlider/productSlider.css'
import { ChatCarouselProductItem } from '../ProductSlider/ChatCarouselProductItem'
import { Spinner } from '../commonComponents'

type ChatCarouselProps = {
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  transmitionType: string | undefined
  fullScreen: boolean
  handleFullScreen: () => void
}

export const ChatCarousel = ({
  setShowVariation,
  fullScreen,
  handleFullScreen
}: ChatCarouselProps) => {
  const { collectionId } = useContext(SettingContext)
  const {
    setting: { originOfProducts }
  } = useContext(ActionsContext)

  const { products, loading } = useFetchProducts({
    collectionId
  })

  return !loading ? (
    <div className={styles.chatCarouselContainer}>
      {products &&
        products.length > 0 &&
        products.map((product: any) => (
          <div key={product.id} className={styles.horizontalProductList}>
            <ChatCarouselProductItem
              {...product}
              originOfProducts={originOfProducts}
              setShowVariation={setShowVariation}
              sectionIdClickedOn='live_shopping_carousel'
              fullScreen={fullScreen}
              handleFullScreen={handleFullScreen}
            />
          </div>
        ))}
    </div>
  ) : (
    <div className={styles.chatCarouselContainer}>
      <Spinner />
    </div>
  )
}
