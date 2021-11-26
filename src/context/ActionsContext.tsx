/* eslint-disable no-unused-vars */
import React, { createContext, useState, FC } from 'react'
import type { LivestreamingProps } from '../typings/livestreaming'

type ActionCtx = {
  setting: LivestreamingProps
  setSetting: (livestreamingProps: LivestreamingProps) => void
}

const actionsDefault: ActionCtx = {
  setting: {
    account: '',
    idLivestreaming: '',
    isInGlobalPage: false,
    isInfinite: true,
    kuikpay: false,
    originOfProducts: '',
    redirectTo: true,
    showChat: true,
    showLike: true,
    showProductsCarousel: false,
    showSidebarProducts: false,
    showViewers: true,
    time: 10
  },
  setSetting: () => {}
}

export const ActionsContext = createContext<ActionCtx>(actionsDefault)

type ActionsProviderProps = {
  props: LivestreamingProps
}

export const ActionsProvider: FC<ActionsProviderProps> = ({
  children,
  props
}) => {
  const {
    account,
    idLivestreaming,
    isInGlobalPage,
    isInfinite,
    kuikpay,
    originOfProducts,
    redirectTo,
    showChat,
    showLike,
    showProductsCarousel,
    showSidebarProducts,
    showViewers,
    time
  } = props

  const [setting, setSetting] = useState<LivestreamingProps>({
    account,
    idLivestreaming,
    isInGlobalPage:
      isInGlobalPage === undefined ? false : isInGlobalPage === true,
    isInfinite: isInfinite === undefined ? true : isInfinite === true,
    kuikpay: kuikpay === undefined ? false : kuikpay === true,
    originOfProducts,
    redirectTo: redirectTo === undefined ? true : redirectTo === true,
    showChat: showChat === undefined ? true : showChat === true,
    showLike: showLike === undefined ? true : showLike === true,
    showProductsCarousel:
      showProductsCarousel === undefined
        ? false
        : showProductsCarousel === true,
    showSidebarProducts:
      showSidebarProducts === undefined ? false : showSidebarProducts === true,
    showViewers: showViewers === undefined ? true : showViewers === true,
    time
  })

  const context: ActionCtx = {
    setting,
    setSetting
  }

  // console.log('context: ', context)

  return (
    <ActionsContext.Provider value={context}>
      {children}
    </ActionsContext.Provider>
  )
}