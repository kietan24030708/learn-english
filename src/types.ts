export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type View = 'home' | 'learn' | 'exam' | 'review' | 'resources' | 'insights'
export type Skill = 'Reading' | 'Listening' | 'Writing' | 'Speaking'

export interface Profile {
  name: string
  level: Level
  goal: string
  dailyMinutes: number
}

export interface Lesson {
  id: number
  type: 'Vocabulary' | 'Grammar' | 'Listening' | 'Reading' | 'Writing' | 'Speaking'
  title: string
  subtitle: string
  duration: number
  level: Level
  icon: string
  color: string
  completed?: boolean
  objective?: string
  sourceIds?: string[]
  question?: LessonQuestion
}

export interface LessonQuestion {
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

export interface CambridgeSource {
  id: string
  title: string
  level: Level | 'A1–A2' | 'B1–B2' | 'C1–C2'
  category: 'Handbook' | 'Coursebook' | 'Practice' | 'Grammar' | 'Activities'
  description: string
  url: string
  access: 'Miễn phí' | 'Thương mại'
}

export interface CurriculumLevel {
  level: Level
  title: string
  exam: string
  canDo: string
  unitTitle: string
  unitDescription: string
  lessons: Lesson[]
}

export interface Progress {
  xp: number
  streak: number
  completedLessonIds: number[]
  wordsReviewed: number
  examScores: number[]
}
