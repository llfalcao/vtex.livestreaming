/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useIntl } from 'react-intl'

import { currencyFormat } from '../../utils'
import { ProductButton } from '../ProductsButton/ProductButton'
import { KuikPayButton } from '../ProductsButton/KuikPayButton'
import { ProductVariationButton } from '../ProductsButton/ProductVariationButton'
import { ActionsContext } from '../../context/ActionsContext'
import type { Products } from '../../typings/livestreaming'

import styles from './productSlider.css'

const SPANISH_CODE = 'es'
type ProductItemProps = {
  product: Products
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  sectionIdClickedOn?: string
}

export const ProductItem = (props: ProductItemProps) => {
  const { product, setShowVariation, sectionIdClickedOn } = props

  const {
    id,
    name,
    price,
    priceWithDiscount,
    imageUrl,
    isAvailable,
    variationSelector,
    pdpLink
  } = product

  const {
    setting: { isInGlobalPage, kuikpay, originOfProducts, showQuickView }
  } = useContext(ActionsContext)

  const { formatMessage, locale } = useIntl()
  const isSpanish = locale === SPANISH_CODE
  return (
    <div className={styles.productItemContent}>
      <div className={styles.pictureContent}>
        <a
          className={styles.productLink}
          href={pdpLink}
          target='_blank'
          rel='noreferrer'
        >
          <img className={styles.picture} src={imageUrl} />
        </a>
      </div>
      <div className={styles.productDeatailContent}>
        <h4 className={styles.productTitle}>{name}</h4>
        {price !== priceWithDiscount && (
          <span className={styles.price}>
            {isSpanish ? formatMessage({ id: 'store/text.before' }) + ': ' : ''}
            {currencyFormat(price)}
          </span>
        )}
        <span className={styles.priceWithDiscount}>
          {isSpanish ? formatMessage({ id: 'store/text.now' }) + ': ' : ''}
          {currencyFormat(priceWithDiscount)}
        </span>
        <div className={styles.productAddCartContent}>
          {variationSelector.length === 0 ||
          isInGlobalPage ||
          !showQuickView ? (
            <ProductButton
              product={product}
              sectionIdClickedOn={sectionIdClickedOn}
            />
          ) : (
            <ProductVariationButton
              isAvailable={isAvailable}
              productId={id}
              setShowVariation={setShowVariation}
              sectionIdClickedOn={sectionIdClickedOn}
              productName={name}
            />
          )}
          {kuikpay && originOfProducts !== 'platform' && (
            <KuikPayButton product={product} />
          )}
        </div>
      </div>
    </div>
  )
}
