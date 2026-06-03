/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  UserCheck, 
  Globe, 
  Info, 
  Gift, 
  MapPin, 
  MessageSquare
} from 'lucide-react';

import casalImg from './assets/casal.png';
import logoImg from './assets/logo.png';

const IconButton = ({ 
  icon: Icon, 
  label, 
  href 
}: { 
  icon: any; 
  label: string; 
  href: string;
}) => {
  const isPrint = typeof window !== 'undefined' && window.location.search.includes('print=true');
  
  return (
    <a 
      href={href} 
      target={isPrint ? "_self" : "_blank"} 
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-start gap-2 group cursor-pointer relative"
    >
      {/* Invisible overlay to explicitly force PDF renderers to see a solid rectangular clickable area */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ backgroundColor: 'rgba(255,255,255,0.01)' }} 
        aria-hidden="true" 
      />
      
      <div className="w-14 h-14 shrink-0 rounded-full bg-editorial-muted/10 border border-editorial-muted/20 flex items-center justify-center text-editorial-muted group-hover:bg-editorial-dark group-hover:text-white transition-all duration-300 shadow-sm relative z-0">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[9px] font-bold uppercase tracking-widest text-editorial-dark/90 text-center leading-tight relative z-0">
        {label}
      </span>
    </a>
  );
};

export default function App() {
  const [showIframeModal, setShowIframeModal] = useState(false);

  useEffect(() => {
    if (window.location.search.includes('print=true')) {
      // Small delay to ensure styles and images (specially fonts) are fully loaded
      const timer = setTimeout(() => {
        window.print();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleExport = () => {
    try {
      if (window.self !== window.top) {
        // We are in an iframe (e.g. AI Studio Preview)
        // Try opening directly, but if popup blocked, state will help user
        const newWindow = window.open(window.location.pathname + '?print=true', '_blank');
        if (!newWindow) {
           setShowIframeModal(true);
        }
      } else {
        // Top level, safe to print directly
        setTimeout(() => window.print(), 100);
      }
    } catch (e) {
      setShowIframeModal(true);
    }
  };

  const weddingLinks = {
    site: "https://www.jesselipe.com.br/",
    rsvp: "https://www.jesselipe.com.br/#/rsvp",
    gifts: "https://www.jesselipe.com.br/#/gifts",
    specialGuests: "https://www.jesselipe.com.br/#/special-guests",
    messages: "https://www.jesselipe.com.br/#/messages",
    location: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqFQgBEC4YJxivARjHARiABBiKBRiOBTIGCAAQRRg5MhUIARAuGCcYrwEYxwEYgAQYigUYjgUyBwgCEAAYgAQyBwgDEAAYgAQyBwgEEAAYgAQyDQgFEC4YrwEYxwEYgAQyBwgGEAAYgAQyBwgHEAAYgAQyBwgIEAAYgATSAQg4MDYwajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=br&sa=X&geocode=KVFXmpRgMVqTMQPTWTIq_HkX&daddr=CA+Vicente+Pires+Col.+Agr%C3%ADcola+Vicente+Pires+-+Vicente+Pires,+Bras%C3%ADlia+-+DF"
  };

  return (
    <div className="min-h-screen bg-editorial-base flex flex-col items-center justify-start pb-20 print:pb-0 selection:bg-editorial-muted selection:text-white">
      {/* Floating Export PDF Button */}
      <button 
        onClick={handleExport}
        className="fixed bottom-6 right-6 z-50 print-hidden flex items-center gap-2 bg-editorial-dark text-white px-4 py-3 rounded-full shadow-lg hover:bg-editorial-dark/90 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span className="text-sm font-bold uppercase tracking-wider">Exportar PDF</span>
      </button>

      {/* Modal - only shows if popups are blocked inside iframe */}
      {showIframeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 print-hidden">
          <div className="bg-editorial-base p-8 rounded-xl max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setShowIframeModal(false)}
              className="absolute top-4 right-4 text-editorial-dark/50 hover:text-editorial-dark"
            >
              ✕
            </button>
            <h2 className="font-serif text-2xl mb-4 text-editorial-dark">Aviso de Exportação</h2>
            <p className="text-sm text-editorial-muted mb-6 leading-relaxed">
              O bloqueador de pop-ups impediu de abrir a impressão. Para exportar o convite como PDF mantendo os links funcionando, por favor abra a página em uma nova aba manualmente clicando abaixo:
            </p>
            <a 
              href={window.location.pathname + '?print=true'}
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setShowIframeModal(false)}
              className="block w-full text-center bg-editorial-dark text-white py-3 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-editorial-dark/90 transition-colors"
            >
              Abrir e Exportar
            </a>
          </div>
        </div>
      )}

      {/* Hero Image with Gradient Overlay */}
      <div className="relative w-full max-w-lg overflow-hidden h-[45vh] md:h-[50vh] print-hero bg-editorial-contrast">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          src={casalImg} 
          alt="Jéssica e Felipe" 
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error('Failed to load asset image, trying fallback...');
            // Fallback to absolute path just in case
            if (!target.src.includes('input_file_3.png')) {
               target.src = "input_file_3.png";
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-base via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Card Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full max-w-md px-8 text-center -mt-12 relative z-10 space-y-8"
      >
        {/* Names Heading */}
        <div className="space-y-2 pt-4">
          <h1 className="font-script text-6xl text-editorial-dark py-4 leading-tight">
            Jéssica <span className="text-3xl font-serif align-middle opacity-50">&</span> Felipe
          </h1>
        </div>

        {/* Date Block */}
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] font-bold text-editorial-dark/80">Agosto</p>
          
          <div className="flex items-center justify-center gap-6 border-y border-editorial-border py-4">
            <span className="text-xs uppercase tracking-widest font-bold text-editorial-dark opacity-80">Domingo</span>
            <span className="text-5xl font-serif text-editorial-dark">02</span>
            <span className="text-xs uppercase tracking-widest font-bold text-editorial-dark opacity-80">Às 16h</span>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-editorial-dark/80">Local</p>
            <p className="font-serif text-lg text-editorial-dark uppercase tracking-widest">Spazio Villa Regia</p>
            <div className="flex justify-center items-center gap-2 text-editorial-dark/60">
               <div className="w-8 h-px bg-editorial-border" />
               <MapPin className="w-4 h-4" />
               <div className="w-8 h-px bg-editorial-border" />
            </div>
            <p className="text-xs text-editorial-dark/80 font-light mt-1">Brasília — DF</p>
          </div>
        </div>

        {/* Interactive Grid */}
        <div className="pt-10 space-y-8">
          <p className="text-[9px] uppercase tracking-[0.4em] font-black text-editorial-dark/70 animate-pulse">
            Clique nos ícones para interagir
          </p>
          
          <div className="grid grid-cols-3 gap-y-10 gap-x-4">
            <IconButton 
              icon={UserCheck} 
              label="Confirmar Presença" 
              href={weddingLinks.rsvp} 
            />
            <IconButton 
              icon={Globe} 
              label="Site dos Noivos" 
              href={weddingLinks.site} 
            />
            <IconButton 
              icon={Info} 
              label="Informações do Convidado" 
              href={weddingLinks.specialGuests} 
            />
            <IconButton 
              icon={Gift} 
              label="Lista de Presentes" 
              href={weddingLinks.gifts} 
            />
            <IconButton 
              icon={MapPin} 
              label="Local da Cerimônia e Festa" 
              href={weddingLinks.location} 
            />
            <IconButton 
              icon={MessageSquare} 
              label="Mural de Recados" 
              href={weddingLinks.messages} 
            />
          </div>
        </div>
      </motion.main>

      <footer className="mt-16 print:mt-[50px] flex justify-center opacity-60">
         <img 
          src={logoImg} 
          alt="Monograma" 
          className="w-12 h-12 grayscale" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error('Failed to load asset logo, trying fallback...');
            if (!target.src.includes('input_file_0.png')) {
              target.src = "input_file_0.png";
            }
          }}
         />
      </footer>
    </div>
  );
}
