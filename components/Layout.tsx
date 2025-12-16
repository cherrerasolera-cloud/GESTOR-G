import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Recycle, 
  Truck, 
  FileCheck, 
  Users, 
  Menu, 
  X
} from 'lucide-react';
import { NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onChangeView: (view: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Panel Principal', icon: LayoutDashboard },
  { id: 'waste', label: 'Registro Residuos', icon: Recycle },
  { id: 'logistics', label: 'Logística & Rutas', icon: Truck },
  { id: 'certificates', label: 'Cumplimiento Normativo & Perfil de Generador', icon: FileCheck },
  { id: 'directory', label: 'Directorio', icon: Users },
];

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onChangeView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-gray-600 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-surface fixed h-full z-20 shadow-sm">
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <span className="font-semibold text-gray-900 tracking-tight text-lg">Gestor G</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${activeView === item.id 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              <item.icon size={18} />
              <span className="truncate" title={item.label}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="bg-gray-50 border border-border rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Usuario Conectado</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-gray-700">0x71...3A92</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-30 bg-white/80 backdrop-blur-md border-b border-border p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-lg">Gestor G</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-background pt-20 px-4">
           <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg text-lg font-medium border
                  ${activeView === item.id 
                    ? 'bg-primary/10 text-primary border-primary/20' 
                    : 'border-transparent text-gray-500'
                  }`}
              >
                <item.icon size={24} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:pl-64 pt-20 md:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};