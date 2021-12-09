import React, { Fragment, useContext } from 'react'
import { useIntl } from 'react-intl'
import { ActionsContext, SettingContext } from '../../context'
import { addToCart } from '../../utils'

import styles from './productButton.css'

type ProductButtonProps = {
  addToCartLink: string
  handleClose?: () => void
  imageUrl: string
  isAvailable: boolean
  productId: string
  productName?: string
  sectionIdClickedOn?: string
}

const ProductButton = (props: ProductButtonProps) => {
  const {
    addToCartLink,
    handleClose,
    imageUrl,
    isAvailable,
    productId,
    productName,
    sectionIdClickedOn
  } = props

  const { infoSocket } = useContext(SettingContext)

  const { socket } = infoSocket || {}

  const { formatMessage } = useIntl()

  const {
    setting: { isInGlobalPage, redirectTo }
  } = useContext(ActionsContext)

  return (
    <Fragment>
      <button
        className={`${styles.productAddCart} ${
          !isAvailable && styles.noActive
        }`}
        disabled={!isAvailable}
        onClick={() => {
          if (socket && socket?.readyState === 1) {
            const sendLike = {
              action: 'sendaddtocart',
              data: {
                imageUrl: imageUrl
              }
            }

            socket.send(JSON.stringify(sendLike))
          }

          addToCart(productId, redirectTo, isInGlobalPage)

          if (handleClose) handleClose()
          if (!sectionIdClickedOn) return

          const eventAddToCart = JSON.stringify({
            sectionIdClickedOn,
            productId,
            productName
          })

          localStorage.setItem('sectionIdClickedOnForAddToCart', eventAddToCart)
        }}
      >
        {isAvailable
          ? formatMessage({ id: 'store/text.add' })
          : formatMessage({ id: 'store/text.not-stock' })}
      </button>
      <div>
        <a
          id={`add-cart-${productId}`}
          className='add-cart'
          target='_blank'
          rel='noreferrer'
          href={addToCartLink}
        />
      </div>
    </Fragment>
  )
}

export default ProductButton
