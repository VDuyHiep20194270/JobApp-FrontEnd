import '../styles/globals.css'
import AppContext from '@/components/AppContext'
import { useEffect, useState, useRouter } from 'react'
import Router from "next/router";

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  // const router = useRouter()
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  
  // useEffect(() => {
  //   let preToken = window.localStorage.getItem('token')
  //   let preRole = window.localStorage.getItem('role')
  //   if (preToken !== "") {
  //     setToken(preToken)
  //     console.log(Router.pathname);
  //     if (!Router.pathname.includes(preRole)) {
  //       Router.push(`/${preRole}`)
  //   }
  //   } else {
  //     setRole("");
  //     setToken("");
  //   }
  // }, [])
  
  return getLayout(
    <AppContext.Provider value={{ token, setToken, role, setRole }}>
      <Component {...pageProps} />
    </AppContext.Provider>
    
  )
}