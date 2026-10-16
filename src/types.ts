export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type View = 'home' | 'learn' | 'exam' | 'review' | 'insights'
export type Skill = 'Reading' | 'Listening' | 'Writing' | 'Speaking'

export interface Profile {
  name: string
  level: Level
  goal: string
  dailyMinutes: number
}

export interface Lesson {
  id: number
  type: 'Vocabulary' | 'Grammar' | 'Listening' | 'Reading' | 'Speaking'
  title: string
  subtitle: string
  duration: number
  level: Level
  icon: string
  color: string
  completed?: boolean
}

export interface Progress {
  xp: number
  streak: number
  completedLessonIds: number[]
  wordsReviewed: number
  examScores: number[]
}
