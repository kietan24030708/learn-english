import type { Level, Skill } from './types'
import { curriculum } from './curriculum'

export const levels: { code: Level; exam: string; label: string }[] = [
  { code: 'A1', exam: 'Pre A1 Starters', label: 'Nền tảng' },
  { code: 'A2', exam: 'A2 Key (KET)', label: 'Sơ cấp' },
  { code: 'B1', exam: 'B1 Preliminary', label: 'Trung cấp' },
  { code: 'B2', exam: 'B2 First (FCE)', label: 'Trung cao' },
  { code: 'C1', exam: 'C1 Advanced (CAE)', label: 'Nâng cao' },
  { code: 'C2', exam: 'C2 Proficiency', label: 'Thành thạo' },
]

export const lessons = curriculum.B2.lessons

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

export const examBlueprints: Record<Level, { name: string; duration: string; scale: string; parts: typeof examParts }> = {
  A1: { name:'A1 Movers', duration:'Khoảng 1 giờ', scale:'tối đa 15 shields', parts:[
    { skill:'Listening', icon:'◖', time:'25 phút', parts:'5 phần · 25 câu', color:'blue' },
    { skill:'Reading & Writing', icon:'¶', time:'30 phút', parts:'6 phần · 35 câu', color:'coral' },
    { skill:'Speaking', icon:'◉', time:'5–7 phút', parts:'4 phần · cá nhân', color:'teal' },
  ]},
  A2: { name:'A2 Key', duration:'Khoảng 2 giờ', scale:'120–139', parts:[
    { skill:'Reading', icon:'¶', time:'60 phút', parts:'7 phần · 32 câu', color:'coral' },
    { skill:'Writing', icon:'✎', time:'cùng Reading', parts:'2 phần · 2 bài', color:'amber' },
    { skill:'Listening', icon:'◖', time:'30 phút', parts:'5 phần · 25 câu', color:'blue' },
    { skill:'Speaking', icon:'◉', time:'8–10 phút', parts:'2 phần · theo cặp', color:'teal' },
  ]},
  B1: { name:'B1 Preliminary', duration:'Khoảng 2 giờ 20', scale:'140–159', parts:[
    { skill:'Reading', icon:'¶', time:'45 phút', parts:'6 phần · 32 câu', color:'coral' },
    { skill:'Writing', icon:'✎', time:'45 phút', parts:'2 phần · 2 bài', color:'amber' },
    { skill:'Listening', icon:'◖', time:'30 phút', parts:'4 phần · 25 câu', color:'blue' },
    { skill:'Speaking', icon:'◉', time:'12 phút', parts:'4 phần · theo cặp', color:'teal' },
  ]},
  B2: { name:'B2 First (FCE)', duration:'Khoảng 3 giờ 30', scale:'160–179', parts:examParts },
  C1: { name:'C1 Advanced (CAE)', duration:'Khoảng 4 giờ', scale:'180–199', parts:[
    { skill:'Reading & Use of English', icon:'¶', time:'90 phút', parts:'8 phần · 56 câu', color:'coral' },
    { skill:'Writing', icon:'✎', time:'90 phút', parts:'2 phần · 2 bài', color:'amber' },
    { skill:'Listening', icon:'◖', time:'40 phút', parts:'4 phần · 30 câu', color:'blue' },
    { skill:'Speaking', icon:'◉', time:'15 phút', parts:'4 phần · theo cặp', color:'teal' },
  ]},
  C2: { name:'C2 Proficiency (CPE)', duration:'Khoảng 4 giờ', scale:'200–230', parts:[
    { skill:'Reading & Use of English', icon:'¶', time:'90 phút', parts:'7 phần · 53 câu', color:'coral' },
    { skill:'Writing', icon:'✎', time:'90 phút', parts:'2 phần · 2 bài', color:'amber' },
    { skill:'Listening', icon:'◖', time:'40 phút', parts:'4 phần · 30 câu', color:'blue' },
    { skill:'Speaking', icon:'◉', time:'16 phút', parts:'3 phần · theo cặp', color:'teal' },
  ]},
}
