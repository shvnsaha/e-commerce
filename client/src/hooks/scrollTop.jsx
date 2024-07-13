import React, { useEffect } from 'react'

export default function ScrollTop() {
 useEffect(()=>{
  window.scrollTo(0,0)
 },[])
}