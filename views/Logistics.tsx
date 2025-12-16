import React, { useState, useMemo } from 'react';
import { RouteMap } from '../components/RouteMap';
import { NEARBY_GENERATORS } from '../constants';
import { Truck, Users, Leaf, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react';
import { RoutePoint } from '../types';

export const Logistics: React.FC = () => {
  // 'G1' is the current user, selected by default
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['G1']));

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      if (id !== 'G1') newSet.delete(id); // Prevent unselecting self
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  // Calculations
  const stats = useMemo(() => {
    const selected = NEARBY_GENERATORS.filter(g => selectedIds.has(g.id));
    const totalKg = selected.reduce((sum, g) => sum + g.currentLoadKg, 0);
    const count = selected.length;
    
    // Logic: Base pickup cost is $25. 
    // If grouped, efficiency increases.
    const baseCostPerUser = 25;
    const standardTotalCost = count * baseCostPerUser;
    
    // Shared route efficiency curve
    let efficiencyFactor = 1;
    if (count === 2) efficiencyFactor = 0.85; // 15% discount equivalent
    if (count > 2) efficiencyFactor = 0.70;   // 30% discount equivalent

    const optimizedTotalCost = standardTotalCost * efficiencyFactor;
    const savings = standardTotalCost - optimizedTotalCost;
    const co2Reduction = (count - 1) * 2.5; // Dummy factor: 2.5kg CO2 saved per stop shared vs individual trucks

    // Alert Logic
    const self = NEARBY_GENERATORS.find(g => g.id === 'G1');
    const isSelfLow = (self?.currentLoadKg || 0) < 20;
    const hasAnchor = selected.some(g => g.currentLoadKg >= 20);
    const isViable = !isSelfLow || (isSelfLow && hasAnchor);

    return {
      totalKg,
      count,
      savings,
      co2Reduction,
      isSelfLow,
      hasAnchor,
      isViable,
      efficiencyFactor
    };
  }, [selectedIds]);

  // Map Data Transformation
  const mapPoints: RoutePoint[] = useMemo(() => {
    const selected = NEARBY_GENERATORS.filter(g => selectedIds.has(g.id));
    
    // Convert to RoutePoint format
    const points: RoutePoint[] = selected.map(g => ({
      id: g.id,
      name: g.name,
      lat: g.lat,
      lng: g.lng,
      type: 'generator',
      demandKg: g.currentLoadKg
    }));

    // Always add Depot
    points.push({ id: 'DEPOT', name: 'Centro de Acopio', lat: 50, lng: 50, type: 'depot' });
    
    return points;
  }, [selectedIds]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Calculadora de Logística Colaborativa</h1>
          <p className="text-gray-500">Optimiza costos compartiendo recolecciones con establecimientos cercanos.</p>
        </div>
        
        {stats.isViable && (
          <button className="flex items-center gap-2 bg-secondary text-white font-bold px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors shadow-lg shadow-amber-500/20 animate-in fade-in">
            <Truck size={18} />
            Solicitar Recolección Compartida
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: SELECTION LIST (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-surface border border-border rounded-xl p-4 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
              <Users size={18} className="text-primary" />
              Establecimientos Cercanos
            </h3>
            <div className="space-y-2">
              {NEARBY_GENERATORS.map(gen => {
                const isSelected = selectedIds.has(gen.id);
                const isSelf = gen.id === 'G1';
                return (
                  <div 
                    key={gen.id}
                    onClick={() => toggleSelection(gen.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all relative overflow-hidden group
                      ${isSelected 
                        ? 'bg-secondary/5 border-secondary/50' 
                        : 'bg-background border-border hover:border-gray-400'
                      }`}
                  >
                    <div className="flex justify-between items-start z-10 relative">
                      <div className="flex items-center gap-3">
                         <div className={`w-4 h-4 rounded border flex items-center justify-center
                           ${isSelected ? 'bg-secondary border-secondary' : 'border-gray-400'}
                         `}>
                           {isSelected && <CheckCircle2 size={12} className="text-white" />}
                         </div>
                         <div>
                           <div className="text-sm font-medium text-gray-800 flex items-center gap-2">
                             {gen.name}
                             {isSelf && <span className="text-[10px] bg-primary/10 text-primary px-1.5 rounded font-bold">TÚ</span>}
                           </div>
                           <div className="text-xs text-gray-500">{gen.address} • {gen.distanceKm}km</div>
                         </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-mono font-bold ${gen.currentLoadKg < 20 ? 'text-orange-500' : 'text-emerald-600'}`}>
                          {gen.currentLoadKg} kg
                        </div>
                        <div className="text-[10px] text-gray-500">{gen.wasteType}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: VISUALIZATION & STATS (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* CALCULATOR RESULTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {/* CARD 1: VIABILITY */}
             <div className={`border rounded-xl p-4 flex flex-col justify-between shadow-sm
                ${!stats.isViable ? 'bg-red-50 border-red-200' : 'bg-surface border-border'}
             `}>
               <div className="flex items-start justify-between mb-2">
                 <span className="text-gray-500 text-xs uppercase font-medium">Estado de Recolección</span>
                 {!stats.isViable ? <AlertTriangle className="text-red-500" size={20} /> : <CheckCircle2 className="text-emerald-500" size={20} />}
               </div>
               
               {!stats.isViable ? (
                 <div>
                   <div className="text-red-600 font-bold text-sm mb-1">Volumen Insuficiente</div>
                   <p className="text-xs text-red-500 leading-tight">Tienes &lt;20kg. Selecciona un aliado con &gt;20kg para habilitar la ruta.</p>
                 </div>
               ) : (
                 <div>
                   <div className="text-gray-900 font-bold text-xl">{stats.totalKg} kg</div>
                   <p className="text-xs text-emerald-600">Volumen Asegurado</p>
                 </div>
               )}
             </div>

             {/* CARD 2: SAVINGS */}
             <div className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-gray-500 text-xs uppercase font-medium">Ahorro Estimado</span>
                  <DollarSign className="text-secondary" size={20} />
                </div>
                <div>
                   <div className="text-gray-900 font-bold text-xl">${stats.savings.toFixed(2)} USD</div>
                   {stats.count > 2 ? (
                     <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20">
                       Ruta Optimizada Activa
                     </span>
                   ) : (
                     <p className="text-xs text-gray-500">Agrega +2 usuarios para optimizar</p>
                   )}
                </div>
             </div>

             {/* CARD 3: ECO IMPACT */}
             <div className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-gray-500 text-xs uppercase font-medium">Impacto Evitado</span>
                  <Leaf className="text-primary" size={20} />
                </div>
                <div>
                   <div className="text-gray-900 font-bold text-xl">{stats.co2Reduction.toFixed(1)} kg CO2</div>
                   <p className="text-xs text-gray-500">Por ruta unificada</p>
                </div>
             </div>
          </div>

          {/* MAP VISUALIZATION */}
          <div className="relative">
             <RouteMap points={mapPoints} />
             
             {/* Floating Info Overlay */}
             <div className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-border p-3 rounded-lg max-w-[200px] shadow-md">
                <div className="text-xs text-gray-500 mb-1">Ruta Sugerida</div>
                <div className="flex items-center justify-between text-sm font-bold text-gray-900">
                   <span>{stats.count} Puntos</span>
                   <span className="text-secondary">~{(mapPoints.length * 15)} min</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};