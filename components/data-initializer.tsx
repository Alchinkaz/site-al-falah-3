"use client"

import { useEffect, useState } from 'react'
import { StorageAdapter } from '@/lib/storage-adapter'
import { DataMigration } from '@/lib/data-migration'

export default function DataInitializer() {
  const [status, setStatus] = useState<string>('Initializing...')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeData = async () => {
      try {
        setStatus('Checking data...')
        
        // Initialize the adapter
        await StorageAdapter.initialize()
        setStatus('Adapter initialized')
        
        // Check if we need to migrate
        const needsMigration = await DataMigration.checkMigrationStatus()
        if (needsMigration) {
          setStatus('Migrating data...')
          await DataMigration.migrateAllData()
          setStatus('Migration completed')
        } else {
          setStatus('Data already migrated')
        }
        
        // Seed default data if needed
        await DataMigration.seedDefaultData()
        
        setStatus('Initialization completed!')
        setIsInitialized(true)
      } catch (error) {
        console.error('Data initialization failed:', error)
        setStatus(`Error: ${error}`)
        setIsInitialized(true) // Still allow the app to continue
      }
    }

    initializeData()
  }, [])

  if (!isInitialized) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{status}</p>
        </div>
      </div>
    )
  }

  return null
}