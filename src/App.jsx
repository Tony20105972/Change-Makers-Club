import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Menu, 
  X, 
  Clock, 
  Target, 
  Lock, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  BarChart3, 
  HelpCircle, 
  ClipboardCheck,
  Zap,
  Layout,
  FileText,
  User,
  ExternalLink,
  RotateCcw,
  Activity,
  AlertTriangle,
  Quote
} from 'lucide-react';

// --- CONFIG & CONSTANTS ---
const JOIN_LINK = "https://forms.gle/uKVmthgsvtaHx9zg8";

const NAV_ITEMS = [
  { id: 'HOME', label: 'HOME' },
  { id: 'CMC', label: 'CHANGE MAKERS CLUB' },
  { id: 'PROGRAM', label: '프로그램' },
  { id: 'CURRICULUM', label: '커리큘럼' },
  { id: 'STORY', label: '멤버 스토리' },
  { id: 'FAQ', label: 'FAQ' },
];

const QUESTIONS = [
  { id: 'articulation', q: "내 직무 역량을 전공자가 아닌 사람에게 1분 안에 설명할 수 있나요?", options: [{ t: "네, 명확히 가능합니다", tag: "high" }, { t: "아직은 조금 막막합니다", tag: "low" }] },
  { id: 'exploration', q: "최근 1주일간 본인이 진짜 가고 싶은 공고를 5개 이상 찾았나요?", options: [{ t: "네, 리스트를 확보했습니다", tag: "high" }, { t: "아니오, 찾는 법을 모르겠습니다", tag: "low" }] },
  { id: 'trigger', q: "공고를 보고 '지금 바로 지원하기'를 누르는 데 가장 큰 걸림돌은?", options: [{ t: "준비가 덜 된 듯한 완벽주의", tag: "low" }, { t: "서류 작성의 기술적 부재", tag: "low" }, { t: "이미 망설임 없이 지원 중", tag: "high" }] },
  { id: 'loop', q: "스스로 정한 취업 루틴을 3일 이상 지속해본 경험이 최근에 있나요?", options: [{ t: "네, 루틴을 지키고 있습니다", tag: "high" }, { t: "아니오, 작심삼일이 반복됩니다", tag: "low" }] },
  { id: 'feedback', q: "내 서류에 대한 전문가의 냉정한 비판을 수용할 준비가 됐나요?", options: [{ t: "네, 성장을 위해 필요합니다", tag: "high" }, { t: "아니오, 상처받을까 두렵습니다", tag: "low" }] },
  { id: 'benchmark', q: "성공한 선배들의 실제 합격 이력서 기준점을 알고 있나요?", options: [{ t: "네, 기준을 알고 있습니다", tag: "high" }, { t: "아니오, 감으로 쓰고 있습니다", tag: "low" }] },
  { id: 'pressure', q: "마감 직전의 압박감이 올 때, 당신의 행동 양식은?", options: [{ t: "초집중하여 결과물 제출", tag: "high" }, { t: "부담감에 포기하거나 미룸", tag: "low" }] }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('HOME');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Diagnosis States
  const [diagStep, setDiagStep] = useState('intro'); // intro, testing, analyzing, result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleJoinClick = () => {
    window.open(JOIN_LINK, '_blank');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'DIAGNOSIS') setDiagStep('intro');
  };

  const startDiagnosis = () => {
    setDiagStep('testing');
    setCurrentQ(0);
    setAnswers([]);
  };

  const handleAnswer = (tag) => {
    const newAnswers = [...answers, tag];
    if (currentQ < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
    } else {
      setAnswers(newAnswers);
      setDiagStep('analyzing');
    }
  };

  useEffect(() => {
    if (diagStep === 'analyzing') {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setDiagStep('result'), 600);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [diagStep]);

  const diagnosisResult = useMemo(() => {
    const lowCount = answers.filter(a => a === 'low').length;
    if (lowCount <= 1) return { status: 'OPTIMIZED', color: 'text-black', desc: '현재 실행력과 도구 활용 능력이 최상위권입니다. CMC의 고속 트랙을 통해 즉각적인 결과 도출이 가능합니다.' };
    if (lowCount <= 4) return { status: 'POTENTIAL', color: 'text-zinc-600', desc: '기초 체력은 있으나 핵심 방법론이 부재합니다. CMC 가이드를 통해 지원 속도를 3배 이상 높여야 합니다.' };
    return { status: 'REBOOT', color: 'text-zinc-400', desc: '취업 마인드셋과 기본 도구 정비가 시급합니다. CMC의 강제 실행 환경에서 처음부터 다시 쌓아올려야 합니다.' };
  }, [answers]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-black selection:text-white antialiased">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-black/5 z-[100] h-20 shadow-sm">
        <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <span className="font-black text-2xl tracking-tighter cursor-pointer hover:opacity-70 transition-opacity" onClick={() => navigateTo('HOME')}>CMC.</span>
            <div className="hidden lg:flex gap-8">
              {NAV_ITEMS.map(item => (
                <button 
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-[12px] font-bold tracking-tight transition-all ${currentPage === item.id ? 'text-black scale-105 underline underline-offset-4 decoration-2' : 'text-zinc-400 hover:text-black'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('DIAGNOSIS')} className="hidden sm:block text-[12px] font-black px-5 py-2.5 rounded-full border border-black hover:bg-black hover:text-white transition-all shadow-sm">3분 진단</button>
            <button onClick={handleJoinClick} className="text-[12px] font-black bg-black text-white px-6 py-2.5 rounded-full hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg shadow-black/10">지금 신청하기 <ExternalLink size={14}/></button>
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[90] pt-32 px-10 lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col gap-8 text-3xl font-black italic tracking-tighter">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => navigateTo(item.id)} className="text-left hover:translate-x-2 transition-transform">{item.label}</button>
            ))}
            <div className="h-[1px] bg-black/10 my-4" />
            <button onClick={() => navigateTo('DIAGNOSIS')} className="text-left text-zinc-400">3분 진단</button>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="pt-20">
        {currentPage === 'HOME' && <HomePage onDiagnosis={() => navigateTo('DIAGNOSIS')} onJoin={handleJoinClick} />}
        {currentPage === 'CMC' && <CmcPage />}
        {currentPage === 'PROGRAM' && <ProgramPage />}
        {currentPage === 'CURRICULUM' && <CurriculumPage />}
        {currentPage === 'STORY' && <StoryPage />}
        {currentPage === 'FAQ' && <FaqPage />}
        {currentPage === 'DIAGNOSIS' && (
          <DiagnosisSection 
            step={diagStep} 
            currentQ={currentQ} 
            onStart={startDiagnosis} 
            onAnswer={handleAnswer} 
            progress={analysisProgress}
            result={diagnosisResult}
            onReset={() => setDiagStep('intro')}
            onJoin={handleJoinClick}
          />
        )}
      </div>

      <footer className="bg-white border-t border-black/5 py-32 px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="font-black text-3xl tracking-tighter opacity-20">CHANGE MAKERS CLUB</div>
          <p className="text-sm font-medium text-zinc-400 italic">오직 결과로만 증명하는 실행가들의 커뮤니티</p>
          <div className="flex justify-center gap-6 grayscale opacity-50">
             <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center font-black">C</div>
             <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center font-black">M</div>
             <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center font-black">C</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const HomePage = ({ onDiagnosis, onJoin }) => (
  <div className="max-w-[1200px] mx-auto px-6">
    <section className="py-40 text-center relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-zinc-100 to-transparent -z-10 rounded-full blur-3xl opacity-30" />
      
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-100 rounded-full text-[10px] font-black tracking-[0.2em] mb-12 uppercase text-zinc-500 shadow-sm border border-white">
        <Clock size={12} className="text-black"/> 4-Week Execution Track
      </div>
      
      <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-14 leading-[0.95] text-zinc-900">
        전공은 공부했지만,<br />
        <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] italic">취업은 배운 적 없으니까.</span>
      </h1>
      
      <p className="text-xl md:text-2xl font-bold text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-16 break-keep italic">
        취업은 의지의 문제가 아닌 구조와 방법의 문제입니다.<br />
        <span className="text-black">한 달 안에 실제 지원까지 도달하게 만드는</span> CMC의 실전 프로세스.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
        <button onClick={onJoin} className="w-full sm:w-auto bg-black text-white px-12 py-6 text-xl font-black rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-black/20 hover:-translate-y-1">
          지금 신청하기 <ArrowRight />
        </button>
        <button onClick={onDiagnosis} className="w-full sm:w-auto bg-white border border-zinc-200 px-12 py-6 text-xl font-black rounded-2xl hover:border-black transition-all shadow-xl shadow-black/[0.03] hover:-translate-y-1">
          3분 진단
        </button>
      </div>
    </section>

    <section className="py-40 border-y border-black/5">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <h2 className="text-5xl font-black tracking-tighter leading-tight italic">
            "우리는 '열심히'를<br />
            가르치지 않습니다."
          </h2>
          <div className="h-1.5 w-20 bg-black" />
          <p className="text-xl font-medium text-zinc-400 leading-relaxed break-keep">
            단순한 지식 습득을 넘어, 당신의 막연한 불안감을 <span className="text-black font-bold">'지원서 제출'</span>이라는 수치화된 결과로 치환합니다.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: '실행률', value: '94.2%', icon: <Zap size={20}/> },
            { label: '평균 지원수', value: '15건+', icon: <Target size={20}/> },
            { label: '서류 합격률', value: '3.2배↑', icon: <BarChart3 size={20}/> },
            { label: '네트워킹', value: '500명+', icon: <Users size={20}/> },
          ].map((stat, i) => (
            <div key={i} className="p-8 bg-white rounded-[32px] border border-black/5 shadow-2xl shadow-black/[0.02] flex flex-col justify-between aspect-square hover:border-black/10 transition-colors">
              <div className="text-zinc-300">{stat.icon}</div>
              <div>
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const DiagnosisSection = ({ step, currentQ, onStart, onAnswer, progress, result, onReset, onJoin }) => {
  if (step === 'intro') {
    return (
      <div className="max-w-2xl mx-auto py-32 px-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="bg-white rounded-[40px] p-16 shadow-2xl shadow-black/[0.05] border border-black/5 text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
            <ClipboardCheck size={180} />
          </div>
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Diagnostic Tool</span>
            <h1 className="text-6xl font-black italic tracking-tighter">3분 진단</h1>
            <p className="text-zinc-500 font-medium italic">당신은 지금 당장 시장에 투입될 준비가 되었습니까?</p>
          </div>
          <div className="h-[1px] bg-zinc-100" />
          <ul className="text-left space-y-5">
            {[
              "직무 역량의 시장 언어화 지수 측정",
              "지원 프로세스 장애 요인 발견",
              "CMC 적합성 및 맞춤형 로드맵 제안"
            ].map((text, i) => (
              <li key={i} className="flex gap-4 items-center text-sm font-bold text-zinc-600 italic">
                <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-black">{i+1}</div>
                {text}
              </li>
            ))}
          </ul>
          <button onClick={onStart} className="w-full bg-black text-white py-6 rounded-2xl text-xl font-black hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-black/10">
            진단 시작하기 <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (step === 'testing') {
    const q = QUESTIONS[currentQ];
    return (
      <div className="max-w-2xl mx-auto py-32 px-6">
        <div className="space-y-12">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">QUESTION {currentQ + 1} / {QUESTIONS.length}</span>
            <div className="h-1.5 w-40 bg-zinc-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-black transition-all duration-500" style={{width: `${((currentQ + 1) / QUESTIONS.length) * 100}%`}}></div>
            </div>
          </div>
          <h2 className="text-4xl font-black tracking-tighter leading-tight italic break-keep bg-gradient-to-r from-black to-zinc-500 bg-clip-text text-transparent min-h-[120px]">{q.q}</h2>
          <div className="grid gap-4">
            {q.options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => onAnswer(opt.tag)}
                className="p-10 bg-white border border-zinc-200 rounded-[30px] text-left font-black text-xl hover:border-black hover:shadow-2xl hover:shadow-black/[0.05] transition-all active:scale-[0.98] group flex justify-between items-center shadow-lg shadow-black/[0.01]"
              >
                <span>{opt.t}</span>
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <ChevronRight size={18} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <div className="max-w-2xl mx-auto py-56 px-6 text-center space-y-12 animate-pulse">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 border-4 border-zinc-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-black rounded-full animate-spin border-t-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity size={40} className="text-black" />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-black italic tracking-tighter">데이터 시뮬레이션 중...</h2>
          <div className="font-mono text-[11px] text-zinc-400 space-y-2 uppercase tracking-tighter">
            <p className={`${progress > 20 ? 'text-black' : 'opacity-20'}`}>[SYSTEM] Scanning Career DNA...</p>
            <p className={`${progress > 50 ? 'text-black' : 'opacity-20'}`}>[SYSTEM] Analyzing Market Fit...</p>
            <p className={`${progress > 85 ? 'text-black' : 'opacity-20'}`}>[SYSTEM] Finalizing Report...</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6">
        <div className="bg-white rounded-[50px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="bg-black p-16 text-white text-center space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-50">Confidential Report</span>
            <h1 className="text-7xl font-black italic tracking-tighter">진단 완료</h1>
          </div>

          <div className="p-16 space-y-20">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-zinc-100 pb-20">
              <div className="space-y-4">
                <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Candidate Status</p>
                <div className="flex items-baseline gap-4">
                  <h2 className={`text-9xl font-black italic tracking-tighter ${result.color}`}>{result.status}</h2>
                  <div className="w-4 h-4 rounded-full bg-black animate-pulse shadow-[0_0_15px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
              <div className="max-w-sm space-y-6">
                 <Quote className="text-zinc-100" size={48} fill="currentColor"/>
                 <p className="text-2xl font-bold leading-tight italic text-zinc-800 break-keep">{result.desc}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="p-10 rounded-[40px] bg-zinc-50 space-y-6 border border-zinc-100 shadow-inner">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-zinc-400" />
                  <h4 className="text-xs font-black uppercase tracking-widest">주요 강점</h4>
                </div>
                <p className="font-bold text-zinc-600 leading-relaxed italic break-keep">
                  잠재적인 직무 지식은 충분하나 이를 시장의 가치로 변환하는 '트랜스레이션' 능력이 요구됩니다. 올바른 시스템만 받쳐준다면 폭발적인 지원이 가능한 상태입니다.
                </p>
              </div>
              <div className="p-10 rounded-[40px] bg-white border border-black/5 shadow-2xl shadow-black/[0.02] space-y-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-zinc-400" />
                  <h4 className="text-xs font-black uppercase tracking-widest">취약 요인</h4>
                </div>
                <p className="font-bold text-zinc-600 leading-relaxed italic break-keep">
                  '완벽하게 준비된 뒤에 지원하겠다'는 완벽주의적 함정이 가장 큰 리스크입니다. 지금 당장 결과물을 내놓고 피드백을 받아야 할 시점입니다.
                </p>
              </div>
            </div>

            <div className="bg-black text-white rounded-[40px] p-12 text-center space-y-10 shadow-2xl shadow-black/30">
              <div className="space-y-3">
                <h3 className="text-3xl font-black italic tracking-tight">당신을 위한 최적의 솔루션</h3>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-[11px]">CMC 4-Week Job Track Admission</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={onJoin} className="flex-1 bg-white text-black py-6 rounded-2xl text-2xl font-black hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 shadow-lg">
                  리포트 소장 & 신청하기 <ArrowRight />
                </button>
                <button onClick={onReset} className="px-8 border border-white/20 rounded-2xl font-black hover:bg-white/10 transition-all flex items-center justify-center">
                  <RotateCcw size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const CmcPage = () => (
  <div className="max-w-[1000px] mx-auto py-40 px-6 space-y-40 animate-in fade-in duration-700">
    <section className="space-y-16">
      <div className="space-y-4">
         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Brand Identity</span>
         <h1 className="text-7xl font-black italic tracking-tighter leading-[0.9]">결과로 말하는<br />클럽, CMC.</h1>
      </div>
      <div className="grid md:grid-cols-[300px_1fr] gap-20 items-start">
        <div className="h-full border-l-2 border-black pl-10">
          <p className="text-xl font-black italic leading-tight text-zinc-600">"우리는 실행하지 않는 잠재력은 가치가 없다고 믿습니다."</p>
        </div>
        <div className="space-y-12">
          <p className="text-2xl font-bold text-zinc-400 leading-relaxed italic break-keep">
            CMC는 단순히 정보를 공유하는 곳이 아닙니다. 같은 목표를 가진 동료들이 모여 서로의 데드라인이 되어주는 <span className="text-black">'결과 생산 엔진'</span>입니다.
          </p>
        </div>
      </div>
    </section>
  </div>
);

const ProgramPage = () => (
  <div className="max-w-[1200px] mx-auto py-40 px-6 space-y-32">
    <div className="text-center space-y-4">
      <h2 className="text-5xl font-black italic tracking-tighter uppercase">Infrastructure</h2>
      <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Shine Center & Execution Systems</p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-white rounded-[40px] p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col justify-between aspect-square">
        <div className="space-y-8">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
            <Layout size={32} />
          </div>
          <h3 className="text-4xl font-black italic tracking-tight leading-tight">샤인 센터<br />(Shine Center)</h3>
          <p className="text-zinc-400 font-bold leading-relaxed italic">
            오프라인 몰입 환경과 온라인 협업 툴이 결합된 CMC만의 독자적인 실행 베이스캠프입니다.
          </p>
        </div>
        <div className="pt-10 flex flex-wrap gap-3">
          {["실시간 집계", "피어 리뷰", "디렉터 코칭"].map(tag => (
            <span key={tag} className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-full text-[11px] font-black uppercase tracking-widest text-zinc-400">{tag}</span>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-[40px] p-16 shadow-2xl shadow-black/40 text-white flex flex-col justify-between aspect-square">
        <div className="space-y-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black shadow-xl shadow-white/10">
            <Activity size={32} />
          </div>
          <h3 className="text-4xl font-black italic tracking-tight leading-tight text-white">CMC 고속 엔진<br />(Execution Engine)</h3>
          <p className="text-zinc-500 font-bold leading-relaxed italic">
            개인의 루틴을 시스템화하고, 지원 현황을 데이터로 투명하게 공유하여 성과를 가속합니다.
          </p>
        </div>
        <div className="pt-10 flex flex-wrap gap-3">
          {["루틴 트래킹", "지원 로그", "성과 리포트"].map(tag => (
            <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-black uppercase tracking-widest text-zinc-500">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CurriculumPage = () => (
  <div className="max-w-[1000px] mx-auto py-40 px-6">
    <div className="mb-32 space-y-4">
      <h2 className="text-6xl font-black italic tracking-tighter uppercase">Roadmap</h2>
      <p className="text-zinc-400 font-bold uppercase tracking-[0.3em] text-[10px]">4-Week Intensive Curriculum</p>
    </div>
    
    <div className="space-y-12">
      {[
        { week: "01", title: "취업 문법 재정의", desc: "자신의 커리어를 시장이 원하는 '수익성 언어'로 재구성합니다. 1주 차에 완성하는 이력서의 뼈대.", tags: ["역량 추출", "포지셔닝"] },
        { week: "02", title: "타겟팅 & 엔진 최적화", desc: "무분별한 지원이 아닌, 합격 확률이 높은 공고를 찾아내는 알고리즘과 지원 루트 확보.", tags: ["공고 탐색", "시장 분석"] },
        { week: "03", title: "압도적 고속 실행", desc: "CMC의 강제 환경 속에서 주간 3회 이상의 실전 지원 루틴을 완전 체화합니다.", tags: ["실전 지원", "피드백 루프"] },
        { week: "04", title: "결과 최적화 & 이양", desc: "면접 산출물 최종 점검 및 프로그램 종료 후에도 스스로 생존할 수 있는 시스템 이양.", tags: ["면접 대비", "자생력 확보"] }
      ].map((item, i) => (
        <div key={i} className="group relative bg-white rounded-[40px] p-12 border border-black/5 shadow-xl shadow-black/[0.02] hover:border-black transition-all hover:-translate-y-1">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <span className="text-7xl font-black italic text-zinc-100 group-hover:text-black transition-colors leading-none">{item.week}</span>
            <div className="flex-1 space-y-6">
               <h3 className="text-3xl font-black italic tracking-tight">{item.title}</h3>
               <p className="text-zinc-400 font-bold leading-relaxed break-keep italic">{item.desc}</p>
               <div className="flex gap-2">
                 {item.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-zinc-50 rounded-lg text-[10px] font-black text-zinc-300 border border-zinc-100 uppercase">{tag}</span>
                 ))}
               </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StoryPage = () => (
  <div className="max-w-[1200px] mx-auto py-40 px-6">
    <div className="text-center mb-32 space-y-4">
      <h2 className="text-5xl font-black italic tracking-tighter uppercase">Members</h2>
      <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Transformational Stories</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {[
        { name: "K님", result: "국내 대형 에이전시 최종 합격", before: "6개월간 지원 0건, 완벽주의의 늪", after: "4주 차에 지원 12건, 동시 합격 2곳", tag: "디자이너" },
        { name: "J님", result: "IT 유니콘 기업 서류 통과", before: "자신의 역량에 대한 확신 부재", after: "역량 언어화 후 서류 합격률 400% 상승", tag: "PM" }
      ].map((story, i) => (
        <div key={i} className="bg-white rounded-[50px] p-16 border border-black/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] space-y-10 group transition-all">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h4 className="text-2xl font-black italic">{story.name}</h4>
              <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">{story.tag}</span>
            </div>
            <span className="px-4 py-1.5 bg-black text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-black/10">Case Study</span>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-[10px] font-black text-zinc-200 uppercase tracking-tighter">Challenge</div>
              <p className="font-bold text-zinc-400 italic break-keep leading-relaxed">"{story.before}"</p>
            </div>
            <div className="p-8 bg-zinc-50 rounded-[30px] border border-zinc-100 shadow-inner">
               <div className="text-[10px] font-black text-zinc-300 uppercase mb-2">Outcome</div>
               <p className="text-xl font-black italic tracking-tight text-black">{story.result}</p>
               <p className="text-sm font-bold text-zinc-400 mt-2 italic">{story.after}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FaqPage = () => (
  <div className="max-w-[800px] mx-auto py-40 px-6">
    <div className="text-center mb-32 space-y-4">
      <h2 className="text-5xl font-black italic tracking-tighter uppercase">FAQ</h2>
      <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Common Questions</p>
    </div>
    
    <div className="space-y-6">
      {[
        { q: "정말 한 달 만에 지원이 가능한가요?", a: "네. CMC의 시스템은 주차별 산출물이 지원 공고와 직결되도록 설계되어 있습니다. 3주차부터는 강제적으로 지원 루틴이 가동됩니다." },
        { q: "프로그램 참여 시간은 어느 정도인가요?", a: "기존의 업무나 학업과 병행이 가능합니다. 하지만 주간 미션과 데드라인을 지키기 위한 최소한의 몰입 시간은 필수적입니다." },
        { q: "합격을 보장하나요?", a: "아니오. 하지만 합격할 확률이 가장 높은 '지원 상태'가 되는 것은 확실히 보장합니다." }
      ].map((item, i) => (
        <details key={i} className="group bg-white rounded-[30px] border border-black/5 shadow-xl shadow-black/[0.01] overflow-hidden transition-all duration-300">
          <summary className="p-10 flex justify-between items-center cursor-pointer list-none font-black text-xl italic tracking-tight select-none">
            <div className="flex gap-6 items-center">
              <span className="text-zinc-200 italic">Q.</span>
              <span>{item.q}</span>
            </div>
            <div className="group-open:rotate-180 transition-transform text-zinc-300">
              <ChevronRight />
            </div>
          </summary>
          <div className="px-10 pb-10 pl-[88px] text-zinc-400 font-bold leading-relaxed italic border-t border-zinc-50 pt-6 break-keep">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  </div>
);

export default App;
