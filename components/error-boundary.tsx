"use client"

import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Niečo sa pokazilo</h2>
              <p className="text-gray-600 mb-6">Ospravedlňujeme sa za problémy. Skúste obnoviť stránku.</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#3182A9] text-white px-6 py-3 rounded-lg hover:bg-[#1A73E8] transition-colors"
              >
                Obnoviť stránku
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
