import { useEffect, useMemo, useState } from 'react'
import { examBlueprints, examParts, levels, skillScores, words } from './data'
import { cambridgeSources, curriculum } from './curriculum'
import type { Lesson, Level, Profile, Progress, View } from './types'

const initialProgress: Progress = { xp: 1240, streak: 12, completedLessonIds: [], wordsReviewed: 42, examScores: [68, 71, 74] }

function Icon({ name }: { name: string }) {
  const icons: Record<string, string> = { home: '⌂', learn: '◇', exam: '▤', review: '↻', resources: '☷', insights: '⌁', sun: '☼', bell: '♧', arrow: '→', check: '✓', lock: '⌑', play: '▶' }
  return <span aria-hidden="true" className="ui-icon">{icons[name] ?? name}</span>
}

function Onboarding({ onFinish }: { onFinish: (profile: Profile) => void }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [level, setLevel] = useState<Level>('B2')
  const [goal, setGoal] = useState('B2 First (FCE)')
  const [dailyMinutes, setDailyMinutes] = useState(30)
  return (
    <main className="onboarding">
      <section className="onboard-panel">
        <div className="brand brand-dark"><span className="brand-mark">C</span><span>Cambridge <b>Path</b></span></div>
        <div className="step-indicator" aria-label={`Bước ${step} trên 3`}><span className={step >= 1 ? 'active' : ''}/><span className={step >= 2 ? 'active' : ''}/><span className={step >= 3 ? 'active' : ''}/></div>
        {step === 1 && <div className="onboard-content fade-in">
          <p className="eyebrow">BẮT ĐẦU HÀNH TRÌNH</p>
          <h1>Tiếng Anh của bạn.<br/><em>Lộ trình của bạn.</em></h1>
          <p className="lead">Một kế hoạch học cá nhân hóa theo chuẩn CEFR, giúp bạn tiến bộ mỗi ngày và sẵn sàng cho kỳ thi Cambridge.</p>
          <label className="field-label" htmlFor="name">Mình nên gọi bạn là gì?</label>
          <input id="name" name="name" autoComplete="name" autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="Tên của bạn" />
          <button className="primary-btn full" onClick={() => setStep(2)}>Tiếp tục <Icon name="arrow" /></button>
          <button className="text-btn" onClick={() => onFinish({ name: 'Minh', level: 'B2', goal: 'B2 First (FCE)', dailyMinutes: 30 })}>Khám phá bản demo</button>
        </div>}
        {step === 2 && <div className="onboard-content fade-in">
          <p className="eyebrow">TRÌNH ĐỘ HIỆN TẠI</p><h1>Bạn đang ở đâu<br/>trên <em>hành trình?</em></h1>
          <div className="level-grid">{levels.map(item => <button key={item.code} className={`level-option ${level === item.code ? 'selected' : ''}`} onClick={() => { setLevel(item.code); setGoal(item.exam) }}><b>{item.code}</b><span>{item.label}</span></button>)}</div>
          <button className="primary-btn full" onClick={() => setStep(3)}>Tiếp tục <Icon name="arrow" /></button>
          <button className="text-btn" onClick={() => setStep(1)}>Quay lại</button>
        </div>}
        {step === 3 && <div className="onboard-content fade-in">
          <p className="eyebrow">MỤC TIÊU CỦA BẠN</p><h1>Biến mục tiêu thành<br/><em>thói quen nhỏ.</em></h1>
          <label className="field-label" htmlFor="goal">Chứng chỉ hướng tới</label>
          <select id="goal" value={goal} onChange={e => setGoal(e.target.value)}>{levels.map(l => <option key={l.code}>{l.exam}</option>)}</select>
          <p className="field-label">Thời gian học mỗi ngày</p>
          <div className="minute-options">{[15,30,45,60].map(m => <button key={m} className={dailyMinutes === m ? 'selected' : ''} onClick={() => setDailyMinutes(m)}><b>{m}</b><span>phút</span></button>)}</div>
          <button className="primary-btn full" onClick={() => onFinish({ name: name.trim() || 'Bạn', level, goal, dailyMinutes })}>Tạo lộ trình <Icon name="arrow" /></button>
          <button className="text-btn" onClick={() => setStep(2)}>Quay lại</button>
        </div>}
      </section>
      <aside className="onboard-art" aria-hidden="true"><div className="quote-mark">“</div><blockquote>Language is the road map of a culture.</blockquote><p>— Rita Mae Brown</p><div className="book-stack"><div/><div/><div/></div></aside>
    </main>
  )
}

function Sidebar({ view, setView, profile }: { view: View; setView: (v: View) => void; profile: Profile }) {
  const nav: { id: View; label: string; icon: string }[] = [
    { id: 'home', label: 'Tổng quan', icon: 'home' }, { id: 'learn', label: 'Học tập', icon: 'learn' },
    { id: 'exam', label: 'Luyện thi', icon: 'exam' }, { id: 'review', label: 'Ôn từ vựng', icon: 'review' },
    { id: 'resources', label: 'Tài liệu Cambridge', icon: 'resources' }, { id: 'insights', label: 'Tiến độ', icon: 'insights' },
  ]
  return <aside className="sidebar">
    <div className="brand"><span className="brand-mark">C</span><span>Cambridge <b>Path</b></span></div>
    <nav>{nav.map(item => <button key={item.id} onClick={() => setView(item.id)} className={view === item.id ? 'active' : ''}><Icon name={item.icon}/><span>{item.label}</span>{item.id === 'review' && <i>12</i>}</button>)}</nav>
    <div className="sidebar-goal"><p>MỤC TIÊU HIỆN TẠI</p><strong>{profile.goal}</strong><div className="mini-progress"><span style={{ width: '62%' }}/></div><small>62% lộ trình</small></div>
    <button className="profile-card"><span className="avatar">{profile.name.charAt(0).toUpperCase()}</span><span><b>{profile.name}</b><small>{profile.level} learner</small></span><span>•••</span></button>
  </aside>
}

function Topbar({ progress, dark, setDark }: { progress: Progress; dark: boolean; setDark: (v:boolean)=>void }) {
  return <header className="topbar"><div className="mobile-brand brand"><span className="brand-mark">C</span><b>Cambridge Path</b></div><div className="top-stats"><span className="streak">◆ <b>{progress.streak}</b> ngày</span><span className="xp">✦ <b>{progress.xp.toLocaleString()}</b> XP</span></div><div className="top-actions"><button aria-label="Đổi giao diện" onClick={() => setDark(!dark)}><Icon name="sun"/></button><button aria-label="Thông báo"><Icon name="bell"/><i/></button></div></header>
}

function Dashboard({ profile, progress, startLesson }: { profile: Profile; progress: Progress; startLesson: (l: Lesson)=>void }) {
  const completedToday = progress.completedLessonIds.length
  const currentLessons = curriculum[profile.level].lessons
  const recommended = currentLessons[1] ?? currentLessons[0]
  return <div className="page fade-in">
    <section className="greeting"><div><p className="eyebrow">LỘ TRÌNH {profile.level} · CAMBRIDGE</p><h1>Chào buổi sáng, {profile.name} <span>✦</span></h1><p>Mỗi bài học hôm nay là một bước gần hơn tới {profile.goal}.</p></div><div className="daily-ring"><div><b>{completedToday}</b><span>/ 3</span></div><p>Mục tiêu ngày</p></div></section>
    <section className="continue-card"><div className="continue-copy"><span className="pill">TIẾP TỤC HỌC · {profile.level}</span><h2>{recommended.title}</h2><p>{recommended.subtitle}</p><div className="lesson-progress"><span><i style={{ width: '68%' }}/></span><b>68%</b></div><button className="cream-btn" onClick={() => startLesson(recommended)}><Icon name="play"/> Học tiếp · {recommended.duration} phút</button></div><div className="grammar-art" aria-hidden="true"><span>{profile.level}</span><div>{curriculum[profile.level].exam}</div><div>CEFR path</div></div></section>
    <div className="section-head"><div><p className="eyebrow">KẾ HOẠCH CỦA BẠN</p><h2>Hôm nay học gì?</h2></div><button>Xem tất cả <Icon name="arrow"/></button></div>
    <section className="lesson-list">{currentLessons.slice(0,3).map((l,i) => <article key={l.id} className="lesson-row"><div className={`lesson-icon ${l.color}`}>{l.icon}</div><div className="lesson-info"><span>{l.type.toUpperCase()} · {l.duration} PHÚT</span><h3>{l.title}</h3><p>{l.subtitle}</p></div><div className="lesson-status">{progress.completedLessonIds.includes(l.id) ? <span className="done"><Icon name="check"/></span> : <button aria-label={`Bắt đầu ${l.title}`} onClick={() => startLesson(l)}>{i === 0 ? <Icon name="play"/> : <Icon name="arrow"/>}</button>}</div></article>)}</section>
    <section className="bottom-grid"><article className="weekly-card"><div className="section-head compact"><div><p className="eyebrow">NHỊP ĐỘ HỌC</p><h2>Tuần này</h2></div><b>4/5 ngày</b></div><div className="week-bars">{[65,90,42,100,76,16,16].map((h,i)=><div key={i}><span className={i === 4 ? 'today' : ''} style={{height:`${h}%`}}/><small>{['T2','T3','T4','T5','T6','T7','CN'][i]}</small></div>)}</div></article><article className="tip-card"><span>✦</span><p className="eyebrow">MỤC TIÊU {profile.level}</p><h3>{curriculum[profile.level].canDo}</h3><p>Nội dung nguyên bản, bám theo handbook và dạng bài Cambridge chính thức.</p><button>Tìm hiểu nguồn <Icon name="arrow"/></button></article></section>
  </div>
}

function LearnView({ profile, progress, startLesson }: { profile: Profile; progress: Progress; startLesson:(l:Lesson)=>void }) {
  const [selectedLevel,setSelectedLevel]=useState<Level>(profile.level)
  const [skill,setSkill]=useState('Tất cả')
  const course=curriculum[selectedLevel]
  const skillMap: Record<string,string>={ 'Từ vựng':'Vocabulary','Ngữ pháp':'Grammar','Nghe':'Listening','Đọc':'Reading','Viết':'Writing','Nói':'Speaking' }
  const shown=skill==='Tất cả'?course.lessons:course.lessons.filter(l=>l.type===skillMap[skill])
  const complete=course.lessons.filter(l=>progress.completedLessonIds.includes(l.id)).length
  return <div className="page fade-in"><div className="page-title"><div><p className="eyebrow">CURRICULUM A1–C2</p><h1>Học tập</h1><p>{course.canDo}</p></div><div className="level-badge">{selectedLevel} <span>{course.title}</span></div></div>
    <div className="level-switcher" aria-label="Chọn trình độ">{levels.map(l=><button key={l.code} aria-label={`${l.code} ${l.label}`} className={selectedLevel===l.code?'active':''} onClick={()=>setSelectedLevel(l.code)}><b>{l.code}</b><span>{l.label}</span></button>)}</div>
    <div className="filter-row">{['Tất cả','Từ vựng','Ngữ pháp','Nghe','Đọc','Viết','Nói'].map(item=><button key={item} className={skill===item?'active':''} onClick={()=>setSkill(item)}>{item}</button>)}</div>
    <section className="course-section"><div className="course-heading"><span>{selectedLevel}</span><div><p className="eyebrow">{course.exam.toUpperCase()}</p><h2>{course.unitTitle}</h2><p>{course.unitDescription}</p></div><div className="unit-progress"><b>{complete}/{course.lessons.length}</b><span>hoàn thành</span></div></div><div className="course-grid">{shown.map(l=><article className="course-card" key={l.id}><div className={`lesson-icon ${l.color}`}>{l.icon}</div><span className="type">{l.type} · {l.duration} phút</span><h3>{l.title}</h3><p>{l.subtitle}</p><small className="source-count">◆ {l.sourceIds?.length ?? 0} nguồn Cambridge</small><button onClick={()=>startLesson(l)}>{progress.completedLessonIds.includes(l.id)?'Học lại':'Bắt đầu'} <Icon name="arrow"/></button></article>)}</div>{shown.length===0&&<div className="empty-state"><b>Chưa có bài phù hợp bộ lọc</b><p>Chọn “Tất cả” để xem curriculum của trình độ này.</p></div>}</section>
  </div>
}

function ExamView({ profile, onMock }: { profile:Profile; onMock:()=>void }) {
  const blueprint=examBlueprints[profile.level]
  return <div className="page fade-in"><div className="page-title"><div><p className="eyebrow">{profile.level} · {blueprint.name.toUpperCase()}</p><h1>Phòng luyện thi</h1><p>Làm quen cấu trúc đề và luyện chiến thuật phân bổ thời gian.</p></div><button className="outline-btn">⌁ Cambridge Scale {blueprint.scale}</button></div>
    <section className="mock-banner"><div><span className="pill">FULL MOCK TEST · {profile.level}</span><h2>Mô phỏng kỳ thi thực tế</h2><p>{blueprint.name} kéo dài {blueprint.duration.toLowerCase()}. Các phần luyện bám theo format chính thức và có phản hồi chi tiết.</p><button className="cream-btn" onClick={onMock}><Icon name="play"/> Bắt đầu thi thử</button></div><div className="score-dial"><span>Trình độ</span><b>{profile.level}</b><small>{blueprint.scale}</small></div></section>
    <div className="section-head"><div><p className="eyebrow">LUYỆN THEO KỸ NĂNG</p><h2>Cấu trúc {blueprint.name}</h2></div></div><section className="exam-grid">{blueprint.parts.map((p,i)=><article className="exam-card" key={p.skill}><div className={`lesson-icon ${p.color}`}>{p.icon}</div><span className="part-number">0{i+1}</span><h3>{p.skill}</h3><p>{p.parts}</p><div><span>◷ {p.time}</span><button aria-label={`Luyện ${p.skill}`} onClick={onMock}><Icon name="arrow"/></button></div></article>)}</section>
    <section className="exam-history"><div><p className="eyebrow">KẾT QUẢ GẦN ĐÂY</p><h2>Đà tiến bộ</h2></div><div className="score-history"><span>Mock test #3</span><b>74%</b><em>+6%</em></div><div className="score-history"><span>Reading practice</span><b>78%</b><em>+5%</em></div></section>
  </div>
}

function ReviewView({ progress, onReview }: { progress: Progress; onReview:()=>void }) {
  const [flipped,setFlipped]=useState(false); const [index,setIndex]=useState(0); const word=words[index]
  return <div className="page review-page fade-in"><div className="page-title"><div><p className="eyebrow">SPACED REPETITION</p><h1>Ôn từ vựng</h1><p>12 từ đang chờ bạn ôn hôm nay.</p></div><div className="review-count"><b>{progress.wordsReviewed}</b><span>từ đã nhớ tuần này</span></div></div>
    <section className={`flashcard ${flipped?'flipped':''}`} onClick={()=>setFlipped(!flipped)} tabIndex={0} role="button" onKeyDown={e=>e.key==='Enter'&&setFlipped(!flipped)}><span className="word-label">B2 · ADJECTIVE</span><button aria-label="Phát âm" onClick={e=>e.stopPropagation()}>◖</button><div className="flash-main"><h2>{flipped?word.meaning:word.word}</h2><p>{flipped?word.example:word.phonetic}</p></div><small>{flipped?'Nhấn để xem từ':'Nhấn vào thẻ để xem nghĩa'}</small></section>
    <div className="review-actions"><button className="again" onClick={()=>setFlipped(false)}>↻<span>Chưa nhớ<small>Ôn lại sau 1 phút</small></span></button><button className="good" onClick={()=>{onReview();setIndex((index+1)%words.length);setFlipped(false)}}>✓<span>Đã nhớ<small>Ôn lại sau 4 ngày</small></span></button></div>
    <div className="deck-progress"><span><i style={{width:`${((index+1)/12)*100}%`}}/></span><p>{index+1} / 12 từ</p></div>
  </div>
}

function ResourcesView({ profile }: { profile: Profile }) {
  const [selectedLevel,setSelectedLevel]=useState<Level>(profile.level)
  const matches=(sourceLevel:string,level:Level)=>sourceLevel===level || (sourceLevel==='A1–A2'&&['A1','A2'].includes(level)) || (sourceLevel==='B1–B2'&&['B1','B2'].includes(level)) || (sourceLevel==='C1–C2'&&['C1','C2'].includes(level))
  const sources=cambridgeSources.filter(source=>matches(source.level,selectedLevel))
  return <div className="page fade-in resources-page">
    <div className="page-title"><div><p className="eyebrow">NGUỒN CHÍNH THỨC · CAMBRIDGE</p><h1>Thư viện Cambridge</h1><p>Handbook, wordlist, sample test và giáo trình được đối chiếu cho từng bài học.</p></div><div className="source-total"><b>{cambridgeSources.length}</b><span>nguồn đã thẩm định</span></div></div>
    <div className="copyright-note"><span>ⓘ</span><p><b>Cách sử dụng nguồn</b>Nội dung bài học trong ứng dụng được biên soạn nguyên bản theo mục tiêu và dạng bài Cambridge. Sách thương mại chỉ được giới thiệu và liên kết, không sao chép nội dung.</p></div>
    <div className="level-switcher compact" aria-label="Lọc nguồn theo trình độ">{levels.map(l=><button key={l.code} aria-label={`${l.code} resources`} className={selectedLevel===l.code?'active':''} onClick={()=>setSelectedLevel(l.code)}><b>{l.code}</b><span>{l.label}</span></button>)}</div>
    <div className="source-summary"><div><p className="eyebrow">ĐANG XEM</p><h2>{selectedLevel} · {curriculum[selectedLevel].exam}</h2></div><p>{curriculum[selectedLevel].canDo}</p></div>
    <section className="sources-grid">{sources.map(source=><article className="source-card" key={source.id}><div className="source-top"><span className={`source-category ${source.category.toLowerCase()}`}>{source.category}</span><em>{source.access}</em></div><h3>{source.title}</h3><p>{source.description}</p><div><span>{source.level}</span><a href={source.url} target="_blank" rel="noreferrer" aria-label={`Mở nguồn ${source.title}`}>Mở nguồn chính thức <Icon name="arrow"/></a></div></article>)}</section>
  </div>
}

function InsightsView({ profile, progress }: { profile: Profile; progress:Progress }) {
  return <div className="page fade-in"><div className="page-title"><div><p className="eyebrow">BÁO CÁO HỌC TẬP</p><h1>Tiến độ của bạn</h1><p>Nhìn lại những bước tiến và tập trung đúng điểm cần cải thiện.</p></div><select aria-label="Khoảng thời gian"><option>4 tuần gần đây</option><option>Tuần này</option></select></div>
    <section className="stat-grid"><article><span>✦</span><div><b>{progress.xp.toLocaleString()}</b><p>XP tích lũy</p></div><em>+18%</em></article><article><span>◆</span><div><b>{progress.streak} ngày</b><p>Chuỗi dài nhất</p></div><em>Kỷ lục!</em></article><article><span>◷</span><div><b>8.4 giờ</b><p>Thời gian học</p></div><em>+1.2h</em></article></section>
    <section className="skills-panel"><div className="section-head"><div><p className="eyebrow">NĂNG LỰC HIỆN TẠI</p><h2>4 kỹ năng</h2></div><div className="scale">Cambridge Scale <b>168</b></div></div><div className="skills-list">{skillScores.map(s=><div key={s.skill}><span>{s.skill}</span><div><i style={{width:`${s.score}%`}}/></div><b>{s.score}%</b><em>↑ {s.delta}</em></div>)}</div></section>
    <section className="roadmap"><div><p className="eyebrow">LỘ TRÌNH CEFR</p><h2>Từ {profile.level} đến C1</h2></div><div className="road-line">{levels.map((l,i)=><div key={l.code} className={i<4?'passed':i===4?'current':''}><span>{i<4?'✓':i===4?'●':'○'}</span><b>{l.code}</b><small>{l.label}</small></div>)}</div></section>
  </div>
}

function LessonPlayer({ lesson, onComplete, onClose }: { lesson:Lesson; onComplete:()=>void; onClose:()=>void }) {
  const [answer,setAnswer]=useState<number|null>(null); const [checked,setChecked]=useState(false)
  const question=lesson.question!
  const isCorrect=answer===question.correct
  const sourceTitles=(lesson.sourceIds??[]).map(id=>cambridgeSources.find(source=>source.id===id)?.title).filter(Boolean)
  return <div className="modal-backdrop"><div className="lesson-modal" role="dialog" aria-modal="true" aria-labelledby="lesson-title"><header><button onClick={onClose} aria-label="Đóng">×</button><div><span style={{width:'45%'}}/></div><p>{lesson.level} · 1 câu</p></header><main><p className="eyebrow">{lesson.type.toUpperCase()} · {lesson.level}</p><h1 id="lesson-title">{lesson.title}</h1><p className="instruction">{lesson.objective}</p><blockquote>{question.prompt}</blockquote><div className="answer-list">{question.options.map((option,i)=><button key={option} onClick={()=>!checked&&setAnswer(i)} className={`${answer===i?'selected':''} ${checked&&i===question.correct?'correct':''} ${checked&&answer===i&&i!==question.correct?'wrong':''}`}><span>{String.fromCharCode(65+i)}</span>{option}{checked&&i===question.correct&&<b>✓</b>}</button>)}</div>{checked&&<div className={`feedback ${isCorrect?'success':'error'}`}><b>{isCorrect?'Chính xác!':'Gần đúng rồi!'}</b><p>{question.explanation}</p></div>}<div className="lesson-sources"><span>Nguồn định hướng</span><p>{sourceTitles.join(' · ')}</p></div></main><footer>{!checked?<button className="primary-btn" disabled={answer===null} onClick={()=>setChecked(true)}>Kiểm tra đáp án</button>:<button className="primary-btn" onClick={onComplete}>Hoàn thành bài <Icon name="arrow"/></button>}</footer></div></div>
}

function MockModal({ onClose, onFinish }: { onClose:()=>void; onFinish:()=>void }) {
  const [running,setRunning]=useState(false)
  return <div className="modal-backdrop"><div className="mock-modal" role="dialog" aria-modal="true"><button className="modal-x" onClick={onClose}>×</button><p className="eyebrow">B2 FIRST · MOCK TEST</p><h1>{running?'Reading & Use of English':'Sẵn sàng thử sức?'}</h1>{!running?<><p>Bài thi gồm 4 kỹ năng và mất khoảng 3 giờ 30 phút. Bạn có thể tạm dừng giữa các phần.</p><div className="test-summary">{examParts.map(p=><div key={p.skill}><span>{p.icon}</span><b>{p.skill}</b><small>{p.time}</small></div>)}</div><button className="primary-btn" onClick={()=>setRunning(true)}>Bắt đầu tính giờ</button></>:<><div className="timer">01:14:52</div><p className="instruction">Question 1 of 52</p><blockquote className="exam-question">The company has decided to _____ a new approach to flexible working.</blockquote><div className="answer-list">{['adopt','adapt','adjust','admit'].map((x,i)=><button key={x}><span>{String.fromCharCode(65+i)}</span>{x}</button>)}</div><button className="primary-btn" onClick={onFinish}>Nộp phần thi</button></>}</div></div>
}

export default function App() {
  const [profile,setProfile]=useState<Profile|null>(()=>{try{return JSON.parse(localStorage.getItem('cp-profile')||'null')}catch{return null}})
  const [progress,setProgress]=useState<Progress>(()=>{try{return JSON.parse(localStorage.getItem('cp-progress')||'null')||initialProgress}catch{return initialProgress}})
  const [view,setView]=useState<View>('home'); const [dark,setDark]=useState(false); const [activeLesson,setActiveLesson]=useState<Lesson|null>(null); const [showMock,setShowMock]=useState(false); const [toast,setToast]=useState('')
  useEffect(()=>{localStorage.setItem('cp-progress',JSON.stringify(progress))},[progress])
  useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(''),2600);return()=>clearTimeout(t)}},[toast])
  const finishOnboarding=(p:Profile)=>{setProfile(p);localStorage.setItem('cp-profile',JSON.stringify(p))}
  const completeLesson=()=>{if(!activeLesson)return;setProgress(p=>({...p,xp:p.xp+50,completedLessonIds:[...new Set([...p.completedLessonIds,activeLesson.id])]}));setActiveLesson(null);setToast('+50 XP · Hoàn thành bài học!')}
  const page=useMemo(()=>{if(!profile)return null; if(view==='learn')return <LearnView profile={profile} progress={progress} startLesson={setActiveLesson}/>;if(view==='exam')return <ExamView profile={profile} onMock={()=>setShowMock(true)}/>;if(view==='review')return <ReviewView progress={progress} onReview={()=>{setProgress(p=>({...p,wordsReviewed:p.wordsReviewed+1,xp:p.xp+10}));setToast('+10 XP · Đã ghi nhớ!')}}/>;if(view==='resources')return <ResourcesView profile={profile}/>;if(view==='insights')return <InsightsView profile={profile} progress={progress}/>;return <Dashboard profile={profile} progress={progress} startLesson={setActiveLesson}/>},[profile,view,progress])
  if(!profile)return <Onboarding onFinish={finishOnboarding}/>
  return <div className={dark?'app dark':'app'}><Sidebar view={view} setView={setView} profile={profile}/><main className="app-shell"><Topbar progress={progress} dark={dark} setDark={setDark}/>{page}</main><nav className="mobile-nav">{(['home','learn','exam','review','resources','insights'] as View[]).map((v,i)=><button key={v} className={view===v?'active':''} onClick={()=>setView(v)}><Icon name={v}/><span>{['Tổng quan','Học','Luyện thi','Ôn tập','Tài liệu','Tiến độ'][i]}</span></button>)}</nav>{activeLesson&&<LessonPlayer lesson={activeLesson} onComplete={completeLesson} onClose={()=>setActiveLesson(null)}/>} {showMock&&<MockModal onClose={()=>setShowMock(false)} onFinish={()=>{setShowMock(false);setToast('Đã lưu kết quả bài thi!')}}/>}{toast&&<div className="toast"><Icon name="check"/> {toast}</div>}</div>
}
