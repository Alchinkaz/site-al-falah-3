"use client"

import { useEffect, useState } from 'react'
import { StorageAdapter } from '@/lib/storage-adapter'
import { DataMigration } from '@/lib/data-migration'

export default function MigrationTest() {
  const [status, setStatus] = useState<string>('Initializing...')
  const [projects, setProjects] = useState<any[]>([])
  const [homepageData, setHomepageData] = useState<any>(null)

  useEffect(() => {
    const runMigrationTest = async () => {
      try {
        setStatus('Checking migration status...')
        
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
        
        // Test data retrieval
        setStatus('Testing data retrieval...')
        const testProjects = await StorageAdapter.getAllProjects()
        setProjects(testProjects)
        
        const testHomepageData = await StorageAdapter.getHomepageData()
        setHomepageData(testHomepageData)
        
        setStatus('Test completed successfully!')
      } catch (error) {
        console.error('Migration test failed:', error)
        setStatus(`Error: ${error}`)
      }
    }

    runMigrationTest()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Migration Test</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Status:</h2>
        <p className="text-gray-700">{status}</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Projects ({projects.length}):</h2>
        <div className="grid gap-2">
          {projects.map(project => (
            <div key={project.id} className="p-3 border rounded">
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <p className="text-xs text-gray-500">Published: {project.published ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Homepage Data:</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
          {JSON.stringify(homepageData, null, 2)}
        </pre>
      </div>
    </div>
  )
}
