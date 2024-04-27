/**
 * src/Pages/Create/Creator/Footer/index.jsx
 */


import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutContext } from '../../../../Contexts'
import { UserContext } from '../../../../Contexts'
import { Button } from './Button'


export const Footer = (props) => {
  const navigate = useNavigate()
  const {
    activeTab,
    setActiveTab,
    setDialog
  } = useContext(LayoutContext)
  const { user } = useContext(UserContext)


  const showFile = () => {
    if (activeTab === "help") {
      setActiveTab("gallery")
    }

    setDialog("file")
  }


  const selectImages = () => {
    setActiveTab("gallery")
    setDialog("images")
  }


  const goToLogin = () => {
    navigate('/login')
  }


  const save = () => {

  }


  const print = () => {

  }


  const showSettings = () => {
    setActiveTab("cards")
    setDialog("layout")
  }


  return (
    <div className="footer">
      <div>
      <Button
          text="File..."
          role="file"
          action={showFile}
        />
        <Button
          text="Images..."
          role="images"
          action={selectImages}
        />
      </div>
      <div>
        { user
        ? <Button
            text="Save..."
            action={save}
          />
        : <Button
            className="primary"
            text="Sign In..."
            action={goToLogin}
          />
        }
        <Button
          text="Print..."
          action={print}
        />
      </div>
      <div>
        <Button
          text="Layout..."
          role="layout"
          action={showSettings}
        />
      </div>
    </div>
  )
}