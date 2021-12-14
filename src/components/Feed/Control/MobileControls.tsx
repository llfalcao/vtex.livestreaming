/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'

import { getMobileOS } from '../../../utils'
import {
  Close,
  FullscreenExitIcon,
  FullscreenIcon,
  MutedIcon,
  PictureAndPictureAltIcon,
  PictureAndPictureIcon,
  ShareIcon,
  VerticalDots,
  VolumeOffIcon,
  VolumeUpIcon
} from '../../icons'
import { Like } from '../../'
import type { PlayerControls } from '../../../typings/MediaPlayer'

import styles from '../../../styles.module.css'
import { ChatCarousel } from '../../ChatCarousel/ChatCarousel'
import ShopIcon from './../../icons/ShopIcon'
import { useContext } from 'hoist-non-react-statics/node_modules/@types/react'
import { ActionsContext } from '../../../context'

export const MobileControls = (props: PlayerControls) => {
  const {
    BUFFERING,
    firstTimeMuted,
    fullScreen,
    handleFullScreenMobile,
    handleMute,
    handleMobileOptions,
    handleNothing,
    handlePictureAndPicture,
    handleVolume,
    muted,
    showOptions,
    status,
    overlay,
    pictureInPicture,
    videoEl,
    volume,
    progress,
    handleVideoProgress,
    handleOpenShare,
    isFinalized,
    transmitionType,
    setShowVariation
  } = props

  const { setting, setSetting } = useContext(ActionsContext)

  return (
    <div className={styles.playerVideoMobile}>
      <ChatCarousel
        transmitionType={transmitionType}
        setShowVariation={setShowVariation}
      />
      {firstTimeMuted ? (
        <div
          role='button'
          tabIndex={0}
          onClick={handleMute}
          onKeyDown={handleNothing}
          className={styles.playerVideoMobileMuted}
        >
          <MutedIcon size='100' viewBox='0 0 400 400' />
        </div>
      ) : (
        <Fragment />
      )}
      <Fragment>
        <div
          role='button'
          tabIndex={0}
          className={`${styles.playerVideoHover} ${styles.playerVideoMobileMuteButtonPosition}`}
          data-visible={
            status === BUFFERING || firstTimeMuted
              ? 'off'
              : overlay
              ? 'on'
              : 'off'
          }
        >
          <div className={styles.playerVideoMobileMuteButton}>
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={handleMute}
              onKeyDown={handleNothing}
            >
              {muted ? (
                <VolumeOffIcon size='40' viewBox='0 0 400 400' />
              ) : (
                <VolumeUpIcon size='40' viewBox='0 0 400 400' />
              )}
            </div>
            <input
              type='range'
              min='0'
              max='100'
              value={muted ? 0 : volume}
              className={styles.playerVolumeRange}
              onChange={handleVolume}
            />
          </div>
        </div>
        {isFinalized && (
          <div
            className={`${styles.playerVideoMobileProgressBarPosition} ${styles.playerVideoMobileProgressBarRangeStack}`}
          >
            <input
              type='range'
              min='0'
              max='100'
              value={progress}
              className={`${styles.playerVideoProgressBar} ${styles.playerVideoMobileProgressBar} ${styles.progressBarHeigth}`}
              onChange={handleVideoProgress}
            />
            <div
              style={{ width: `${progress}%` }}
              className={`${styles.percentProgressBar} ${styles.progressBarHeigth}`}
            />
            <div
              className={`${styles.noPercentProgressBar} ${styles.progressBarHeigth}`}
            />
          </div>
        )}
        <div
          role='button'
          tabIndex={0}
          className={styles.playerVideoMobileCarouselButtonPosition}
          onClick={() => {
            setSetting({
              ...setting,
              showChatCarousel: setting.showChatCarousel
            })
          }}
        >
          <ShopIcon size='25' viewBox='0 0 170 170' />
        </div>
        <div
          role='button'
          tabIndex={0}
          className={styles.playerVideoMobileLikeButtonPosition}
        >
          <Like isFinalized={isFinalized} />
        </div>
        <div
          className={styles.playerVideoMobileOptions}
          onClick={handleMobileOptions}
          onKeyDown={handleMobileOptions}
        >
          {showOptions ? (
            <Close size='42' viewBox='0 0 400 400' />
          ) : (
            <VerticalDots size='42' viewBox='0 0 400 400' />
          )}
          <div
            className={styles.playerVideoMobileOptionsContent}
            data-display={`${showOptions}`}
          >
            <div
              role='button'
              tabIndex={0}
              onClick={handleFullScreenMobile}
              onKeyDown={handleFullScreenMobile}
              className={styles.playerVideoMobileFullscreen}
            >
              {fullScreen ? (
                <FullscreenExitIcon size='40' viewBox='0 0 400 400' />
              ) : (
                <FullscreenIcon size='40' viewBox='0 0 400 400' />
              )}
            </div>
            <div
              role='button'
              tabIndex={0}
              onClick={() => handleOpenShare()}
              onKeyDown={() => handleOpenShare()}
              className={styles.playerMobileShare}
            >
              {fullScreen ? (
                <ShareIcon size='40' viewBox='0 0 400 400' />
              ) : (
                <ShareIcon size='40' viewBox='0 0 400 400' />
              )}
            </div>
            {!!videoEl?.current?.requestPictureInPicture && (
              <div
                role='button'
                tabIndex={0}
                onClick={handlePictureAndPicture}
                onKeyDown={handlePictureAndPicture}
                className={styles.playerVideoMobilePicture}
              >
                {!!videoEl?.current?.requestPictureInPicture &&
                getMobileOS() !== 'Android' ? (
                  pictureInPicture ? (
                    <PictureAndPictureIcon size='32' viewBox='0 0 400 400' />
                  ) : (
                    <PictureAndPictureAltIcon size='32' viewBox='0 0 400 400' />
                  )
                ) : null}
              </div>
            )}
          </div>
        </div>
      </Fragment>
    </div>
  )
}
