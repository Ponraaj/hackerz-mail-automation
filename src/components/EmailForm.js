'use client'
import { useState } from "react"

const EmailForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/send-email', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: ["ponraajvetrivel@gmail.com", "goldking0520@gmail.com"], data: "Test Message" })
      })

      const result = await response.json()
      alert(result.message)
    } catch (error) {
      console.log("Error: ", error)
    }
  }
}


