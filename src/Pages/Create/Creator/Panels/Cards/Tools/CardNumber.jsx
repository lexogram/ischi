/**
 * CardNumber.jsx
 */


import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';

import { CreatorContext } from '../../../../../../Contexts'

export const CardNumber = () => {
  const { t } = useTranslation()
  const { cardNumber, total } = useContext(CreatorContext)

  return (
    <h2>
      {t("card-number")} {cardNumber + 1}/{total}
    </h2>
  )
}