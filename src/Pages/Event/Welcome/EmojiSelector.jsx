/**
 * src/components/EmojiSelector.jsx
 */


import React from 'react'


export const EmojiSelector = ({
  emojis,
  selected,
  selectEmoji
}) => {

  const emojiList = emojis.map((emojiArray, index) => {

    if (!emojiArray) {
      return <label key={index} />
    }

    const [ emoji, owners, disabled ] = emojiArray
    
    const checked = emoji === selected

    return (
      <label
        key={emoji}
        disabled={!!disabled}
      >
        <input
          type="radio"
          name="emoji"
          value={emoji}
          checked={checked}
          required
          onChange={selectEmoji}
        />
        <span>{emoji}</span>
      </label>
    )
  })


  return (
    <div className="emojis">
      {emojiList}
    </div>
  )
}