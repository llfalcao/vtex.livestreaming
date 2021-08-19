import React, { useState, Fragment, useEffect, useRef } from 'react'
import IconClose from '@vtex/styleguide/lib/icon/Close'

// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../typings/livestreaming'
import { useHighlightProduct } from '../../hooks/useHighlightProduct'
import styles from './highlightProduct.css'

interface HighlightProductProps {
  infoSocket: InfoSocket
  collectionId: string | undefined
}

const HighlightProduct = ({
  infoSocket,
  collectionId
}: HighlightProductProps) => {
  const [show, setShow] = useState<boolean | undefined>(false)
  const [optionHighlight, setOptionHighlight] = useState<string | undefined>()
  const { ivsRealTime, highlightProduct } = infoSocket
  const divProduct = useRef<HTMLDivElement>(null)

  const { product, showProduct, handlerCloseCard } = useHighlightProduct({
    highlightProduct,
    collectionId
  })

  const addToCart = () => {
    const link = document.getElementById('add-cart')
    if (link) link.click()
  }

  useEffect(() => {
    if (ivsRealTime && ivsRealTime.status === 'LIVE') {
      setShow(showProduct)
      return
    }
    setShow(false)
  }, [ivsRealTime, showProduct])

  useEffect(() => {
    if (highlightProduct?.backgroundWhiteHighlight)
      localStorage.setItem(
        'backgroundWhiteHighlight',
        highlightProduct?.backgroundWhiteHighlight
      )

    const backgroundWhiteHighlight = localStorage.getItem(
      'backgroundWhiteHighlight'
    )

    if (backgroundWhiteHighlight) {
      setOptionHighlight(backgroundWhiteHighlight)
    } else {
      setOptionHighlight(highlightProduct?.backgroundWhiteHighlight)
    }
  }, [highlightProduct?.backgroundWhiteHighlight])

  return (
    <Fragment>
      {show ? (
        <div
          className={`${styles.highlightProductContainer}  ${
            !optionHighlight || optionHighlight === 'white'
              ? styles.white
              : styles.black
          }`}
          id='highlightProductContainer'
        >
          <button
            className={`${styles.closeCardBtn} ${
              !optionHighlight || optionHighlight === 'white'
                ? styles.closeCardBtnWhite
                : styles.closeCardBtnBlack
            }`}
            onClick={handlerCloseCard}
          >
            <IconClose />
          </button>
          <div className={styles.productContainer}>
            <img className={styles.productPicture} src={product.imageUrl} />
            <div
              className={`${styles.productInfo} ${
                !optionHighlight || optionHighlight === 'white'
                  ? styles.textBlack
                  : styles.textWhite
              }`}
            >
              <p className={styles.productTitle}>{product.name}</p>
              <div className={styles.productPriceContainer}>
                <div>
                  <p className={styles.productDiscounted}>
                    $ {product.priceWithDiscount}
                  </p>
                  <p className={styles.productPrice}>$ {product.price}</p>
                </div>
                <div className={styles.productAddCartContent}>
                  <a className={styles.productAddCart} onClick={addToCart}>
                    Ver
                  </a>
                  <div ref={divProduct} id={product.id}>
                    <a
                      id='add-cart'
                      href={product.addToCartLink}
                      target='_blank'
                      rel='noreferrer'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default HighlightProduct
