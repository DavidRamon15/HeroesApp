import React from 'react'
import { AuthProvider } from './heroes/context'
import { AppRouter } from './router/AppRouter'

export const HeroesApp = () => {
  return (
    <>
    <AuthProvider>
      <AppRouter></AppRouter>
    </AuthProvider>
    </>
    
  )
}
