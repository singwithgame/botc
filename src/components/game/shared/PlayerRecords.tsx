import { memo, useState, useEffect } from 'react';

interface PlayerRecordsProps {
  messageHistory?: string[];
  defaultOpen?: boolean;
}

export const PlayerRecords = memo(({
  messageHistory,
  defaultOpen = false
}: PlayerRecordsProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className="bg-card rounded-[2.5rem] border border-border backdrop-blur shadow-card overflow-hidden w-full transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        aria-expanded={isOpen}
        className="w-full p-6 sm:p-8 flex items-center justify-between hover:bg-muted transition-all group focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
      >
        <div className="flex items-center gap-4 sm:gap-5">
           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-xl sm:text-2xl shadow-inner group-hover:scale-110 transition-transform" aria-hidden="true">📜</div>
           <div className="text-left">
              <span className="text-base sm:text-lg font-black text-foreground tracking-tight uppercase font-serif">기록 아카이브</span>
           </div>
        </div>
        <span 
          className={`text-muted-foreground transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </button>

      {isOpen && (
        <div className="p-6 sm:p-8 pt-0 space-y-4 animate-fade-in border-t border-border mt-2 bg-background">
           <div className="space-y-3 mt-4 sm:mt-6 pr-2">
              {messageHistory && messageHistory.length > 0 ? (
                 messageHistory.map((msg, i) => (
                   <div key={i} className="p-4 sm:p-5 bg-card rounded-[1.25rem] border border-border shadow-lg text-sm sm:text-base text-foreground italic font-serif leading-relaxed relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors"></div>
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                         <span className="text-xs sm:text-xs font-black text-indigo-400/60 uppercase tracking-[0.2em]">기록 #{i + 1}</span>
                         <span className="text-xs font-bold text-muted-foreground font-mono text-xs uppercase">밤 {i + 1}</span>
                      </div>
                      <div className="pl-1 sm:pl-2 space-y-1">
                         {msg.split('\n').filter(line => !line.trim().endsWith('없음')).length > 0 ? (
                           msg.split('\n').filter(line => !line.trim().endsWith('없음')).map((line, j) => (
                             <p key={j}>{line}</p>
                           ))
                         ) : (
                           <p className="text-muted-foreground italic">특이사항 없음</p>
                         )}
                      </div>
                   </div>
                 ))
              ) : (
                 <div className="py-10 sm:py-12 px-6 text-center border-2 border-dashed border-border rounded-[2rem] bg-background shadow-inner">
                   <p className="text-muted-foreground font-black uppercase tracking-widest text-xs sm:text-xs font-serif">복구된 기록이 없습니다.</p>
                 </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
});

PlayerRecords.displayName = 'PlayerRecords';
