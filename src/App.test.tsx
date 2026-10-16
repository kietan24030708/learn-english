import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('Cambridge Path', () => {
  beforeEach(() => localStorage.clear())

  it('starts with onboarding and enters the demo dashboard', () => {
    render(<App />)
    expect(screen.getByText('Tiếng Anh của bạn.')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Khám phá bản demo'))
    expect(screen.getByText(/Chào buổi sáng, Minh/)).toBeInTheDocument()
    expect(screen.getAllByText('Mixed conditionals')).toHaveLength(2)
  })

  it('opens a lesson and validates the correct answer', () => {
    localStorage.setItem('cp-profile', JSON.stringify({ name: 'Minh', level: 'B2', goal: 'B2 First (FCE)', dailyMinutes: 30 }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Học tiếp/ }))
    fireEvent.click(screen.getByText('had accepted / would be'))
    fireEvent.click(screen.getByText('Kiểm tra đáp án'))
    expect(screen.getByText('Chính xác!')).toBeInTheDocument()
  })
})
