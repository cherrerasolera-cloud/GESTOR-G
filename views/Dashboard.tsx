import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Leaf, Recycle, Scale } from 'lucide-react';

const DATA = [
  { month: 'Jun', acu: 120, fog: 45, co2: 340 },
  { month: 'Jul', acu: 150, fog: 55, co2: 425 },
  { month: 'Ago', acu: 180, fog: 60, co2: 510 },
  { month: 'Sep', acu: 140, fog: 48, co2: 395 },
  { month: 'Oct', acu: 210, fog: 75, co2: 598 },
];

const StatCard: React.FC<{ 
  title: string; 
  value: string; 
  subtext: string; 
  icon: React.ElementType;
  trend?: string 
}> = ({ title, value, subtext, icon: Icon, trend }) => (
  <div className="bg-surface border border-border p-6 rounded-xl group hover:border-secondary/50 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-background rounded-lg border border-border group-hover:border-secondary/30 transition-colors">
        <Icon className="text-gray-400 group-hover:text-secondary transition-colors" size={20} />
      </div>
      {trend && <span className="text-primary text-xs font-mono bg-primary/10 px-2 py-1 rounded border border-primary/20">{trend}</span>}
    </div>
    <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <p className="text-xs text-gray-500 font-mono">{subtext}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Panel de Impacto</h1>
          <p className="text-gray-400 text-sm">Visión general de trazabilidad y métricas de generación</p>
        </div>
        <button className="bg-primary text-black hover:bg-emerald-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          Exportar Reporte Ambiental
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Residuos Gestionados" 
          value="800 kg" 
          subtext="Total acumulado (2023)" 
          icon={Recycle}
          trend="+12%"
        />
        <StatCard 
          title="Emisiones Evitadas" 
          value="2.28 t" 
          subtext="CO2 equivalente (LCA)" 
          icon={Leaf}
          trend="+8.5%"
        />
        <StatCard 
          title="Tasa de Recuperación" 
          value="98.5%" 
          subtext="Eficiencia de recolección" 
          icon={Scale}
        />
      </div>

      {/* Charts Section - Adjusted to single full-width chart */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Recycle size={16} className="text-secondary" />
          CANTIDAD GENERADA PROMEDIO EN KG/mes
        </h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: '#27272a'}}
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span style={{ color: '#9ca3af', fontSize: '12px' }}>{value}</span>}
              />
              <Bar dataKey="acu" fill="#D4AF37" radius={[4, 4, 0, 0]} name="Aceites (ACU)" />
              <Bar dataKey="fog" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Grasas (FOG)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};