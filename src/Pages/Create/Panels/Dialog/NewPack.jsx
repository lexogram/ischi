/**
 * src/Pages/Create/Panels/Dialog/NewPack.jsx
 */


import React, {
  useContext,
  useState,
  useEffect,
  useRef
} from 'react'
import { CreatorContext } from '../../../../Contexts';
import { SizeChooser } from '../../../../Components/SizeChooser';
import { useTranslation, Trans } from 'react-i18next';
import { Images } from './Images';




export const NewPack = () => {
  const { t } = useTranslation()
  const {
    getImagesTotal,
    packs,
    setDialog
  } = useContext(CreatorContext)

  const { names } = packs

  const getUniqueName = () => {
    const seed = t("new.untitled")

    let unique = seed
    let counter = 0
    while (names.indexOf(unique) > -1){
      counter += 1
      unique = `${seed} ${counter}`
    }

    unique = unique[0].toUpperCase() + unique.slice(1)
  
    return unique
  }

  const [ packName, setPackName ] = useState(getUniqueName)
  const [ count, setCount ] = useState(6)
  const nameRef = useRef()


  const refreshPackName = ({ target }) => {
    setPackName(target.value)
  }


  const total = getImagesTotal(count)


  const createNewPack = () => {
    const dialog = {
      component: Images,
      packName,
      count,
      total
    }
    setDialog(dialog)
  }


  const disabled = names.indexOf(packName.toLowerCase()) > -1


  const selectName = () => {
    nameRef.current.select()
  }

  useEffect(selectName, [])
  

  return (
    <form className="new-pack">
      <h1>{t("new.title")}</h1>
      <label>
        <p>{t("new.name")}</p>
        <input
          ref={nameRef}
          type="text"
          name="name"
          value={packName}
          placeholder={t("new.name-placeholder")}
          onChange={refreshPackName}
          required
          autoFocus
        />
      </label>
      <SizeChooser 
        imagesPerCard={count}
        setImagesPerCard={setCount}
        adviceOnly={true}
        total={total}
      />
      <button
        className="primary"
        onClick={createNewPack}
        disabled={disabled}
      >
        {<Trans
          i18nKey="new.import-images"
          values={{ total }}
          defaults="Import {{total}} images"
        />}
      </button>
    </form>
  )
}