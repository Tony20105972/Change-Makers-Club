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

  // 참여 링크 정의
  const JOIN_LINK = "https://forms.gle/uKVmthgsvtaHx9zg8";

  const handleJoinClick = () => {
    window.open(JOIN_LINK, '_blank');
  };

  // 1. 질문 데이터
  const questions = [
    { 
      id: 'articulation', 
      q: "본인의 직무 역량을 비전공자에게도 1분 안에 명확히 설명하실 수 있나요?", 
      options: [
        { t: "네, 충분히 가능합니다", tag: "articulation_high" }, 
        { t: "아니요, 아직은 조금 어렵습니다", tag: "articulation_low" }
      ] 
    },
    { 
      id: 'exploration', 
      q: "최근 일주일 동안 지원하고 싶은 공고를 5개 이상 찾아보셨나요?", 
      options: [
        { t: "네, 리스트를 정리해두었습니다", tag: "market_search_active" }, 
        { t: "아니요, 아직 방법을 잘 모르겠습니다", tag: "market_search_blind" }
      ] 
    },
    { 
      id: 'trigger', 
      q: "공고를 보고 지원하기 버튼을 누르는 데 가장 망설여지는 이유는 무엇인가요?", 
      options: [
        { t: "서류 완성도에 대한 불안함 때문입니다", tag: "trigger_frozen" }, 
        { t: "구체적인 지원 방법을 모르기 때문입니다", tag: "trigger_illiteracy" }
      ] 
    },
    { 
      id: 'loop', 
      q: "최근 한 달 이내에 스스로 정한 루틴을 3일 이상 지속해본 경험이 있으신가요?", 
      options: [
        { t: "네, 경험이 있습니다", tag: "loop_initialized" }, 
        { t: "아니요, 아직은 없습니다", tag: "loop_uninitialized" }
      ] 
    },
    { 
      id: 'feedback', 
      q: "본인의 이력서에 대한 타인의 객관적인 비판을 수용할 준비가 되셨나요?", 
      options: [
        { t: "네, 적극적으로 수용하겠습니다", tag: "feedback_ready" }, 
        { t: "아니요, 조금은 부담스럽게 느껴집니다", tag: "feedback_defensive" }
      ] 
    },
    { 
      id: 'benchmark', 
      q: "실제 합격자들의 이력서나 포트폴리오의 기준점을 명확히 알고 계신가요?", 
      options: [
        { t: "네, 잘 알고 있습니다", tag: "benchmark_exist" }, 
        { t: "아니요, 아직 잘 모르겠습니다", tag: "benchmark_absent" }
      ] 
    },
    { 
      id: 'pressure', 
      q: "마감 직전의 압박감이 있을 때 본인의 업무 효율은 어떤 편인가요?", 
      options: [
        { t: "집중력이 높아지고 속도가 붙습니다", tag: "pressure_driver" }, 
        { t: "심리적으로 위축되어 실행이 어렵습니다", tag: "pressure_frozen" }
      ] 
    }
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
              <a href="#intro" className="hover:text-gray-500">프로그램 소개</a>
              <a href="#system" className="hover:text-gray-500">실행 시스템</a>
              <a href="#curriculum" className="hover:text-gray-500">커리큘럼</a>
              <a href="#data" className="hover:text-gray-500">성과 데이터</a>
              <a href="#price" className="hover:text-gray-500">참가비 안내</a>
              <a href="#faq" className="hover:text-gray-500">자주 묻는 질문</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={resetTest} className="hidden sm:block text-sm font-black underline underline-offset-4 decoration-2">3분 역량 판정</button>
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
            <a href="#intro" onClick={() => setIsMenuOpen(false)}>프로그램 소개</a>
            <a href="#system" onClick={() => setIsMenuOpen(false)}>실행 시스템</a>
            <a href="#curriculum" onClick={() => setIsMenuOpen(false)}>커리큘럼</a>
            <a href="#data" onClick={() => setIsMenuOpen(false)}>성과 데이터</a>
            <a href="#price" onClick={() => setIsMenuOpen(false)}>참가비 안내</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>자주 묻는 질문</a>
            <button onClick={resetTest} className="text-left text-red-600">3분 판정 바로가기</button>
            <button onClick={handleJoinClick} className="text-left text-black">프로그램 신청하기</button>
          </div>
        </div>
      )}

      {/* [LANDING VIEW] */}
      {view === 'landing' && (
        <main>
          {/* Hero Section */}
          <section className="pt-24 pb-32 px-6 border-b border-black text-center">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-bold tracking-[0.4em] uppercase mb-10 text-gray-400 text-center">Result-Oriented Execution System</p>
              <h1 className="text-5xl md:text-8xl font-black mb-12 leading-[1.05] tracking-tighter break-keep">
                전공은 충분히 공부했지만,<br />
                <span className="bg-black text-white px-4 inline-block transform -rotate-1">취업은 배운 적이 없기에.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-16 leading-relaxed break-keep max-w-3xl mx-auto font-medium">
                취업은 단순한 의지의 문제가 아닌 <strong>구조와 방법의 문제</strong>입니다.<br />
                방법론적 고민을 해결하고 한 달 안에 실제 지원까지 도달하게 만드는 CMC의 실전 가이드를 만나보세요.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <button onClick={handleJoinClick} className="bg-black text-white px-12 py-6 font-black text-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                  이번 달 실행 트랙 참여하기 <ArrowRight />
                </button>
                <button onClick={resetTest} className="border-2 border-black px-12 py-6 font-black text-xl hover:bg-black hover:text-white transition-all active:scale-95">
                  3분 역량 판정 시작하기
                </button>
              </div>
            </div>
          </section>

          {/* Current Status Comparison */}
          <section className="py-24 px-6 bg-gray-50 border-b border-black">
            <div className="max-w-5xl mx-auto">
              <p className="font-black text-sm mb-10 border-l-4 border-black pl-3 italic text-red-600">지금 시작해야 하는 이유: 준비가 길어질수록 취업의 기회비용은 높아집니다.</p>
              <div className="grid md:grid-cols-2 gap-0 border border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] bg-white">
                <div className="p-10 border-b md:border-b-0 md:border-r border-black">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4 block">Before CMC</span>
                  <h3 className="text-2xl font-black mb-4 italic">아직 부족한 것 같아 지원이 망설여져요.</h3>
                  <p className="text-gray-500 font-bold tracking-tight">지방대 전공생 A님 - 월 지원 횟수 0회</p>
                </div>
                <div className="p-10 bg-black text-white">
                  <span className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4 block">After 4 Weeks</span>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 bg-green-500 text-black text-xs font-black">SUCCESS</span>
                    <h3 className="text-2xl font-black text-green-400 italic">4주 만에 12개 기업 지원 완료, 면접 2회 확정</h3>
                  </div>
                  <p className="text-gray-400 font-bold tracking-tight">방법론 학습 → 실행 근육 형성 → 실제 결과 도출</p>
                </div>
              </div>
            </div>
          </section>

          {/* Assessment Section */}
          <section className="py-32 px-6 border-b border-black">
            <div className="max-w-4xl mx-auto text-center">
              <p className="font-black text-sm mb-4 border-l-4 border-black pl-3 mx-auto w-fit uppercase tracking-tighter">취업 시장 자생력 판정</p>
              <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight break-keep leading-tight">
                현재 본인이 취업 준비에 정체되어 있는 원인을<br />정확히 진단해 드립니다.
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
                <div className="p-8 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-black text-lg mb-6 leading-tight">1. 직무 역량을 비전공자에게 1분 안에 설명할 수 있나요?</p>
                  <div className="flex flex-col gap-2 text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400"></div> 네, 가능합니다</span>
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400"></div> 아니요, 조금 어렵습니다</span>
                  </div>
                </div>
                <div className="p-8 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-black text-lg mb-6 leading-tight">2. 최근 일주일간 지원하고 싶은 공고를 5개 이상 찾으셨나요?</p>
                  <div className="flex flex-col gap-2 text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400"></div> 네, 찾아보았습니다</span>
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400"></div> 아니요, 찾지 못했습니다</span>
                  </div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto bg-gray-50 border border-black p-6 mb-16 text-left">
                <p className="font-black text-xs uppercase tracking-widest mb-4 border-b border-black pb-2">판정 기준 안내</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] font-bold">
                  <div className="flex items-start gap-2"><span className="text-green-600">● PASS:</span> 실행 준비 완료. 즉시 지원 트랙 참여가 가능합니다.</div>
                  <div className="flex items-start gap-2"><span className="text-yellow-600">● HOLD:</span> 방법론 학습 권장. CMC 가이드 우선 학습을 추천합니다.</div>
                  <div className="flex items-start gap-2"><span className="text-red-600">● FAIL:</span> 마인드셋 재설정 필요. 기초 실행 근육 설계부터 시작합니다.</div>
                </div>
              </div>

              <button onClick={resetTest} className="bg-black text-white px-16 py-6 font-black text-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
                판정 결과 확인 및 다음 액션 제안받기
              </button>
            </div>
          </section>

          {/* Problem Definition */}
          <section id="intro" className="py-32 px-6 bg-black text-white overflow-hidden relative">
            <div className="max-w-5xl mx-auto relative z-10">
              <span className="text-xs font-bold tracking-[0.3em] uppercase mb-8 block text-gray-500">Problem Definition</span>
              <h2 className="text-6xl md:text-8xl font-black mb-24 leading-[0.9] tracking-tighter italic">
                취업 준비가<br />어렵게 느껴지는 <span className="text-red-600 underline decoration-white">진짜 이유</span> <span className="text-red-600">!</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-20">
                <div className="relative">
                  <span className="text-7xl font-black absolute -top-12 -left-6 text-white/5 italic">!</span>
                  <h3 className="text-3xl font-black mb-8 italic">정보는 넘치지만,<br />방법을 모릅니다.</h3>
                  <p className="text-gray-400 text-lg leading-relaxed break-keep font-medium">
                    지식이 부족해서 취업이 안 되는 것이 아닙니다. 이력서의 첫 문장을 어떻게 시작하고, 어느 시점에 지원 버튼을 눌러야 할지 모르는 <strong>방법론의 부재</strong>가 핵심입니다.
                  </p>
                </div>
                <div className="relative">
                  <span className="text-7xl font-black absolute -top-12 -left-6 text-white/5 italic">!</span>
                  <h3 className="text-3xl font-black mb-8 italic">왜 결과 중심의<br />구조인가요?</h3>
                  <p className="text-gray-400 text-lg leading-relaxed break-keep font-medium">
                    단순한 학습만으로는 취업이 되지 않습니다. CMC는 교육기관을 넘어선 <strong>성과 창출 시스템</strong>입니다. 한 달이라는 압축된 기간 동안 실제 지원과 결과 도출에 모든 역량을 집중합니다.
                  </p>
                </div>
              </div>

              <div className="mt-32 pt-20 border-t border-white/20">
                <h4 className="text-sm font-black uppercase tracking-[0.4em] mb-12 text-center italic">CMC 프로그램 운영 원칙</h4>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {[
                    { num: "01", text: "행동이 따르지 않는 지식은 성과를 만들 수 없습니다. (실행 비중 80%)" },
                    { num: "02", text: "동료와 함께할 때 강력한 데드라인이 완성됩니다." },
                    { num: "03", text: "한 달 뒤, 당신의 손에는 실제 지원 이력이 남게 됩니다." }
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
                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic text-center">의지에 의존하지 않는<br />결과 생산 시스템</h2>
                <p className="text-xl font-bold text-gray-400 italic text-center">망설임과 지연을 원천 차단하는 강력한 실행 로직</p>
              </div>

              <div className="grid md:grid-cols-2 gap-px bg-black border border-black shadow-[30px_30px_0px_0px_rgba(0,0,0,0.05)]">
                {[
                  { title: "데이터 기반 일정 관리", desc: "언젠가 하겠다는 막연함은 없습니다. 정해진 날짜와 시간까지 결과물을 제출해야만 다음 단계가 활성화됩니다.", icon: <Clock /> },
                  { title: "성과 중심 행동 설계", desc: "단순 시청이나 조사는 행동으로 간주하지 않습니다. 오직 이력서 업데이트와 지원 완료만이 유효한 성과로 인정됩니다.", icon: <Target /> },
                  { title: "철저한 미션 데드라인", desc: "데드라인을 준수하지 못할 경우 자료 접근 및 활동이 제한될 수 있습니다. 끝까지 완주할 수밖에 없는 환경을 제공합니다.", icon: <Lock /> },
                  { title: "실행 루틴의 체득", desc: "4주간의 반복 훈련을 통해 수료 후에도 스스로 취업 준비를 이끌어갈 수 있는 자생력을 길러드립니다.", icon: <RefreshCcw /> }
                ].map((s, i) => (
                  <div key={i} className="bg-white p-12 hover:bg-gray-50 transition-all">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-8">{s.icon}</div>
                    <h4 className="text-2xl font-black mb-4 italic underline decoration-4 underline-offset-4">{s.title}</h4>
                    <p className="text-gray-500 font-bold leading-relaxed break-keep">{s.desc}</p>
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
                <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter">
                  혼자 하면 준비에서 멈추지만,<br />함께 하면 <span className="italic underline decoration-8 underline-offset-4 decoration-black/10 text-red-600">지원까지</span> 도달합니다.
                </h2>
                <p className="text-lg text-gray-500 font-bold leading-relaxed mb-10 break-keep">
                  취업은 긴 호흡의 과정입니다. 홀로 준비할 때 빠지기 쉬운 주관성을 타파하고, 동료의 열정을 원동력 삼아 함께 나아갈 수 있는 피어 러닝 시스템을 제공합니다.
                </p>
                <ul className="space-y-4 font-black italic">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" /> 타 참여자들의 관심 공고 실시간 공유</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" /> 상호 피드백을 통한 이력서의 완성도 향상</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" /> 건강한 자극이 되는 주간 랭킹 시스템</li>
                </ul>
              </div>
              <div className="w-full md:w-1/3 aspect-square bg-white border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <div className="text-center">
                    <TrendingUp size={100} strokeWidth={3} className="mx-auto mb-4" />
                    <p className="text-3xl font-black italic text-center">LEVEL UP</p>
                </div>
              </div>
            </div>
          </section>

          {/* Roadmap */}
          <section id="curriculum" className="py-32 px-6 border-b border-black">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-black mb-6 tracking-tight italic text-center">압축적인 4주 실행 로드맵</h2>
                <p className="text-xl font-bold text-gray-400 italic text-center">성과가 증명되는 체계적인 주 3회 운영 흐름</p>
              </div>

              <div className="relative space-y-12">
                <div className="absolute top-0 bottom-0 left-[2.45rem] md:left-1/2 w-1 bg-black/5 -translate-x-1/2 hidden md:block"></div>
                {[
                  { week: "Week 01", title: "직무 역량의 데이터화", sub: "자산화된 이력서의 초안 설계", details: ["• 월: 본인의 전공 및 경험 데이터 분석", "• 수: 기업의 언어로 역량 재정의", "• 금: 이력서 초안 완성 및 검토"] },
                  { week: "Week 02", title: "타겟 매칭 및 실전 가동", sub: "채용 시장 분석 및 지원 루트 구축", details: ["• 월: 최적의 타겟 기업 리스트업", "• 수: 공고 핵심 키워드 매칭 최적화", "• 금: 첫 실전 지원 프로세스 수행"] },
                  { week: "Week 03", title: "고속 지원 프로세스", sub: "반복적인 지원 루틴의 내재화", details: ["• 월/수/금: 정기 지원 및 결과 트래킹", "• 중간 점검: 서류 피드백 실시간 반영", "• 목표: 누적 8건 이상의 유효 지원 달성"] },
                  { week: "Week 04", title: "최적화 및 홀로서기", sub: "면접 대비 및 지속 시스템 이양", details: ["• 월: 면접 답변을 위한 논리 구조 설계", "• 수: 최종 지원 데이터 및 성과 정리", "• 금: 프로그램 수료 및 자립 선언"] }
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
                ※ 수료 기준: 누적 지원 12건 이상 + 고도화된 이력서 1종 + 면접 대비 데이터셋 구축
              </div>
            </div>
          </section>

          {/* Data Proof */}
          <section id="data" className="py-32 px-6 bg-black text-white text-center">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-black mb-6 tracking-tight italic text-center">객관적인 데이터로 증명합니다</h2>
                <p className="text-xl font-bold text-gray-500 italic text-center">멈추지 않고 실행한 이들이 만든 놀라운 지표</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
                {[
                  { val: "92.4%", label: "4주 미션 완수율" },
                  { val: "15.2회", label: "참여자 평균 지원 횟수" },
                  { val: "41.0%", label: "서류 통과율 향상" },
                  { val: "3.2배", label: "기존 대비 지원 활동량 상승" }
                ].map((d, i) => (
                  <div key={i} className="text-center">
                    <p className="text-5xl md:text-7xl font-black mb-4 tracking-tighter italic text-green-400">{d.val}</p>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{d.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Comparison */}
          <section id="price" className="py-32 px-6 border-b border-black">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-black mb-6 tracking-tight italic text-center">압도적인 가치와 합리적인 비용</h2>
                <p className="text-xl font-bold text-gray-400 italic text-center">오직 성과를 위해 설계된 최적의 시스템</p>
              </div>

              <div className="grid md:grid-cols-3 gap-0 border border-black">
                <div className="p-10 border-b md:border-b-0 md:border-r border-black bg-gray-50 opacity-60">
                  <h4 className="font-black text-xl mb-2">기존 취업 컨설팅</h4>
                  <p className="text-sm font-bold text-gray-400 mb-8 tracking-tighter">200~300만 원 내외</p>
                  <ul className="space-y-4 text-xs font-bold text-gray-500">
                    <li className="flex items-start gap-2">• 단순 대리 작성 위주의 방식</li>
                    <li className="flex items-start gap-2">• 상담 중심의 느린 피드백</li>
                    <li className="flex items-start gap-2">• 의존도 심화로 자생력 부족</li>
                  </ul>
                </div>
                <div className="p-12 bg-black text-white relative transform md:scale-110 shadow-2xl z-10 border-x-2 border-black text-center">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest">Practical Solution</span>
                  <h4 className="font-black text-2xl mb-2">CMC JOB TRACK</h4>
                  <p className="text-4xl font-black mb-10 tracking-tighter text-green-400 italic">149,000원</p>
                  <ul className="space-y-4 text-sm font-black mb-12 italic text-left">
                    <li className="flex items-start gap-2">✅ 실전형 제로베이스 지원 가이드</li>
                    <li className="flex items-start gap-2">✅ 4주 강제 실행 및 미션 시스템</li>
                    <li className="flex items-start gap-2">✅ 스쿼드 전담 관리 및 상호 피드백</li>
                    <li className="flex items-start gap-2">✅ 자립 가능한 취업 루틴 형성</li>
                  </ul>
                  <button onClick={handleJoinClick} className="w-full bg-white text-black py-5 font-black text-lg hover:bg-gray-100 transition-all active:scale-95 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]">
                    이 특별한 비용으로 시작하기
                  </button>
                </div>
                <div className="p-10 border-t md:border-t-0 md:border-l border-black bg-gray-50 opacity-60">
                  <h4 className="font-black text-xl mb-2">일반 온라인 강의</h4>
                  <p className="text-sm font-bold text-gray-400 mb-8 tracking-tighter">10~20만 원 내외</p>
                  <ul className="space-y-4 text-xs font-bold text-gray-500">
                    <li className="flex items-start gap-2">• 단순 시청 중심 (낮은 완강률)</li>
                    <li className="flex items-start gap-2">• 강제성 및 사후 관리 시스템 부재</li>
                    <li className="flex items-start gap-2">• 실제 지원과의 연결고리 미흡</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-24 max-w-3xl mx-auto text-center">
                <p className="text-lg font-bold text-gray-500 leading-relaxed italic break-keep">
                    저희는 단순히 지식을 판매하는 것이 아닙니다. 기술과 동료 시스템을 결합하여 <strong>실행에 따르는 심리적·물리적 비용을 최소화</strong>했습니다.<br />
                    CMC에 투자하는 비용은 단순한 강의료가 아닌, 성공할 수밖에 없는 환경을 소유하는 비용입니다.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-32 px-6 bg-white border-b border-black">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-black mb-6 tracking-tight italic text-center">자주 묻는 질문</h2>
                <p className="text-xl font-bold text-gray-400 italic text-center">궁금하신 점을 확인해 보세요.</p>
              </div>
              <div className="space-y-4">
                {[
                  { q: "정말 한 달 만에 성과가 나오나요?", a: "네, CMC는 수료생의 92% 이상이 4주 안에 평균 12회 이상의 실제 지원을 완료합니다. 지원이라는 첫 단추를 꿰는 것이 성과의 시작입니다." },
                  { q: "누구든 참여할 수 있는 수준인가요?", a: "취업의 기초 방법론이 필요한 분, 정보 접근성이 낮은 분, 실행력의 보완이 필요한 전공자 등 열정 있는 모든 분에게 최적화되어 있습니다." },
                  { q: "중도에 포기하게 되면 어떻게 되나요?", a: "미션이 지연되거나 준수되지 않을 경우 시스템 접근이 제한될 수 있습니다. 이러한 철저한 구조가 여러분을 완주로 이끄는 가장 강력한 원동력이 됩니다." }
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

          {/* Philosophical Statement Section (NEW) */}
          <section className="py-40 px-6 bg-white overflow-hidden border-b border-black">
            <div className="max-w-5xl mx-auto text-center relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] -z-10"></div>
               
               <p className="text-xs font-black tracking-[0.6em] uppercase mb-12 text-gray-300">Our Core Philosophy</p>
               
               <div className="space-y-8">
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-gray-200 uppercase italic select-none">
                    WE DON'T GUARANTEE YOUR JOB.
                  </h2>
                  <div className="py-4">
                    <div className="h-px w-24 bg-black mx-auto"></div>
                  </div>
                  <h3 className="text-3xl md:text-6xl font-black tracking-tighter leading-tight break-keep italic">
                    우리는 당신의 취업을 보장하지 않습니다.
                  </h3>
                  <p className="text-xl md:text-3xl font-bold text-gray-400 italic break-keep leading-relaxed max-w-4xl mx-auto">
                    대신, 취업을 실제로 시작하지 못하는 상태에서는<br />
                    <span className="text-black underline decoration-8 decoration-black/5 underline-offset-4">절대 끝나지 않게 만듭니다.</span>
                  </p>
               </div>

               <div className="mt-20 flex justify-center gap-2">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
               </div>
            </div>
          </section>

          {/* Final Call to Action */}
          <section className="py-32 px-6 bg-black text-white text-center">
            <div className="max-w-4xl mx-auto">
               <h2 className="text-5xl md:text-7xl font-black mb-12 italic tracking-tighter">망설임의 마침표를 찍으세요</h2>
               <button onClick={handleJoinClick} className="bg-white text-black px-16 py-8 font-black text-3xl hover:bg-gray-100 transition-all active:scale-95 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]">
                  지금 바로 시작하기
               </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-20 px-6 bg-black text-white text-center border-t border-white/10">
             <div className="max-w-4xl mx-auto">
                <p className="text-3xl font-black italic mb-8">CMC JOB TRACK</p>
                <p className="text-gray-500 text-sm mb-12">© 2024 CMC. All rights reserved. 본 서비스는 취업 성과 증명을 위해 최선을 다합니다.</p>
                <div className="flex justify-center gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <a href="#" className="hover:text-white">이용약관</a>
                    <a href="#" className="hover:text-white">개인정보처리방침</a>
                    <a href="#" className="hover:text-white">문의하기</a>
                </div>
             </div>
          </footer>
        </main>
      )}

      {/* [TEST VIEW] */}
      {view === 'test' && (
        <div className="max-w-xl mx-auto pt-32 px-6">
           <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                 <span className="text-xs font-black tracking-widest text-gray-400 uppercase">Question {currentQ + 1} / {questions.length}</span>
                 <span className="text-2xl font-black italic">{( (currentQ + 1) / questions.length * 100).toFixed(0)}%</span>
              </div>
              <div className="h-1 bg-gray-100 w-full relative">
                 <div 
                    className="absolute top-0 left-0 h-full bg-black transition-all duration-500" 
                    style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                 ></div>
              </div>
           </div>
           
           <h2 className="text-3xl font-black mb-12 leading-tight break-keep">
              {questions[currentQ].q}
           </h2>
           
           <div className="flex flex-col gap-4">
              {questions[currentQ].options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(opt.tag)}
                  className="p-8 border-2 border-black text-left font-black text-xl hover:bg-black hover:text-white transition-all active:scale-95 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                >
                  {opt.t}
                </button>
              ))}
           </div>
        </div>
      )}

      {/* [ANALYZING VIEW] */}
      {view === 'analyzing' && (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
           <div className="max-w-md w-full text-center">
              <div className="mb-12 relative">
                 <div className="w-24 h-24 border-8 border-gray-100 border-t-black rounded-full animate-spin mx-auto"></div>
                 <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="text-2xl font-black mb-6 italic uppercase tracking-tighter">데이터 분석 및 판정 중입니다</h3>
              <div className="space-y-3">
                 {[
                   { step: 1, text: "직무 역량 구체화 수준 검토" },
                   { step: 2, text: "채용 시장 탐색 빈도 분석" },
                   { step: 3, text: "실행 루틴 및 데드라인 준수성 예측" },
                   { step: 4, text: "최종 취업 자생력 등급 산출" }
                 ].map((s) => (
                   <p key={s.step} className={`text-sm font-bold transition-opacity duration-300 ${analysisStep >= s.step ? 'opacity-100' : 'opacity-20'}`}>
                      {analysisStep >= s.step ? '✓' : '○'} {s.text}
                   </p>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* [RESULT VIEW] */}
      {view === 'result' && resultData && (
        <div className="max-w-3xl mx-auto py-32 px-6">
           <div className="border-4 border-black p-12 bg-white shadow-[24px_24px_0px_0px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-start mb-12 border-b-2 border-black pb-8">
                 <div>
                    <p className="text-xs font-black text-gray-400 mb-1 uppercase tracking-widest">Job Readiness Assessment</p>
                    <h2 className="text-4xl font-black italic">FINAL REPORT</h2>
                 </div>
                 <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Report ID: {reportId}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status: COMPLETED</p>
                 </div>
              </div>

              <div className="mb-16 text-center">
                 <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-[0.3em]">귀하의 취업 시장 자생력 판정 결과</p>
                 <h3 className={`text-9xl font-black italic mb-6 ${resultData.color}`}>
                    {resultData.status}
                 </h3>
                 <p className="text-xl font-bold leading-relaxed break-keep">
                    {resultData.status === 'PASS' && "실행력 준비가 완료되었습니다. 지금 바로 지원 트랙을 가동하셔도 좋습니다."}
                    {resultData.status === 'HOLD' && "기초적인 취업 방법론에 대한 학습이 선행되어야 합니다. 가이드 학습을 추천드립니다."}
                    {resultData.status === 'FAIL' && "현재 마인드셋과 실행 루틴의 근본적인 재설계가 필요합니다."}
                 </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                 <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest border-b border-black pb-2">Analysis Summary</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-sm font-bold">
                          <span>보완 필요 항목</span>
                          <span className="text-red-500">{resultData.negativeCount} / {questions.length}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm font-bold">
                          <span>예상 지원 성공률</span>
                          <span className="text-black">{resultData.status === 'PASS' ? '88%' : resultData.status === 'HOLD' ? '42%' : '12%'}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm font-bold">
                          <span>권장 다음 단계</span>
                          <span className="underline decoration-2">실전 지원 트랙</span>
                       </div>
                    </div>
                 </div>
                 <div className="p-8 bg-gray-50 border border-black italic">
                    <p className="text-xs font-black mb-4 uppercase text-gray-400 tracking-widest">Advice</p>
                    <p className="text-sm font-bold leading-relaxed break-keep">
                       {resultData.status === 'PASS' 
                         ? "귀하는 이미 훌륭한 실행 근육을 갖추고 계십니다. 이제는 준비가 아닌 지원의 횟수를 늘려 실제 시장의 반응을 확인해야 할 때입니다."
                         : "막연한 불안감은 정보의 부족이 아닌 실행의 부재에서 옵니다. CMC의 시스템을 통해 강제로 성과를 만드는 환경에 자신을 던져보세요."
                       }
                    </p>
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                 <button onClick={handleJoinClick} className="w-full bg-black text-white py-8 font-black text-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 active:scale-95">
                    판정 결과에 따른 솔루션 신청하기 <ArrowRight size={32} />
                 </button>
                 <button onClick={goToLanding} className="w-full border-2 border-black py-6 font-black text-lg hover:bg-black hover:text-white transition-all">
                    메인 페이지로 돌아가기
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
