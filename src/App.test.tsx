import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { cambridgeSources, curriculum } from './curriculum'

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

  it('offers a complete A1 to C2 curriculum', () => {
    expect(Object.keys(curriculum)).toEqual(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
    expect(Object.values(curriculum).every(course => course.lessons.length === 4)).toBe(true)
    expect(Object.values(curriculum).flatMap(course => course.lessons)).toHaveLength(24)
    localStorage.setItem('cp-profile', JSON.stringify({ name: 'Minh', level: 'B2', goal: 'B2 First (FCE)', dailyMinutes: 30 }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Học tập' }))
    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
      expect(screen.getByRole('button', { name: new RegExp(`^${level}`) })).toBeInTheDocument()
    }
  })

  it('shows official Cambridge sources in the resource library', () => {
    expect(cambridgeSources).toHaveLength(15)
    localStorage.setItem('cp-profile', JSON.stringify({ name: 'Minh', level: 'B2', goal: 'B2 First (FCE)', dailyMinutes: 30 }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Tài liệu Cambridge' }))
    expect(screen.getByRole('heading', { name: 'Thư viện Cambridge' })).toBeInTheDocument()
    expect(screen.getByText('B2 First — Preparation & Handbook')).toBeInTheDocument()
  })
})
