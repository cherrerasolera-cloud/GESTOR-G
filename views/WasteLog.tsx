import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, ArrowRight, Loader2, AlertCircle, Save } from 'lucide-react';
import { WasteType } from '../types';

interface WasteLogProps {
  onRegister: (monthIndex: number, amount: number, fileName: string) => void;
}

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const WasteLog: React.FC<WasteLogProps> = ({ onRegister }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  
  // Data extraction state
  const [extractedData, setExtractedData] = useState<{amount: number, type: string} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processFile = () => {
    if (!file) return;
    setIsScanning(true);
    
    // Simulate OCR / AI processing delay
    setTimeout(() => {
      setIsScanning(false);
      // Simulate extracted data
      setExtractedData({
        amount: Math.floor(Math.random() * (200 - 50) + 50) + 0.5, // Random amount between 50 and 200
        type: 'Aceite de Cocina Usado (ACU)'
      });
      setStep(2);
    }, 2000);
  };

  const handleConfirm = () => {
    if (extractedData && file) {
      onRegister(selectedMonth, extractedData.amount, file.name);
      setStep(3); // Success/Redirect handled by parent, but for UI feedback we can show a brief success
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Carga de Certificados</h1>
        <p className="text-gray-400">Sube el certificado entregado por el gestor. El sistema extraerá automáticamente la cantidad para el reporte ambiental.</p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-8">
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-gray-600'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary/10' : 'border-gray-600'}`}>1</div>
            <span className="text-xs font-medium">Carga</span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-700'}`} />
          <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-gray-600'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary/10' : 'border-gray-600'}`}>2</div>
            <span className="text-xs font-medium">Validación</span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-700'}`} />
          <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-gray-600'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-primary bg-primary/10' : 'border-gray-600'}`}>3</div>
            <span className="text-xs font-medium">Registro</span>
          </div>
        </div>

        {/* STEP 1: UPLOAD */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mes del Reporte</label>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:border-secondary focus:outline-none"
              >
                {MONTHS.map((m, idx) => (
                  <option key={idx} value={idx}>{m}</option>
                ))}
              </select>
            </div>

            <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all hover:border-secondary/50 hover:bg-secondary/5 group relative">
              <input 
                type="file" 
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="bg-surface p-4 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-lg">
                 <Upload className="text-secondary" size={32} />
              </div>
              <h3 className="text-white font-medium mb-1">
                {file ? file.name : "Arrastra tu certificado aquí"}
              </h3>
              <p className="text-sm text-gray-500">Soporta PDF, JPG, PNG (Max 5MB)</p>
            </div>

            <button 
              onClick={processFile}
              disabled={!file || isScanning}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                ${!file || isScanning 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-primary text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                }`}
            >
              {isScanning ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analizando Documento con IA...
                </>
              ) : (
                <>
                  Procesar Certificado
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        )}

        {/* STEP 2: VALIDATION */}
        {step === 2 && extractedData && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-background border border-border rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-secondary shrink-0 mt-0.5" size={20} />
              <div className="text-sm">
                <p className="text-white font-medium mb-1">Verificación de Datos</p>
                <p className="text-gray-400">El sistema ha extraído la siguiente información del archivo <strong>{file?.name}</strong>. Por favor confirma si es correcta antes de guardar.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="text-xs text-gray-500 uppercase mb-1">Tipo Detectado</div>
                <div className="text-white font-medium">{extractedData.type}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-secondary/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 bg-secondary text-black text-[10px] font-bold px-2 rounded-bl">AI DETECTED</div>
                <div className="text-xs text-gray-500 uppercase mb-1">Cantidad (Kg)</div>
                <div className="flex items-center gap-2">
                   <input 
                    type="number" 
                    value={extractedData.amount}
                    onChange={(e) => setExtractedData({...extractedData, amount: parseFloat(e.target.value)})}
                    className="bg-transparent text-2xl font-bold text-secondary focus:outline-none w-full font-mono"
                   />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-transparent border border-border text-gray-300 rounded-lg hover:text-white transition-colors"
              >
                Cancelar / Reintentar
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-1 py-3 bg-secondary text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                <Save size={18} />
                Confirmar y Guardar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};