import React, { useState, useMemo } from 'react';
import { MOCK_PROFILE, COMPLIANCE_CHECKLIST, MOCK_WASTEWATER_REPORTS } from '../constants';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Eye, 
  FileSpreadsheet,
  Building,
  CalendarCheck,
  Download,
  XCircle,
  X,
  Users,
  Wrench,
  TestTube2,
  AlertTriangle,
  Lightbulb,
  Droplets
} from 'lucide-react';
import { MonthlyReport, WastewaterReport } from '../types';

interface CertificatesProps {
  reports: MonthlyReport[];
  onUpdateReport: (monthIndex: number, amount: number) => void;
}

export const Certificates: React.FC<CertificatesProps> = ({ reports, onUpdateReport }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'repository'>('repository');
  const [selectedReport, setSelectedReport] = useState<MonthlyReport | null>(null);
  
  // Update function used for manual overrides if needed
  const handleUpdateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport || selectedReport.kgGenerated === null) return;
    
    onUpdateReport(selectedReport.monthIndex, selectedReport.kgGenerated);
    setSelectedReport(null);
    alert("Reporte actualizado manualmente.");
  };

  // Determine EPA Registration Status
  const isRegistered = COMPLIANCE_CHECKLIST.find(c => c.id === '1')?.isComplete;

  // Maintenance Plan Logic
  const maintenanceStatus = useMemo(() => {
    const lastDate = new Date(MOCK_PROFILE.ultimoMantenimiento);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + MOCK_PROFILE.frecuenciaMantenimientoDias);
    
    const today = new Date();
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      last: MOCK_PROFILE.ultimoMantenimiento,
      next: nextDate.toISOString().split('T')[0],
      daysRemaining: diffDays,
      isOverdue: diffDays < 0,
      isDueSoon: diffDays >= 0 && diffDays <= 3
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
             {activeTab === 'repository' ? 'Reporte Consolidado EPA' : 'Perfil del Establecimiento'}
          </h1>
          <p className="text-gray-500">
             {activeTab === 'repository' 
                ? 'Vista unificada de cumplimiento normativo y soportes de recolección.' 
                : 'Gestión de infraestructura, mantenimiento y caracterización de vertimientos.'}
          </p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 border border-border">
          <button 
            onClick={() => setActiveTab('repository')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'repository' ? 'bg-white text-secondary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Reporte Mensual
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'profile' ? 'bg-white text-secondary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Datos del Generador
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {activeTab === 'repository' && (
            <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
               <div className="p-4 border-b border-border flex justify-between items-center bg-gray-50">
                 <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                   <CalendarCheck size={18} className="text-secondary" />
                   Consolidado 2023
                 </h3>
                 <button className="text-xs flex items-center gap-1 text-primary hover:text-emerald-700 border border-primary/20 px-2 py-1 rounded bg-white transition-colors">
                    <FileSpreadsheet size={14} />
                    Descargar Excel EPA
                 </button>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-border">
                      <tr>
                        <th className="px-6 py-3">Mes</th>
                        <th className="px-6 py-3">Cantidad (Kg)</th>
                        <th className="px-6 py-3">Soporte</th>
                        <th className="px-6 py-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.month} className="border-b border-border hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{report.month}</td>
                          <td className="px-6 py-4 font-mono text-gray-600">
                            {report.kgGenerated !== null ? (
                                <span className="text-gray-900 font-bold">{report.kgGenerated} kg</span>
                            ) : '-'}
                          </td>
                          <td className="px-6 py-4">
                              {report.fileUrl ? (
                                  <a href="#" className="flex items-center gap-1 text-xs text-secondary hover:underline">
                                      <FileText size={14} />
                                      {report.fileUrl.length > 15 ? report.fileUrl.substring(0,12)+'...' : report.fileUrl}
                                  </a>
                              ) : (
                                  <span className="text-gray-400 text-xs italic">No cargado</span>
                              )}
                          </td>
                          <td className="px-6 py-4">
                             {report.status === 'VERIFIED' && (
                               <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                                 <ShieldCheck size={12} /> Completo
                               </span>
                             )}
                             {report.status === 'UPLOADED' && (
                               <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                                 <FileText size={12} /> Cargado
                               </span>
                             )}
                             {report.status === 'PENDING' && (
                               <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                 <AlertCircle size={12} /> Pendiente
                               </span>
                             )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          )}

          {activeTab === 'profile' && (
             <div className="space-y-6">
                
                {/* 1. ESTABLISHMENT & CONTACT INFO */}
                <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                       <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                           <Building size={24} />
                       </div>
                       <div>
                           <h3 className="text-lg font-semibold text-gray-900">Información del Establecimiento</h3>
                           <p className="text-sm text-gray-500">Datos registrados ante la autoridad y contacto operativo.</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <ProfileField label="Razón Social" value={MOCK_PROFILE.razonSocial} />
                        <ProfileField label="NIT / RUT" value={MOCK_PROFILE.nit} />
                        <ProfileField label="Dirección Sede" value={`${MOCK_PROFILE.direccion}, ${MOCK_PROFILE.municipio}`} />
                        <ProfileField label="Representante Legal" value={MOCK_PROFILE.repLegal} />
                        <ProfileField label="Actividad (CIIU)" value={`${MOCK_PROFILE.ciiu} - ${MOCK_PROFILE.actividad}`} />
                        <ProfileField label="Acto Administrativo" value={MOCK_PROFILE.actoAdministrativo} highlight />
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Users size={16} className="text-gray-500" />
                            Equipo Responsable
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="bg-gray-50 p-3 rounded-lg border border-border">
                                 <div className="text-xs text-gray-500 uppercase">Encargado de Plataforma</div>
                                 <div className="text-gray-900 font-medium">{MOCK_PROFILE.encargadoPlataforma}</div>
                                 <div className="text-xs text-secondary mt-1">{MOCK_PROFILE.cargoEncargado}</div>
                             </div>
                             <div className="bg-gray-50 p-3 rounded-lg border border-border">
                                 <div className="text-xs text-gray-500 uppercase">Contacto Operativo</div>
                                 <div className="text-gray-900 font-medium">{MOCK_PROFILE.contactoOperativo}</div>
                                 <div className="text-xs text-gray-500 mt-1">{MOCK_PROFILE.emailContacto}</div>
                                 <div className="text-xs text-gray-500">{MOCK_PROFILE.telefonoContacto}</div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* 2. INFRASTRUCTURE & MAINTENANCE PLAN */}
                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden shadow-sm">
                    {maintenanceStatus.isOverdue && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-red-500 animate-pulse"></div>
                    )}
                    <div className="flex items-center gap-3 mb-6">
                       <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                           <Wrench size={24} />
                       </div>
                       <div>
                           <h3 className="text-lg font-semibold text-gray-900">Plan de Mantenimiento Sugerido</h3>
                           <p className="text-sm text-gray-500">Basado en tu volumen de residuos y tipo de trampa.</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                         <div className="bg-gray-50 border border-border p-4 rounded-lg">
                             <span className="text-xs text-gray-500 block mb-1">Sistema de Pretratamiento</span>
                             <div className="text-gray-900 font-bold">{MOCK_PROFILE.tipoTrampa}</div>
                             <div className="text-xs text-gray-500 mt-1">Capacidad: {MOCK_PROFILE.capacidadTrampaLts} Litros</div>
                         </div>
                         <div className="bg-gray-50 border border-border p-4 rounded-lg">
                             <span className="text-xs text-gray-500 block mb-1">Frecuencia Limpieza</span>
                             <div className="text-gray-900 font-bold">Cada {MOCK_PROFILE.frecuenciaMantenimientoDias} días</div>
                             <div className="text-xs text-emerald-600 mt-1">Recomendada</div>
                         </div>
                         <div className={`border p-4 rounded-lg flex flex-col justify-center ${
                             maintenanceStatus.isOverdue 
                                ? 'bg-red-50 border-red-200' 
                                : maintenanceStatus.isDueSoon 
                                    ? 'bg-amber-50 border-amber-200' 
                                    : 'bg-emerald-50 border-emerald-200'
                         }`}>
                             <span className={`text-xs font-bold uppercase mb-1 ${
                                 maintenanceStatus.isOverdue ? 'text-red-600' : maintenanceStatus.isDueSoon ? 'text-amber-600' : 'text-emerald-600'
                             }`}>
                                 {maintenanceStatus.isOverdue ? '¡Vencido!' : 'Próxima Limpieza'}
                             </span>
                             <div className="text-gray-900 font-bold text-lg">{maintenanceStatus.next}</div>
                             <div className="text-xs text-gray-600 mt-1">
                                 {maintenanceStatus.isOverdue 
                                    ? `Retraso de ${Math.abs(maintenanceStatus.daysRemaining)} días` 
                                    : `Faltan ${maintenanceStatus.daysRemaining} días`}
                             </div>
                         </div>
                    </div>

                    {maintenanceStatus.isDueSoon && (
                        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm mb-4 animate-in fade-in">
                            <AlertTriangle size={18} />
                            <span>Alerta: Tu mantenimiento está próximo. Contacta a tu gestor para programar la succión.</span>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button className="text-sm bg-secondary/5 text-secondary border border-secondary/20 hover:bg-secondary/10 px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2">
                            <CheckCircle2 size={16} />
                            Registrar Mantenimiento Realizado
                        </button>
                    </div>
                </div>

                {/* 3. WASTEWATER CHARACTERIZATION MODULE */}
                <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                                <TestTube2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Caracterización de Aguas</h3>
                                <p className="text-sm text-gray-500">Monitoreo de vertimientos y cumplimiento de parámetros.</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 text-xs bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 px-3 py-1.5 rounded transition-colors">
                            <Upload size={14} />
                            Cargar Resultados Lab
                        </button>
                    </div>

                    <div className="space-y-4">
                        {MOCK_WASTEWATER_REPORTS.map((report) => (
                            <div key={report.id} className="bg-gray-50 border border-border rounded-lg p-4">
                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-gray-900 font-medium">Informe: {report.date}</h4>
                                            {report.status === 'Compliant' ? (
                                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded border border-emerald-200 uppercase font-bold">Cumple</span>
                                            ) : (
                                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] rounded border border-red-200 uppercase font-bold">No Cumple</span>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-500">{report.laboratory}</div>
                                    </div>
                                    
                                    {/* Parameters Grid */}
                                    <div className="flex gap-4">
                                        <div className="text-center">
                                            <div className="text-[10px] text-gray-500 uppercase">pH</div>
                                            <div className={`font-mono font-bold ${report.ph < 6 || report.ph > 9 ? 'text-red-600' : 'text-gray-900'}`}>{report.ph}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[10px] text-gray-500 uppercase">Grasas (mg/L)</div>
                                            <div className={`font-mono font-bold ${report.grasasAceitesMgL > 100 ? 'text-red-600' : 'text-gray-900'}`}>{report.grasasAceitesMgL}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[10px] text-gray-500 uppercase">Sólidos (mg/L)</div>
                                            <div className="text-gray-900 font-mono font-bold">{report.solidosSuspendidosMgL}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Recommendations */}
                                {report.recommendations.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-border/50">
                                        <div className="flex items-start gap-2">
                                            <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-xs text-amber-600 font-bold uppercase block mb-1">Recomendaciones del Sistema</span>
                                                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                                                    {report.recommendations.map((rec, i) => (
                                                        <li key={i}>{rec}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

             </div>
          )}

        </div>

        {/* Sidebar: Checklist */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* Profile Validation Status (Moved to Sidebar for better layout) */}
           {activeTab === 'profile' && (
             <div className={`border rounded-xl p-4 flex flex-col gap-3 ${isRegistered ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
               <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isRegistered ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                      {isRegistered ? <ShieldCheck size={18} /> : <XCircle size={18} />}
                  </div>
                  <h3 className={`font-bold text-sm ${isRegistered ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isRegistered ? 'Inscrito Oficialmente' : 'No Inscrito'}
                  </h3>
               </div>
               <p className="text-xs text-gray-600 leading-relaxed">
                   {isRegistered 
                      ? 'Tu establecimiento cumple con la inscripción ante la autoridad ambiental.' 
                      : 'ALERTA: Tu establecimiento no aparece en la base de datos de generadores.'}
               </p>
               {!isRegistered && (
                  <button className="w-full py-2 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 transition-colors">
                     Iniciar Inscripción
                  </button>
               )}
             </div>
           )}

           <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                 <CheckCircle2 className="text-primary" size={20} />
                 Checklist de Cumplimiento
              </h3>
              <div className="space-y-3">
                 {COMPLIANCE_CHECKLIST.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50 transition-colors">
                       <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.isComplete ? 'bg-primary text-white' : 'bg-gray-100 border border-gray-300'}`}>
                          {item.isComplete && <CheckCircle2 size={14} />}
                       </div>
                       <div>
                          <p className={`text-sm ${item.isComplete ? 'text-gray-900' : 'text-gray-500'}`}>{item.label}</p>
                          <span className="text-[10px] uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{item.requiredFor}</span>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                 <div className="text-xs text-gray-500 mb-2">Progreso General</div>
                 <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[65%]"></div>
                 </div>
                 <div className="text-right text-xs text-primary mt-1 font-mono">65%</div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-amber-700 font-medium mb-2 text-sm">¿Necesitas ayuda?</h4>
              <p className="text-xs text-gray-600 mb-3">
                 Si tienes dudas sobre el reporte a la autoridad ambiental, contacta a soporte normativo.
              </p>
              <button className="w-full py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-xs hover:bg-amber-100 transition-colors font-medium">
                 Contactar Soporte
              </button>
           </div>
        </div>

      </div>

      {/* Manual Upload Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white border border-border rounded-xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-gray-900">Editar Mes: {selectedReport.month}</h3>
                 <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-gray-900"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleUpdateReport} className="space-y-4">
                 <div>
                    <label className="block text-sm text-gray-600 mb-1">Corrección de Cantidad (Kg)</label>
                    <input 
                      type="number" 
                      required
                      className="w-full bg-gray-50 border border-border rounded-lg px-4 py-2 text-gray-900 focus:border-secondary focus:outline-none"
                      placeholder="0.00"
                      value={selectedReport.kgGenerated || ''}
                      onChange={(e) => setSelectedReport({...selectedReport, kgGenerated: Number(e.target.value)})}
                    />
                 </div>

                 <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setSelectedReport(null)} className="flex-1 py-2.5 bg-white border border-border rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">Cancelar</button>
                    <button type="submit" className="flex-1 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors">Guardar Cambio</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

// Helper Component for consistent Profile Fields
const ProfileField: React.FC<{ label: string; value: string | number; highlight?: boolean }> = ({ label, value, highlight }) => (
    <div>
        <label className="block text-xs text-gray-500 uppercase mb-1">{label}</label>
        <div className={`font-medium p-3 rounded-lg border text-sm ${
            highlight 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-mono' 
            : 'bg-gray-50 border-border text-gray-900'
        }`}>
            {value}
        </div>
    </div>
);