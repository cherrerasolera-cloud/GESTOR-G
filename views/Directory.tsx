import React from 'react';
import { Search, MapPin, Star, MessageSquare, ThumbsUp } from 'lucide-react';

const ENTITIES = [
    { id: 1, name: 'EcoOil Solutions', type: 'Gestor Autorizado', rating: 4.8, reviews: 124, area: 'Norte' },
    { id: 2, name: 'BioCombustibles MX', type: 'Planta de Procesamiento', rating: 4.9, reviews: 85, area: 'Industrial' },
    { id: 3, name: 'ReciclaFácil', type: 'Recolector', rating: 4.5, reviews: 42, area: 'Centro' },
];

export const Directory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-white mb-2">Directorio de Gestión</h1>
           <p className="text-gray-400">Encuentra recolectores certificados, lee reseñas y califica su servicio.</p>
        </div>
        
        <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input 
                type="text" 
                placeholder="Buscar por nombre o zona..." 
                className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-white w-full md:w-64 focus:outline-none focus:border-primary"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ENTITIES.map((ent) => (
            <div key={ent.id} className="bg-surface border border-border p-5 rounded-xl hover:border-gray-500 transition-colors cursor-pointer group flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center font-bold text-gray-300">
                            {ent.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col items-end">
                             <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs font-medium mb-1">
                                <Star size={12} fill="currentColor" />
                                {ent.rating}
                            </div>
                            <span className="text-[10px] text-gray-500">{ent.reviews} reseñas</span>
                        </div>
                    </div>
                    <h3 className="text-white font-medium text-lg mb-1 group-hover:text-primary transition-colors">{ent.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{ent.type}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                        <MapPin size={14} />
                        Zona {ent.area}
                    </div>
                </div>

                <div className="pt-4 border-t border-border flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-background hover:bg-white/5 border border-border text-xs text-gray-300 flex items-center justify-center gap-2 transition-colors">
                        <MessageSquare size={14} />
                        Ver Reseñas
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 text-xs text-secondary flex items-center justify-center gap-2 transition-colors font-medium">
                        <ThumbsUp size={14} />
                        Calificar
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};