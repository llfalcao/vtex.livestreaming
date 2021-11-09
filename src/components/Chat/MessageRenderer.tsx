/* eslint-disable no-unused-vars */
import React from 'react'
import tinyColor from 'tinycolor2'

import type { Message } from '../../typings/livestreaming'
import styles from './chat.css'

interface ResponseMessage {
  username: string
  message: string
  isMobile?: boolean
}

function getDataMessage(
  msg: Message,
  isReponse?: boolean
): { msgQuestion: Message | null; responseAdmin: string | null } {
  let msgQuestion = null
  let responseAdmin = null

  if (!isReponse) return { msgQuestion, responseAdmin }

  if (
    /::question__{/.test(msg.data || '') &&
    /^response__/.test(msg.data || '')
  ) {
    const parserData = msg.data

    const [responseMsg, questionMsg] = parserData?.split('::') || [
      'none',
      'none'
    ]

    try {
      msgQuestion = JSON.parse(
        questionMsg.split('question__')[1].split('\\').join('')
      )
      responseAdmin = responseMsg.split('response__')[1]
    } catch (e) {
      msgQuestion = null
      responseAdmin = null
    }

    return { msgQuestion, responseAdmin }
  }

  return { msgQuestion: null, responseAdmin: null }
}

const ResponseMessage = ({ username, message, isMobile }: ResponseMessage) => {
  return !isMobile ? (
    <div className={styles.chatBubbleContainer}>
      <div className={styles.chatBubble}>
        <div className={styles.chatLayout}>
          <div className={styles.profileIcon}>
            <div
              className={styles.initialName}
              style={{ backgroundColor: 'black' }}
            >
              <span style={{ color: 'white' }}>{username.charAt(0)}</span>
            </div>
            <span className={`${styles.chatUser} t-mini`}>{username}</span>
          </div>
          <div className={styles.chatTextContainer}>
            <span className={`${styles.chatMessage} mv3`}>{message}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.chatBubbleContainer}>
      <div className={styles.chatBubble}>
        <span className={`${styles.chatMessage} mv3`}>
          <b>
            {username}
            {': '}
          </b>
          {message}
        </span>
      </div>
    </div>
  )
}

const messageRenderer = (chatFiltered: Message[]) => {
  const IS_DESKTOP = window.screen.width >= 1025

  const getUserName = (username?: string) => {
    const AnonymousText = 'Anonymous'

    if (!username) return AnonymousText

    return username.replace('Anonymous', AnonymousText)
  }

  return chatFiltered.map((value: Message, index: number) => {
    const isAdmin = value?.isAdmin
    const userName = getUserName(value?.username)
    const backgroundColor = `${value.color || '#000000'}66`

    const color = tinyColor(backgroundColor).isLight() ? '#323845' : '#fff'
    const dataResponse = getDataMessage(value, value?.responseAdmin)

    return IS_DESKTOP ? (
      <div key={index} className={styles.chatBubbleContainer}>
        <div
          className={`${styles.chatBubble} ${
            isAdmin && styles.chatBubbleAdmin
          }`}
        >
          <div className={styles.chatLayout}>
            {value?.responseAdmin && (
              <ResponseMessage
                username={dataResponse.msgQuestion?.username || getUserName()}
                message={dataResponse.msgQuestion?.data || ''}
                isMobile={!IS_DESKTOP}
              />
            )}
            <div className={styles.profileIcon}>
              <div className={styles.initialName} style={{ backgroundColor }}>
                <span style={{ color }}>{userName[0]}</span>
              </div>
              <span className={`${styles.chatUser} t-mini`}>{userName}</span>
            </div>
            <div className={styles.chatTextContainer}>
              <span className={`${styles.chatMessage} mv3`}>
                {value?.responseAdmin ? dataResponse.responseAdmin : value.data}
              </span>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div key={index} className={styles.chatBubbleContainer}>
        <div
          key={index}
          className={`${styles.chatBubble} ${
            isAdmin && styles.chatBubbleAdmin
          }`}
        >
          {value?.responseAdmin && (
            <ResponseMessage
              username={dataResponse.msgQuestion?.username || getUserName()}
              message={dataResponse.msgQuestion?.data || ''}
              isMobile={!IS_DESKTOP}
            />
          )}
          <span className={`${styles.chatMessage} mv3`}>
            <b>
              {userName}
              {': '}
            </b>
            {value?.responseAdmin ? dataResponse.responseAdmin : value.data}
          </span>
        </div>
      </div>
    )
  })
}

export default messageRenderer
