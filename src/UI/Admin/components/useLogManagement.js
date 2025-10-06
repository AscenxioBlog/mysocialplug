import { useState, useEffect } from 'react'
import API_URL from '../../../Config'

// Custom hook for managing logs API calls
function useLogManagement() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all logs
  const fetchLogs = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/logs`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs || [])
      } else {
        console.error('Failed to fetch logs')
      }
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch single log details
  const fetchLogDetails = async (logId) => {
    try {
      const response = await fetch(`${API_URL}/api/logs/${logId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        return data.log
      } else {
        alert('Failed to fetch log details')
        return null
      }
    } catch (error) {
      console.error('Error fetching log details:', error)
      alert('Error fetching log details')
      return null
    }
  }

  // Update log
  const updateLog = async (logId, updateData) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/logs/${logId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(updateData)
      })
      
      if (response.ok) {
        alert('Log updated successfully!')
        fetchLogs() // Refresh the list
        return true
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to update log')
        return false
      }
    } catch (error) {
      console.error('Error updating log:', error)
      alert('Error updating log')
      return false
    }
  }

  // Delete log
  const deleteLog = async (logId) => {
    if (!confirm('Are you sure you want to delete this log?')) return false
    
    try {
      const response = await fetch(`${API_URL}/api/admin/logs/${logId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      })
      
      if (response.ok) {
        alert('Log deleted successfully!')
        fetchLogs() // Refresh the list
        return true
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to delete log')
        return false
      }
    } catch (error) {
      console.error('Error deleting log:', error)
      alert('Error deleting log')
      return false
    }
  }

  // Create bulk logs
  const createBulkLogs = async (bulkData) => {
    try {
      const payload = {
        logName: bulkData.logName,
        description: bulkData.description,
        price: parseInt(bulkData.price),
        category: bulkData.category,
        accounts: bulkData.accounts
      }
      
      console.log('Sending payload:', payload)
      
      const response = await fetch(`${API_URL}/api/admin/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      
      if (response.ok) {
        alert(`Successfully created ${bulkData.accounts.length} products!`)
        fetchLogs()
        return bulkData.accounts.length
      } else {
        const errorData = await response.text()
        console.error('API Error:', response.status, errorData)
        alert('Failed to create products')
        return 0
      }
    } catch (error) {
      console.error('Error creating bulk products:', error)
      alert('Error creating products')
      return 0
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return {
    logs,
    loading,
    fetchLogs,
    fetchLogDetails,
    updateLog,
    deleteLog,
    createBulkLogs
  }
}

export default useLogManagement