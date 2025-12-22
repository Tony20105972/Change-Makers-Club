import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Lock, 
  ChevronRight, 
  Zap, 
  Layers, 
  Clock, 
  Target, 
  RefreshCcw,
  AlertCircle,
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  RotateCcw,
  Terminal,
  FileText,
  BarChart3,
  Cpu,
  Users,
  Unlock,
  AlertTriangle,
  MessageCircle,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('landing'); // landing, test, analyzing, result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reportId] = useState(() => Math.random().toString(36).substring(2, 11).toUpperCase());
  const [timestamp] = useState(new Date().toISOString());

  // 참여 링크 정의
  const JOIN_LINK = "https://forms.gle/uKVmthgsvtaHx9zg8";

  const handleJoinClick = () => {
    window.open(JOIN_LINK, '_blank');
  };

  // 1. 질문 데이터
  const questions = [
    { id: 'articulation', q: "내 직무 역량을 전공자가 아닌 사람에게 1분 안에 설명할 수 있나요?", options: [{ t: "네, 가능함", tag: "articulation_high" }, { t: "아니오, 막막함", tag: "articulation_low" }] },
    { id: 'exploration', q: "최근 1주일간 지원하고 싶은 공고를 5개 이상 발견했나요?", options: [{ t: "네, 리스트업함", tag: "market_search_active" }, { t: "아니오/방법 모름", tag: "market_search_blind" }] },
    { id: 'trigger', q: "공고를 보고 '지금 바로 지원하기'를 누르는 데 방해되는 요소는?", options: [{ t: "완성도에 대한 불안", tag: "trigger_frozen" }, { t: "방법론적 무지", tag: "trigger_illiteracy" }] },
    { id: 'loop', q: "스스로 정한 루틴을 3일 이상 지속해본 경험이 최근 한 달 내에 있나요?", options: [{ t: "네, 있음", tag: "loop_initialized" }, { t: "아니오, 없음", tag: "loop_uninitialized" }] },
    { id: 'feedback', q: "내 이력서에 대한 타인의 냉정한 비판을 수용할 준비가 되었나요?", options: [{ t: "네, 수용 가능", tag: "feedback_ready" }, { t: "아니오, 방어 기제 작동", tag: "feedback_defensive" }] },
    { id: 'benchmark', q: "합격자들의 실제 이력서나 포트폴리오 기준점을 알고 있나요?", options: [{ t: "네, 알고 있음", tag: "benchmark_exist" }, { t: "아니오, 모름", tag: "benchmark_absent" }] },
    { id: 'pressure', q: "마감 1시간 전, 압박감이 있을 때 본인의 퍼포먼스는?", options: [{ t: "몰입도 상승", tag: "pressure_driver" }, { t: "실행 포기/동결", tag: "pressure_frozen" }] }
  ];

  const resetTest = () => {
    setCurrentQ(0);
    setAnswers([]);
    setAnalysisStep(0);
    setView('test');
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const goToLanding = () => {
    setCurrentQ(0);
    setAnswers([]);
    setAnalysisStep(0);
    setView('landing');
    setIsMenuOpen(false);
  };

  // 분석 엔진 로직
  const resultData = useMemo(() => {
    if (answers.length < questions.length) return null;
    const tags = answers;
    const negativeTags = tags.filter(t => t.includes('frozen') || t.includes('low') || t.includes('uninitialized') || t.includes('blind') || t.includes('absent') || t.includes('defensive') || t.includes('illiteracy'));
    const negativeCount = negativeTags.length;
    
    let status = 'PASS';
    let color = 'text-green-500';
    if (negativeCount >= 5) { status = 'FAIL'; color = 'text-red-500'; }
    else if (negativeCount >= 2) { status = 'HOLD'; color = 'text-yellow-500'; }
    
    return { status, tags, negativeCount, color };
  }, [answers, questions.length]);

  useEffect(() => {
    if (view === 'analyzing') {
      const timers = [
        setTimeout(() => setAnalysisStep(1), 1000),
        setTimeout(() => setAnalysisStep(2), 2500),
        setTimeout(() => setAnalysisStep(3), 4000),
        setTimeout(() => setAnalysisStep(4), 5500),
        setTimeout(() => setView('result'), 7000)
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [view]);

  const handleAnswer = (tag) => {
    const newAnswers = [...answers, tag];
    if (currentQ < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
    } else {
      setAnswers(newAnswers);
      setView('analyzing');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white scroll-smooth overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-black sticky top-0 bg-white z-[60]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-black text-2xl tracking-tighter cursor-pointer" onClick={goToLanding}>CMC TRACK</span>
            <div className="hidden lg:flex gap-6 text-sm font-bold">
              <a href="#intro" className="hover:text-gray-500">소개</a>
              <a href="#system" className="hover:text-gray-500">실행시스템</a>
              <a href="#curriculum" className="hover:text-gray-500">커리큘럼</a>
              <a href="#data" className="hover:text-gray-500">성과/데이터</a>
              <a href="#price" className="hover:text-gray-500">가격</a>
              <a href="#faq" className="hover:text-gray-500">FAQ</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={resetTest} className="hidden sm:block text-sm font-black underline underline-offset-4 decoration-2">3분 판정</button>
            <button onClick={handleJoinClick} className="bg-black text-white px-6 py-3 text-sm font-bold hover:bg-gray-800 transition-all active:scale-95">참여하기</button>
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden pt-24 px-6">
          <div className="flex flex-col gap-8 text-2xl font-black">
            <a href="#intro" onClick={() => setIsMenuOpen(false)}>소개</a>
            <a href="#system" onClick={() => setIsMenuOpen(false)}>실행시스템</a>
            <a href="#curriculum" onClick={() => setIsMenuOpen(false)}>커리큘럼</a>
            <a href="#data" onClick={() => setIsMenuOpen(false)}>성과/데이터</a>
            <a href="#price" onClick={() => setIsMenuOpen(false)}>가격</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <button onClick={resetTest} className="text-left text-red-600">3분 판정 바로가기</button>
            <button onClick={handleJoinClick} className="text-left text-black">참여 신청하기</button>
          </div>
        </div>
      )}

      {/* [LANDING VIEW] */}
      {view === 'landing' && (
        <main>
          {/* Hero Section */}
          <section className="pt-24 pb-32 px-6 border-b border-black text-center">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-bold tracking-[0.4em] uppercase mb-10 text-gray-400">Result-Oriented Execution System</p>
              <h1 className="text-5xl md:text-8xl font-black mb-12 leading-[1.05] tracking-tighter break-keep">
                전공은 공부했지만,<br />
                <span className="bg-black text-white px-4 inline-block transform -rotate-1">취업은 배운 적 없으니까.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-16 leading-relaxed break-keep max-w-3xl mx-auto font-medium">
                취업은 의지의 문제가 아닌 <strong>구조와 방법의 문제</strong>입니다.<br />
                방법론적 문맹을 해소하고 한 달 안에 실제 지원까지 도달하게 만드는 CMC의 실전 가이드.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <button onClick={handleJoinClick} className="bg-black text-white px-12 py-6 font-black text-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                  이번 달 실행 참여하기 <ArrowRight />
                </button>
                <button onClick={resetTest} className="border-2 border-black px-12 py-6 font-black text-xl hover:bg-black hover:text-white transition-all active:scale-95">
                  3분 판정 바로가기
                </button>
              </div>
            </div>
          </section>

          {/* Current Status Comparison */}
          <section className="py-24 px-6 bg-gray-50 border-b border-black">
            <div className="max-w-5xl mx-auto">
              <p className="font-black text-sm mb-10 border-l-4 border-black pl-3 italic text-red-600">지금 왜 시작해야 하는가: 공백기가 길어질수록 당신의 몸값은 낮아집니다.</p>
              <div className="grid md:grid-cols-2 gap-0 border border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] bg-white">
                <div className="p-10 border-b md:border-b-0 md:border-r border-black">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4 block">Current Status</span>
                  <h3 className="text-2xl font-black mb-4 italic">"준비가 덜 된 것 같아서 지원을 못 하겠어요."</h3>
                  <p className="text-gray-500 font-bold tracking-tight">지방대 컴공 전공생 A님 - 지원 횟수 0회</p>
                </div>
                <div className="p-10 bg-black text-white">
                  <span className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4 block">CMC After 4 Weeks</span>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 bg-green-500 text-black text-xs font-black">PASS</span>
                    <h3 className="text-2xl font-black text-green-400 italic">"4주 만에 12개 기업 지원 완료, 면접 2곳 확정"</h3>
                  </div>
                  <p className="text-gray-400 font-bold tracking-tight">방법론 학습 → 실행 근육 형성 → 결과 도출</p>
                </div>
              </div>
            </div>
          </section>

          {/* Assessment Section */}
          <section className="py-32 px-6 border-b border-black">
            <div className="max-w-4xl mx-auto text-center">
              <p className="font-black text-sm mb-4 border-l-4 border-black pl-3 mx-auto w-fit uppercase tracking-tighter">취업 시장 자생력 판정</p>
              <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight break-keep leading-tight">당신이 왜 여태껏 멈춰 있었는지<br />3분 안에 판정해 드립니다.</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
                <div className="p-8 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-black text-lg mb-6 leading-tight">1. 내 직무 역량을 전공자가 아닌 사람에게 1분 안에 설명할 수 있나요?</p>
                  <div className="flex flex-col gap-2 text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400"></div> 네, 가능함</span>
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400"></div> 아니오, 막막함</span>
                  </div>
                </div>
                <div className="p-8 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-black text-lg mb-6 leading-tight">2. 최근 1주일간 지원하고 싶은 공고를 5개 이상 발견했나요?</p>
                  <div className="flex flex-col gap-2 text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400"></div> 네, 리스트업함</span>
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400"></div> 아니오/방법 모름</span>
                  </div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto bg-gray-50 border border-black p-6 mb-16 text-left">
                <p className="font-black text-xs uppercase tracking-widest mb-4 border-b border-black pb-2">판정 기준 안내</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] font-bold">
                  <div className="flex items-start gap-2"><span className="text-green-600">● PASS:</span> 실행력 준비 완료. 바로 지원 트랙 가동 가능.</div>
                  <div className="flex items-start gap-2"><span className="text-yellow-600">● HOLD:</span> 방법론적 이해 필요. CMC 가이드 우선 학습 권장.</div>
                  <div className="flex items-start gap-2"><span className="text-red-600">● FAIL:</span> 마인드셋 재설정 필요. 기초 실행 근육부터 설계.</div>
                </div>
              </div>

              <button onClick={resetTest} className="bg-black text-white px-16 py-6 font-black text-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
                판정 결과 및 다음 액션 받기
              </button>
            </div>
          </section>

          {/* Problem Definition */}
          <section id="intro" className="py-32 px-6 bg-black text-white overflow-hidden relative">
            <div className="max-w-5xl mx-auto relative z-10">
              <span className="text-xs font-bold tracking-[0.3em] uppercase mb-8 block text-gray-500">Problem Definition</span>
              <h2 className="text-6xl md:text-8xl font-black mb-24 leading-[0.9] tracking-tighter italic">
                취업판이<br />실패하도록 설계된 <span className="text-red-600 underline decoration-white">이유</span> <span className="text-red-600">!</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-20">
                <div className="relative">
                  <span className="text-7xl font-black absolute -top-12 -left-6 text-white/5 italic">!</span>
                  <h3 className="text-3xl font-black mb-8 italic">지식은 넘치지만<br />방법은 모릅니다.</h3>
                  <p className="text-gray-400 text-lg leading-relaxed break-keep font-medium">
                    정보가 부족해서 취업이 안 되는 게 아닙니다. 이력서 '어떻게' 한 줄을 시작하고, 지원 버튼을 '언제' 눌러야 할지 모르는 <strong>방법론적 문맹</strong>이 본질입니다.
                  </p>
                </div>
                <div className="relative">
                  <span className="text-7xl font-black absolute -top-12 -left-6 text-white/5 italic">!</span>
                  <h3 className="text-3xl font-black mb-8 italic">왜 결과 중심 구조인가?</h3>
                  <p className="text-gray-400 text-lg leading-relaxed break-keep font-medium">
                    배움만으로는 취업이 되지 않습니다. CMC는 교육기관이 아닌 <strong>'결과 생산 공장'</strong>입니다. 1개월이라는 압축된 기간 동안 실제 지원과 결과 도출에만 집중합니다.
                  </p>
                </div>
              </div>

              <div className="mt-32 pt-20 border-t border-white/20">
                <h4 className="text-sm font-black uppercase tracking-[0.4em] mb-12 text-center italic">CMC 프로그램 운영 원칙</h4>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {[
                    { num: "01", text: "행동 없는 지식은 쓰레기다. (80% 실행 비율)" },
                    { num: "02", text: "동료의 속도가 나의 데드라인이 된다." },
                    { num: "03", text: "한 달 뒤, 당신의 손엔 실제 지원 이력이 남아야 한다." }
                  ].map((p, i) => (
                    <div key={i} className="p-10 border border-white/30 hover:bg-white hover:text-black transition-all group">
                      <p className="text-xs font-bold mb-4 opacity-50 group-hover:opacity-100 italic tracking-widest">Principle {p.num}</p>
                      <p className="text-lg font-black break-keep">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Execution System */}
          <section id="system" className="py-32 px-6 border-b border-black bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic">의지에 맡기지 않는<br />결과 생산 시스템</h2>
                <p className="text-xl font-bold text-gray-400 italic">지연과 이탈을 원천 차단하는 강력한 실행 로직</p>
              </div>

              <div className="grid md:grid-cols-2 gap-px bg-black border border-black shadow-[30px_30px_0px_0px_rgba(0,0,0,0.05)]">
                {[
                  { title: "날짜 기반 구조", desc: "\"언젠가 하겠다\"는 없습니다. 정해진 날짜, 정해진 시간까지 결과물을 제출해야만 다음 단계가 열립니다.", icon: <Clock /> },
                  { title: "결과 없는 행동 제거", desc: "강의 시청, 단순 자료 조사는 행동이 아닙니다. 이력서 업데이트, 실제 지원 완료만이 유효한 행동으로 인정됩니다.", icon: <Target /> },
                  { title: "미제출 시 제한", desc: "데드라인을 넘기면 스쿼드 활동 및 자료 접근이 즉각 제한됩니다. 끝까지 갈 수밖에 없는 강력한 데드라인.", icon: <Lock /> },
                  { title: "실행 루틴 각인", desc: "4주간 반복되는 지원 루틴은 수료 후에도 혼자서 취업 준비를 지속할 수 있는 '자생력'을 만듭니다.", icon: <RefreshCcw /> }
                ].map((s, i) => (
                  <div key={i} className="bg-white p-12 hover:bg-gray-50 transition-all">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-8">{s.icon}</div>
                    <h4 className="text-2xl font-black mb-4 italic underline decoration-4 underline-offset-4">{s.title}</h4>
                    <p className="text-gray-500 font-bold leading-relaxed break-keep">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-32 grid md:grid-cols-4 gap-8">
                {[
                  { label: "소그룹 스쿼드", desc: "5인 1조 밀착 관리. 서로가 서로의 페이스메이커가 됩니다.", icon: <Users /> },
                  { label: "제출 공개", desc: "동료의 이력서와 지원 현황을 실시간 확인하며 자극받습니다.", icon: <Unlock /> },
                  { label: "결과 비교", desc: "전체 참여자 대비 나의 실행 위치를 데이터로 확인합니다.", icon: <BarChart3 /> },
                  { label: "이탈 방지", desc: "혼자라면 포기했을 지점, 팀의 압박이 당신을 밀어줍니다.", icon: <AlertTriangle /> }
                ].map((p, i) => (
                  <div key={i} className="text-center">
                    <div className="mx-auto w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mb-6 hover:bg-black hover:text-white transition-all cursor-default">
                        {p.icon}
                    </div>
                    <h5 className="font-black mb-3">{p.label}</h5>
                    <p className="text-xs text-gray-500 font-bold leading-relaxed break-keep">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Peer Learning */}
          <section className="py-32 px-6 bg-gray-50 border-b border-black">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-20">
              <div className="flex-1">
                <span className="text-xs font-black bg-black text-white px-3 py-1 mb-6 inline-block uppercase tracking-widest">Peer-Learning Structure</span>
                <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter">혼자 하면 '준비'만 하다가 끝납니다.<br />함께 하면 <span className="italic underline decoration-8 underline-offset-4 decoration-black/10 text-red-600">'지원'까지</span> 갑니다.</h2>
                <p className="text-lg text-gray-500 font-bold leading-relaxed mb-10 break-keep">
                  취업은 마라톤입니다. 혼자 준비하는 사람은 자기 객관화가 되지 않고, 금방 지칩니다. CMC는 동료의 속도를 나의 속도로 치환하는 시스템을 제공합니다.
                </p>
                <ul className="space-y-4 font-black italic">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" /> 다른 사람은 어떤 공고를 보는지 실시간 공유</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" /> 동료의 피드백으로 완성되는 이력서의 날카로움</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" /> 주간 랭킹 시스템으로 고취되는 건강한 경쟁심</li>
                </ul>
              </div>
              <div className="w-full md:w-1/3 aspect-square bg-white border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <div className="text-center">
                    <TrendingUp size={100} strokeWidth={3} className="mx-auto mb-4" />
                    <p className="text-3xl font-black italic">SPEED UP</p>
                </div>
              </div>
            </div>
          </section>

          {/* Roadmap */}
          <section id="curriculum" className="py-32 px-6 border-b border-black">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-black mb-6 tracking-tight italic">압축적인 4주간의 실행 로드맵</h2>
                <p className="text-xl font-bold text-gray-400 italic">주 3회 운영, 결과가 나올 수밖에 없는 구조적 흐름</p>
              </div>

              <div className="relative space-y-12">
                <div className="absolute top-0 bottom-0 left-[2.45rem] md:left-1/2 w-1 bg-black/5 -translate-x-1/2 hidden md:block"></div>
                {[
                  { week: "Week 01", title: "취업 문법 재구축", sub: "직무 역량 추출 & 이력서 제로베이스 설계", details: ["• 월: 나의 전공/경험 데이터화", "• 수: 기업이 원하는 언어로 번역", "• 금: 이력서 1차 본 완성 (PASS 기준)"] },
                  { week: "Week 02", title: "타겟팅 & 엔진 가동", sub: "채용 시장 분석 & 플랫폼 지원 루트 설계", details: ["• 월: 나에게 맞는 타겟 기업 20곳 리스트업", "• 수: 공고 속 핵심 키워드 매칭", "• 금: 첫 번째 실전 지원 완료"] },
                  { week: "Week 03", title: "고속 실행 (Full-Support)", sub: "주간 3회 이상 지원 루틴 완전 정착", details: ["• 월/수/금: 실전 지원 반복", "• 중간 점검: 서류 피드백 반영", "• 목표: 누적 지원 8건 달성"] },
                  { week: "Week 04", title: "결과 최적화 & 종료", sub: "면접 준비 산출물 & 자생력 시스템 이양", details: ["• 월: 면접 답변 논리 구조 설계", "• 수: 최종 지원 데이터 백업", "• 금: 수료 및 홀로서기 선언"] }
                ].map((item, idx) => (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-1 w-full bg-white p-10 border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-5px] transition-all">
                      <span className="text-3xl font-black italic text-black/10 block mb-2">{item.week}</span>
                      <h4 className="text-2xl font-black mb-2 italic underline decoration-gray-200 underline-offset-8">{item.title}</h4>
                      <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-tighter">{item.sub}</p>
                      <div className="space-y-2 text-sm font-bold text-gray-600 bg-gray-50 p-6">
                        {item.details.map((d, i) => <p key={i}>{d}</p>)}
                      </div>
                    </div>
                    <div className="z-10 w-20 h-20 rounded-full bg-black border-8 border-white text-white flex items-center justify-center font-black italic text-xl shadow-lg hidden md:flex">
                        {idx + 1}
                    </div>
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                ))}
              </div>
              <div className="mt-20 p-8 border border-black bg-gray-50 text-center font-black italic text-sm">
                ※ 월 종료 기준: 누적 지원 12건 이상 + 수정된 이력서 1종 + 면접 대비 리스트
              </div>
            </div>
          </section>

          {/* Data Proof */}
          <section id="data" className="py-32 px-6 bg-black text-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-black mb-6 tracking-tight italic">우리는 데이터로 증명합니다</h2>
                <p className="text-xl font-bold text-gray-500 italic">실행을 멈추지 않는 이들의 결과 지표</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
                {[
                  { val: "92.4%", label: "4주 실행 유지율" },
                  { val: "15.2회", label: "참여자 평균 지원 횟수" },
                  { val: "41.0%", label: "서류 통과 진입률" },
                  { val: "3.2배", label: "참여 전 대비 지원량 상승" }
                ].map((d, i) => (
                  <div key={i} className="text-center">
                    <p className="text-5xl md:text-7xl font-black mb-4 tracking-tighter italic text-green-400">{d.val}</p>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{d.label}</p>
                  </div>
                ))}
              </div>

              {/* User Journey */}
              <div className="bg-white/5 p-12 border border-white/10 text-center">
                <p className="text-xs font-black uppercase tracking-[0.5em] mb-16 opacity-30 italic">결과 발생 흐름 (User Journey)</p>
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 hidden md:block"></div>
                    {[
                        { step: "START", desc: "막막함/실행0" },
                        { step: "WEEK 2", desc: "첫 지원/방법 습득" },
                        { step: "FINISH", desc: "루틴화/결과 도출" }
                    ].map((s, i) => (
                        <div key={i} className="relative z-10 bg-black px-8">
                            <p className="text-3xl font-black italic mb-2 tracking-tighter">{s.step}</p>
                            <p className="text-sm font-bold text-gray-500">{s.desc}</p>
                        </div>
                    ))}
                </div>
              </div>

              {/* Director Message */}
              <div className="mt-40 grid md:grid-cols-2 gap-20 items-center">
                <div className="p-1 border border-white/20 aspect-[3/4] bg-white/5 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
                    <div className="z-20 absolute bottom-10 left-10 text-left">
                        <p className="text-2xl font-black italic mb-1">전윤석 디렉터</p>
                        <p className="text-xs font-bold text-gray-400">"취업은 개인의 역량이 아닌 시스템의 힘입니다."</p>
                        <p className="text-[10px] text-green-500 font-bold mt-2">M사 취업률 전국 1위 달성 사례자</p>
                    </div>
                    <Users size={200} className="opacity-10 group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="space-y-8">
                  <span className="text-xs font-black italic text-gray-500 tracking-widest">Designer's Message</span>
                  <h3 className="text-4xl font-black italic leading-tight underline decoration-white decoration-4 underline-offset-8">기존 취업 교육과의<br />결정적 차이를 만듭니다.</h3>
                  <p className="text-gray-400 font-medium leading-relaxed break-keep">
                    수천 명의 취업 준비생을 만나며 깨달은 것은, 그들이 못하는 것이 아니라 <strong>'시작하는 방법'</strong>을 모른다는 사실이었습니다. 특히 기술적 역량이 뛰어난 컴공 전공자나 열정 있는 지방대생들이 '취업 문법'을 몰라 멈춰있는 모습이 가장 안타까웠습니다.
                  </p>
                  <p className="text-gray-400 font-medium leading-relaxed break-keep">
                    CMC는 그 막막함을 걷어내고, 무조건 지원이라는 결과값까지 도달하게 만드는 시스템입니다. 당신이 지방에 있든, 첫 취업이든 상관없습니다. 이 구조 안으로 들어오면 결과는 자동으로 생산됩니다.
                  </p>
                  <div className="p-8 border-l-4 border-green-500 bg-white/5 text-xl font-black italic italic leading-relaxed break-keep">
                    "우리는 당신이 합격할 때까지 기다리지 않습니다. 합격할 수밖에 없는 행동을 지금 즉시 하게 만듭니다."
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Comparison */}
          <section id="price" className="py-32 px-6 border-b border-black">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-black mb-6 tracking-tight italic">비교할 수 없는 압도적 가치</h2>
                <p className="text-xl font-bold text-gray-400 italic">우리가 이 가격에 이 모든 시스템을 제공할 수 있는 이유</p>
              </div>

              <div className="grid md:grid-cols-3 gap-0 border border-black">
                <div className="p-10 border-b md:border-b-0 md:border-r border-black bg-gray-50 opacity-60">
                  <h4 className="font-black text-xl mb-2">고가 취업 컨설팅</h4>
                  <p className="text-sm font-bold text-gray-400 mb-8 tracking-tighter">200~300만 원대</p>
                  <ul className="space-y-4 text-xs font-bold text-gray-500">
                    <li className="flex items-start gap-2">• 대리 작성 위주 (자생력 0)</li>
                    <li className="flex items-start gap-2">• 1:1 상담 위주의 느린 속도</li>
                    <li className="flex items-start gap-2">• 의존적 참여에 따른 성장 부재</li>
                  </ul>
                </div>
                <div className="p-12 bg-black text-white relative transform md:scale-110 shadow-2xl z-10 border-x-2 border-black text-center">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest">Practical Solution</span>
                  <h4 className="font-black text-2xl mb-2">CMC JOB TRACK (31기)</h4>
                  <p className="text-4xl font-black mb-10 tracking-tighter text-green-400 italic">149,000원</p>
                  <ul className="space-y-4 text-sm font-black mb-12 italic text-left">
                    <li className="flex items-start gap-2">✅ 제로베이스 지원 가이드</li>
                    <li className="flex items-start gap-2">✅ 4주 강제 실행 시스템</li>
                    <li className="flex items-start gap-2">✅ 스쿼드 밀착 관리 & 피드백</li>
                    <li className="flex items-start gap-2">✅ 자생적 취업 루틴 형성</li>
                  </ul>
                  <button onClick={handleJoinClick} className="w-full bg-white text-black py-5 font-black text-lg hover:bg-gray-100 transition-all active:scale-95 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]">
                    이 가격으로 결과 만들기
                  </button>
                </div>
                <div className="p-10 border-t md:border-t-0 md:border-l border-black bg-gray-50 opacity-60">
                  <h4 className="font-black text-xl mb-2">일반 온라인 강의</h4>
                  <p className="text-sm font-bold text-gray-400 mb-8 tracking-tighter">10~20만 원대</p>
                  <ul className="space-y-4 text-xs font-bold text-gray-500">
                    <li className="flex items-start gap-2">• 단순 시청 (실행률 10% 미만)</li>
                    <li className="flex items-start gap-2">• 강제성 및 사후 관리 부재</li>
                    <li className="flex items-start gap-2">• 실제 지원 연결 지점 없음</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-24 max-w-3xl mx-auto text-center">
                <p className="text-lg font-bold text-gray-500 leading-relaxed italic break-keep">
                    "우리는 비싼 개인의 시간을 파는 것이 아닙니다. 기술과 스쿼드 시스템을 통해 <strong>실행에 필요한 모든 비용을 효율화</strong>했습니다.<br />
                    당신이 내는 비용은 교육비가 아니라, '성공할 수밖에 없는 환경'을 소유하는 비용입니다."
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-32 px-6 bg-white border-b border-black">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-black mb-6 tracking-tight italic">자주 묻는 질문</h2>
                <p className="text-xl font-bold text-gray-400 italic">궁금한 점을 확인하세요.</p>
              </div>
              <div className="space-y-4">
                {[
                  { q: "정말 결과가 나오나요?", a: "네. CMC는 92% 이상의 수료생들이 4주 안에 평균 12회 이상의 실제 지원을 완료합니다. 지원이 결과의 시작입니다." },
                  { q: " 누구에게나 가능한가요?", a: "취업의 기초 방법론을 모르는 분들, 지방에서 정보가 부족한 분들, 실행력이 필요한 전공자 모두에게 최적화되어 있습니다." },
                  { q: "실패하면 어떻게 되나요?", a: "미션을 지연하거나 포기할 경우 시스템 접근이 제한됩니다. 이 강력한 제한 구조가 당신을 실패하지 않게 만듭니다." }
                ].map((f, i) => (
                  <details key={i} className="group border border-black bg-white">
                    <summary className="p-8 font-black text-xl cursor-pointer list-none flex justify-between items-center hover:bg-black hover:text-white transition-all">
                      <span>Q. {f.q}</span>
                      <ChevronRight className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-8 border-t border-black bg-gray-50 font-bold text-gray-600 leading-relaxed italic">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Final Call to Action */}
          <section className="py-32 px-6 bg-black text-white text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs font-black uppercase tracking-[0.6em] mb-12 opacity-40 italic underline decoration-white">CORE MANIFESTO</p>
              <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight tracking-tighter italic">
                "우리는 당신의 취업을 보장하지 않습니다.<br />
                대신, 취업을 실제로 <span className="text-red-600 underline decoration-red-600">시작하지 못하는 상태</span>에서는<br />
                절대 끝나지 않게 만듭니다."
              </h2>
              <div className="flex flex-col items-center gap-6">
                <button onClick={handleJoinClick} className="bg-white text-black px-16 py-6 font-black text-2xl hover:bg-gray-200 transition-all active:scale-95 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]">
                  지금 참여 신청하기
                </button>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span className="cursor-pointer hover:text-white transition-colors">환불 정책 확인</span>
                    <span className="opacity-40 select-none">|</span>
                    <span>참여 신청 완료 후 24시간 이내에 판정 가이드 발송</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-24 px-6 border-t border-black bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-12 mb-20">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-4xl font-black italic tracking-tighter mb-6">CMC Track</h3>
                  <p className="text-xs font-bold text-gray-400 mb-8 tracking-widest leading-loose uppercase">
                    WE DESIGN YOUR FIRST STEP INTO THE JOB MARKET.<br />
                    NOT JUST EDUCATION, BUT AN EXECUTION FACTORY.
                  </p>
                  <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <a href="#" className="hover:text-black">이용약관</a>
                    <a href="#" className="hover:text-black">개인정보 처리방침</a>
                    <a href="#" className="hover:text-black">데이터 보호 정책</a>
                  </div>
                </div>
                <div>
                  <h5 className="font-black mb-6 uppercase tracking-widest text-xs italic opacity-40">Navigation</h5>
                  <ul className="space-y-3 text-xs font-black uppercase tracking-tighter">
                    <li><a href="#" className="hover:underline">HOME</a></li>
                    <li><a href="#intro" className="hover:underline">ABOUT CMC</a></li>
                    <li><a href="#system" className="hover:underline">EXECUTION SYSTEM</a></li>
                    <li><a href="#price" className="hover:underline">PRICING</a></li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-black mb-6 uppercase tracking-widest text-xs italic opacity-40">Contact</h5>
                  <ul className="space-y-3 text-xs font-black tracking-tighter">
                    <li className="flex items-center gap-2"><MessageCircle size={14}/> 문의하기: @cmc_track (카톡)</li>
                    <li className="flex items-center gap-2"><ExternalLink size={14}/> 제휴문의: biz@cmc.club</li>
                    <li className="text-gray-400 opacity-60">운영시간: 10:00 - 18:00 (월~금)</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-12 border-t border-black/5">
                <p className="text-[10px] font-black text-gray-300 uppercase italic">© 2025 CHANGEMAKERS CLUB. DESIGNED BY STRUCTURE FIRST, ACTION ALWAYS.</p>
                <div className="flex gap-4">
                    <div className="w-10 h-10 bg-black rounded-sm"></div>
                    <div className="w-10 h-10 bg-gray-100 rounded-sm"></div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* [TEST VIEW] */}
      {view === 'test' && (
        <div className="max-w-2xl mx-auto py-32 px-6 animate-in fade-in duration-500">
          <button onClick={goToLanding} className="mb-12 text-xs font-bold flex items-center gap-2 hover:underline">
            <X size={14}/> 테스트 중단
          </button>
          <div className="mb-12">
            <div className="h-2 bg-gray-100 w-full mb-4 rounded-full overflow-hidden">
              <div className="h-full bg-black transition-all duration-500" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                <span>Assessment Phase</span>
                <span>{currentQ + 1} / {questions.length}</span>
            </div>
          </div>
          <h2 className="text-4xl font-black mb-12 tracking-tight break-keep leading-tight">{questions[currentQ].q}</h2>
          <div className="grid gap-4">
            {questions[currentQ].options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => handleAnswer(opt.tag)}
                className="group flex items-center justify-between p-8 border-2 border-black font-black text-xl hover:bg-black hover:text-white transition-all active:scale-[0.98]"
              >
                <span>{opt.t}</span>
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* [ANALYZING VIEW] */}
      {view === 'analyzing' && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full">
            <div className="flex justify-center mb-12">
                <div className="relative">
                    <Cpu size={100} className="text-black animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity size={40} className="text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="space-y-6">
              <div className={`flex items-center gap-4 transition-all duration-500 ${analysisStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${analysisStep > 1 ? 'bg-black text-white' : 'border-2 border-black'}`}>1</div>
                <p className="font-black uppercase tracking-tighter">실행 패턴 데이터 추출 중...</p>
              </div>
              <div className={`flex items-center gap-4 transition-all duration-500 ${analysisStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${analysisStep > 2 ? 'bg-black text-white' : 'border-2 border-black'}`}>2</div>
                <p className="font-black uppercase tracking-tighter">방법론적 문맹률 자가 진단...</p>
              </div>
              <div className={`flex items-center gap-4 transition-all duration-500 ${analysisStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${analysisStep > 3 ? 'bg-black text-white' : 'border-2 border-black'}`}>3</div>
                <p className="font-black uppercase tracking-tighter">실행 마찰 계수 연산 중...</p>
              </div>
              <div className={`flex items-center gap-4 transition-all duration-500 ${analysisStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${analysisStep > 4 ? 'bg-black text-white' : 'border-2 border-black'}`}>4</div>
                <p className="font-black uppercase tracking-tighter">최종 분석 리포트 생성 완료.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* [RESULT VIEW] */}
      {view === 'result' && resultData && (
        <div className="bg-[#f0f0f0] min-h-screen py-12 px-4 md:py-20 md:px-6 font-mono">
          <div className="max-w-4xl mx-auto bg-white border border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="bg-black text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-black">
              <div>
                <h2 className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-2">
                    <Terminal size={24} /> CMC_EXECUTION_ANALYSIS_FILE
                </h2>
                <div className="text-[10px] opacity-60 mt-2 font-bold uppercase tracking-widest flex flex-wrap gap-x-4">
                    <span>ID: {reportId}</span>
                    <span>ISSUED_BY: CMC_SYSTEM</span>
                    <span>TIMESTAMP: {timestamp}</span>
                </div>
              </div>
              <div className={`px-6 py-2 border-2 border-current font-black text-2xl italic ${resultData.color} bg-white/5 animate-pulse`}>
                STATUS: {resultData.status}
              </div>
            </div>

            <div className="p-6 md:p-12 space-y-16">
              <section>
                <div className="flex items-center gap-2 mb-8 text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 w-fit text-black">
                  <FileText size={18} /> 01. EXECUTION_SUMMARY
                </div>
                <div className="flex flex-wrap gap-2 mb-10">
                  {resultData.tags.map((tag, i) => (
                    <span key={i} className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-black ${tag.includes('frozen') || tag.includes('low') || tag.includes('blind') || tag.includes('absent') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        #{tag}
                    </span>
                  ))}
                </div>
                <div className="bg-black text-white p-8 rounded-sm relative overflow-hidden group">
                    <Activity className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-150 transition-transform duration-1000" size={200} />
                    <p className="text-xl md:text-2xl font-black leading-tight italic break-keep relative z-10">
                        {resultData.status === 'FAIL' 
                            ? "실행의 마찰력이 가속도를 완전히 압도하고 있습니다. 의지의 문제가 아닌 시스템 결함입니다."
                            : resultData.status === 'HOLD'
                            ? "실행을 위한 기초 근육은 존재하나, 마찰력이 가속도를 상쇄하고 있습니다."
                            : "실행 엔진이 최적의 상태입니다. 지금 즉시 고부가가치 타겟에 화력을 집중하십시오."}
                    </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-8 text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 w-fit text-black">
                  <BarChart3 size={18} /> 02. FRICTION_METRICS
                </div>
                <div className="space-y-8">
                    {[
                        { label: 'Methodological Literacy (방법론적 이해도)', val: resultData.tags.filter(t => !t.includes('illiteracy') && !t.includes('blind')).length * 15 },
                        { label: 'Execution Routine (실행 루틴성)', val: resultData.tags.filter(t => !t.includes('uninitialized')).length * 12 },
                        { label: 'Feedback Receptivity (피드백 수용성)', val: resultData.tags.filter(t => !t.includes('defensive')).length * 14 },
                        { label: 'Market Proactivity (시장 적극성)', val: resultData.tags.filter(t => !t.includes('blind') && !t.includes('absent')).length * 13 },
                    ].map((m, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between text-[11px] font-black mb-2 uppercase italic">
                                <span>{m.label}</span>
                                <span>{m.val}%</span>
                            </div>
                            <div className="h-4 bg-gray-100 border border-black overflow-hidden p-[2px]">
                                <div className="h-full bg-black transition-all duration-1000 delay-500" style={{ width: `${m.val}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
              </section>

              <section className="grid md:grid-cols-2 gap-8">
                <div className="border-l-4 border-black pl-6">
                    <h4 className="font-black text-lg mb-4 italic uppercase">03. REASON_FOR_STAGNATION</h4>
                    <div className="space-y-6 text-sm">
                        <div>
                            <p className="font-black mb-1 underline decoration-2">방법론적 문맹 (Methodological Blindness)</p>
                            <p className="text-gray-500 font-bold leading-relaxed">지원 버튼을 언제, 어떻게 눌러야 하는지에 대한 기준점이 부재합니다. 정보 부족이 아니라 '절차'의 문제입니다.</p>
                        </div>
                        <div>
                            <p className="font-black mb-1 underline decoration-2">루프 미형성 (Loop Malfunction)</p>
                            <p className="text-gray-500 font-bold leading-relaxed">의지에 의존한 일회성 실행은 금방 지칩니다. 시스템화되지 않은 노력은 매몰 비용으로 작용 중입니다.</p>
                        </div>
                    </div>
                </div>
                <div className="border-l-4 border-black pl-6 bg-gray-50 p-6">
                    <h4 className="font-black text-lg mb-4 italic uppercase flex items-center gap-2"><Zap className="text-yellow-500" /> 04. NEXT_TRACK_CODE</h4>
                    <div className="space-y-4">
                        <div className="p-3 border border-black bg-white">
                            <p className="text-[10px] font-bold text-gray-400">Track Code: ZB_GUIDE_V1</p>
                            <p className="font-black text-sm uppercase">제로베이스 지원 가이드 활성화</p>
                        </div>
                        <div className="p-3 border border-black bg-white">
                            <p className="text-[10px] font-bold text-gray-400">Track Code: TIME_LOCK_96H</p>
                            <p className="font-black text-sm uppercase">강제 지원 데드라인 프로토콜</p>
                        </div>
                    </div>
                </div>
              </section>

              <section className="bg-black text-white p-8">
                <h4 className="font-black text-xl mb-8 italic flex items-center gap-3">
                    <Target size={24} /> MANDATORY_ACTION_LIST (7 DAYS)
                </h4>
                <div className="space-y-4 font-bold tracking-tight">
                  <div className="flex gap-4 border-b border-white/20 pb-3 italic">
                    <span className="opacity-40">01.</span>
                    <p>나의 전공/직무 경험 데이터 10개 핵심 키워드 추출 및 정의</p>
                  </div>
                  <div className="flex gap-4 border-b border-white/20 pb-3 italic">
                    <span className="opacity-40">02.</span>
                    <p>유사 도메인 타겟 공고 5개 수집 및 요구 역량 맵핑 완료</p>
                  </div>
                  <div className="flex gap-4 border-b border-white/20 pb-3 italic">
                    <span className="opacity-40">03.</span>
                    <p>완성도 타협 없는 이력서 본문(Body) 초안 강제 완성</p>
                  </div>
                </div>
              </section>

              <div className="pt-10 flex flex-col md:flex-row gap-4">
                <button onClick={resetTest} className="flex-1 py-6 border-2 border-black font-black text-xl hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 group">
                  <RotateCcw size={20} className="group-hover:rotate-[-180deg] transition-transform duration-500" /> 다시 판정하기
                </button>
                <button onClick={handleJoinClick} className="flex-1 py-6 bg-black text-white font-black text-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] active:scale-95 group">
                  <Zap size={20} className="text-yellow-400 fill-yellow-400" /> 실행 시스템 활성화하기 (참여 신청)
                </button>
              </div>

              <div className="flex justify-between items-center text-[10px] font-black text-gray-300 pt-10 border-t border-dashed border-gray-200 uppercase">
                  <span>SYSTEM_REMARK: OPTIMIZATION_REQUIRED</span>
                  <span className="cursor-pointer hover:text-black" onClick={goToLanding}>[ ESC_TO_HOMEPAGE ]</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
