'use client'

import { useEffect, useState } from "react"



export default function Subjects() {
  const studentId = localStorage.getItem('studentId');
  const [state, setState] = useState<{
    subject: [],
    student: {}
  }>({
    subject: [],
    student: {}
  })

  useEffect(() => {
    fetch("http://localhost:5000/students/" + studentId)
    .then((response) => response.json())
    .then((data) => setState((prev) => ({...prev, student: data})))
  },[])
  
  return (
    <div className="ml-28 h-screen w-auto text-black p-4">
      <div className="flex flex-center flex-row">
        <h1 className="text-3xl font-semibold ">Subjects</h1>
      </div>

    </div>
  )
}