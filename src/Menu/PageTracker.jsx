/**
 * src/Components/PageTracker.jsx
 * 
 * Creates a Section with links to the pages accessible by the
 * user.
 */


import React, { useContext } from 'react'
import { UserContext } from '../Contexts/';
import { useTranslation } from 'react-i18next';
import { Section } from './Section'


export const PageTracker = (props) => {
  const { t } = useTranslation()
  const { user, signOut } = useContext(UserContext)


  const connection = user
    ? { text: t("sign.out"),  type: "action", callback: signOut}
    : { text: t("connect"),   type: "link",   to: "/connection"     }

  const items = [
    // { text: t("home"),      type: "link",     to: "/"          },
    { text: t("play"),      type: "link",     to: "/play"      },
    { text: t("create"),    type: "link",     to: "/create"    },
    // { text: t("community"), type: "divider"},
    { text: "————", type: "divider"},
    connection,
    // { text: t("account"),   type: "link",     to: "/o/account" },
    // { text: "information", type: "divider"},
    // { text: "About",       type: "link",     to: "/about"     },
    // { text: "Contact",     type: "link",     to: "/contact"   },
    // { text: "Credits",     type: "link",     to: "/credits"   },
    // { text: "Insights",    type: "link",     to: "/details"   }
  ]

  const actions = {
    section: "pages",
    title: t("pages"),
    ...props, // { open, toggleOpen, page }
    items
  }
  
  return <Section {...actions} />
}