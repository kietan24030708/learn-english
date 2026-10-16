import type { Lesson, Level, Skill } from './types'

export const levels: { code: Level; exam: string; label: string }[] = [
  { code: 'A1', exam: 'Pre A1 Starters', label: 'Nền tảng' },
  { code: 'A2', exam: 'A2 Key (KET)', label: 'Sơ cấp' },
  { code: 'B1', exam: 'B1 Preliminary', label: 'Trung cấp' },
  { code: 'B2', exam: 'B2 First (FCE)', label: 'Trung cao' },
  { code: 'C1', exam: 'C1 Advanced (CAE)', label: 'Nâng cao' },
  { code: 'C2', exam: 'C2 Proficiency', label: 'Thành thạo' },
]

export const lessons: Lesson[] = [
  { id: 1, type: 'Vocabulary', title: 'Work & ambition', subtitle: '18 từ vựng chủ đề sự nghiệp', duration: 12, level: 'B2', icon: 'Aa', color: 'amber' },
  { id: 2, type: 'Grammar', title: 'Mixed conditionals', subtitle: 'Giả định trong quá khứ và hiện tại', duration: 16, level: 'B2', icon: '⌁', color: 'teal' },
  { id: 3, type: 'Listening', title: 'A change of plan', subtitle: 'Multiple choice · Part 1', duration: 14, level: 'B2', icon: '◖', color: 'blue' },
  { id: 4, type: 'Reading', title: 'The future of cities', subtitle: 'Gapped text · Part 6', duration: 20, level: 'B2', icon: '¶', color: 'coral' },
  { id: 5, type: 'Speaking', title: 'Compare & speculate', subtitle: 'Speaking Part 2 practice', duration: 10, level: 'B2', icon: '◉', color: 'violet' },
]

export const skillScores: { skill: Skill; score: number; delta: number }[] = [
  { skill: 'Reading', score: 78, delta: 5 },
  { skill: 'Listening', score: 72, delta: 3 },
  { skill: 'Writing', score: 61, delta: 2 },
  { skill: 'Speaking', score: 69, delta: 4 },
]

export const words = [
  { word: 'meticulous', phonetic: '/məˈtɪkjələs/', meaning: 'tỉ mỉ, kỹ lưỡng', example: 'She is meticulous in preparing her reports.' },
  { word: 'compelling', phonetic: '/kəmˈpelɪŋ/', meaning: 'thuyết phục, hấp dẫn', example: 'He made a compelling argument for change.' },
  { word: 'allocate', phonetic: '/ˈæləkeɪt/', meaning: 'phân bổ', example: 'We need to allocate more time to revision.' },
]

export const examParts = [
  { skill: 'Reading & Use of English', icon: '¶', time: '75 phút', parts: '7 phần · 52 câu', color: 'coral' },
  { skill: 'Writing', icon: '✎', time: '80 phút', parts: '2 phần · 2 bài', color: 'amber' },
  { skill: 'Listening', icon: '◖', time: '40 phút', parts: '4 phần · 30 câu', color: 'blue' },
  { skill: 'Speaking', icon: '◉', time: '14 phút', parts: '4 phần · theo cặp', color: 'teal' },
]
