import { useState, useEffect } from 'react'

export const useSupportModal = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Show modal on page refresh/load
    const hasSeenModal = sessionStorage.getItem('supportModalShown')
    if (!hasSeenModal) {
      setShowModal(true)
      sessionStorage.setItem('supportModalShown', 'true')
    }
  }, [])

  const closeModal = () => {
    setShowModal(false)
  }

  const triggerModal = () => {
    setShowModal(true)
  }

  return { showModal, closeModal, triggerModal }
}