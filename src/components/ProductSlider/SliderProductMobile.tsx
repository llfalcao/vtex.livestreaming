import React, { Fragment } from 'react'
import { Transition, CSSTransition } from 'react-transition-group'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import { VerticalProductSlider } from './VerticalProductSlider'

import styles from './productSlider.css'

type SliderProductMobileProps = {
  collectionId: string | undefined
  time?: number
  infinite?: boolean
  height: string
  showSliderProducts: boolean
  setShowSliderProducts: React.Dispatch<React.SetStateAction<boolean>>
}

export const SliderProductMobile = ({
  collectionId,
  time,
  infinite,
  height,
  showSliderProducts,
  setShowSliderProducts
}: SliderProductMobileProps) => {
  return (
    <Transition in={showSliderProducts} timeout={150}>
      <CSSTransition
        in={showSliderProducts}
        timeout={100}
        classNames={styles.slide}
        unmountOnExit
      >
        <Fragment>
          <div
            className={styles.sliderProductMobileContainer}
            onClick={() => setShowSliderProducts(false)}
          />
          <div className={styles.sliderProductMobileContent}>
            <div style={{ overflow: 'hidden' }}>
              <div className={styles.closeContent}>
                <button
                  className={styles.buttonClose}
                  onClick={() => setShowSliderProducts(false)}
                >
                  <IconClose />
                </button>
              </div>
              <div>
                <VerticalProductSlider
                  collectionId={collectionId}
                  time={time}
                  infinite={infinite}
                  height={height + 50}
                />
              </div>
            </div>
          </div>
        </Fragment>
      </CSSTransition>
    </Transition>
  )
}