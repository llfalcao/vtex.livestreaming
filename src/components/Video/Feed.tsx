import React, { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../typings/livestreaming'

import { StreamPlayer } from './StreamPlayer'

type FeedProps = {
  streamUrl: string | undefined
  infoSocket: InfoSocket
  collectionId: string | undefined
  pdp: boolean
  originOfProducts: string
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
}

export const Feed = ({
  streamUrl,
  infoSocket,
  collectionId,
  pdp,
  originOfProducts,
  setShowVariation
}: FeedProps) => {
  const { IVSPlayer } = window
  const { isPlayerSupported, MediaPlayer } = IVSPlayer

  const player: typeof MediaPlayer = useRef(null)

  const [playerCurrent, setPlayerCurrent] = useState(false)

  useEffect(() => {
    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState
    const { ERROR } = IVSPlayer.PlayerEventType

    if (!isPlayerSupported) {
      console.warn(
        'The current browser does not support the Amazon IVS player.'
      )

      return
    }

    const onStateChange = () => {}

    const onError = (err: Error) => {
      console.warn('Player Event - ERROR:', err.message)
      setTimeout(() => {
        setPlayerCurrent(false)
        setPlayerCurrent(true)
      }, 5000)
    }

    player.current = IVSPlayer.create()

    player.current.addEventListener(READY, onStateChange)
    player.current.addEventListener(PLAYING, onStateChange)
    player.current.addEventListener(ENDED, onStateChange)
    player.current.addEventListener(ERROR, onError)

    setPlayerCurrent(true)

    return () => {
      player.current.removeEventListener(READY, onStateChange)
      player.current.removeEventListener(PLAYING, onStateChange)
      player.current.removeEventListener(ENDED, onStateChange)
      player.current.removeEventListener(ERROR, onError)
    }
  }, [IVSPlayer, isPlayerSupported, streamUrl])

  if (!isPlayerSupported) {
    return null
  }

  return playerCurrent ? (
    <StreamPlayer
      player={player.current}
      streamUrl={streamUrl}
      infoSocket={infoSocket}
      collectionId={collectionId}
      pdp={pdp}
      originOfProducts={originOfProducts}
      setShowVariation={setShowVariation}
    />
  ) : null
}
