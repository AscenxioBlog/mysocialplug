import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import LogsTable from './components/LogsTable'
import LogsStats from './components/LogsStats'
import SearchFilters from './components/SearchFilters'
import AddLogModal from './components/AddLogModal'
import EditLogModal from './components/EditLogModal'
import ViewLogModal from './components/ViewLogModal'
import useLogManagement from './components/useLogManagement'

function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedLog, setSelectedLog] = useState(null)
  const [creating, setCreating] = useState(false)
  
  const [updateForm, setUpdateForm] = useState({
    logName: '',
    description: '',
    price: '',
    username: '',
    password: '',
    category: ''
  })
  
  const [bulkForm, setBulkForm] = useState({
    logName: '',
    description: '',
    price: '',
    category: '',
    accounts: [{
      username: '',
      email: '',
      password: '',
      twoFA: '',
      mailPassword: ''
    }]
  })

  const { logs, loading, fetchLogDetails, updateLog, deleteLog, createBulkLogs } = useLogManagement()

  console.log('Log data:', logs) // Add this in your component to see the actual data structure

  // Filter logs based on search and category
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.logName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.category?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = platformFilter === 'all' || log.category === platformFilter
    return matchesSearch && matchesPlatform
  })

  // Handle view log details
  const handleViewLog = async (logId) => {
    const logDetails = await fetchLogDetails(logId)
    if (logDetails) {
      setSelectedLog(logDetails)
      setShowViewModal(true)
    }

  }

  // Handle edit log
  const handleEditLog = (log) => {
    setSelectedLog(log)
    setUpdateForm({
      logName: log.logName || '',
      description: log.description || '',
      price: log.price || '',
      username: log.username || '',
      password: log.password || '',
      category: log.category || ''
    })
    setShowUpdateModal(true)
  }

  // Handle update log submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    const success = await updateLog(selectedLog._id, updateForm)
    if (success) {
      setShowUpdateModal(false)
    }
  }

  // Handle bulk create submit
  const handleBulkSubmit = async (e) => {
    e.preventDefault()
    setCreating(true)
    try {
      const successCount = await createBulkLogs(bulkForm)
      if (successCount > 0) {
        // Clear form for next product
        setBulkForm({
          logName: '',
          description: '',
          price: '',
          category: '',
          accounts: [{
            username: '',
            email: '',
            password: '',
            twoFA: '',
            mailPassword: ''
          }]
        })
        setShowAddModal(false)
      }
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search and Filters */}
      <SearchFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
      />

      {/* Logs Table */}
      <LogsTable 
        logs={filteredLogs}
        loading={loading}
        onView={handleViewLog}
        onEdit={handleEditLog}
        onDelete={deleteLog}
      />

      {/* Statistics */}
      <LogsStats logs={logs} />

      {/* Modals */}
      <AddLogModal 
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        bulkForm={bulkForm}
        setBulkForm={setBulkForm}
        onSubmit={handleBulkSubmit}
        creating={creating}
      />

      <EditLogModal 
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        updateForm={updateForm}
        setUpdateForm={setUpdateForm}
        onSubmit={handleUpdateSubmit}
      />

      <ViewLogModal 
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        log={selectedLog}
      />
    </div>
  )
}

export default ProductManagement