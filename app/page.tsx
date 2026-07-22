'use client'

import { useState } from 'react'
import { Dashboard } from '@/components/dashboard/dashboard'
import { LoginPage } from '@/components/auth/login-page'

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />
  }

  return <Dashboard onLogout={() => setIsAuthenticated(false)} />
}
