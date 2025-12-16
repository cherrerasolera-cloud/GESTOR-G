import { WasteRecord, WasteType, Status, RoutePoint, RegulatoryProfile, MonthlyReport, ComplianceCheckitem, NearbyGenerator, WastewaterReport } from './types';

export const MOCK_RECORDS: WasteRecord[] = [
  {
    id: 'REC-001',
    generatorName: 'Restaurante El Solar',
    type: WasteType.ACU,
    amountKg: 45.5,
    dateCreated: '2023-10-01',
    status: Status.CERTIFIED,
    hash: '0x7f83b1...a9c2',
    co2SavedKg: 120.3
  },
  {
    id: 'REC-002',
    generatorName: 'Burger King Centro',
    type: WasteType.FOG,
    amountKg: 120.0,
    dateCreated: '2023-10-05',
    status: Status.COLLECTED,
    hash: '0x3a1b9c...d4e5',
    co2SavedKg: 310.5
  },
  {
    id: 'REC-003',
    generatorName: 'Pizzería Napoli',
    type: WasteType.ACU,
    amountKg: 25.0,
    dateCreated: '2023-10-10',
    scheduledDate: '2023-10-15',
    status: Status.SCHEDULED,
    hash: '0x9f8e7d...6c5b',
    co2SavedKg: 65.2
  },
  {
    id: 'REC-004',
    generatorName: 'Hotel Grand Plaza',
    type: WasteType.ACU,
    amountKg: 200.0,
    dateCreated: '2023-10-12',
    status: Status.PENDING,
    hash: 'PENDING',
    co2SavedKg: 0
  }
];

export const MOCK_ROUTE_POINTS: RoutePoint[] = [
  { id: 'DEPOT', name: 'Centro de Acopio', lat: 50, lng: 50, type: 'depot' },
  { id: 'P1', name: 'Restaurante A', lat: 20, lng: 30, type: 'generator', demandKg: 50 },
  { id: 'P2', name: 'Restaurante B', lat: 70, lng: 20, type: 'generator', demandKg: 30 },
  { id: 'P3', name: 'Hotel C', lat: 80, lng: 60, type: 'generator', demandKg: 150 },
  { id: 'P4', name: 'Comedor D', lat: 40, lng: 80, type: 'generator', demandKg: 40 },
];

export const NEARBY_GENERATORS: NearbyGenerator[] = [
  { id: 'G1', name: 'Tu Restaurante (Tú)', distanceKm: 0, currentLoadKg: 12, wasteType: 'ACU', address: 'Calle 32 #5-20', lat: 50, lng: 45 },
  { id: 'G2', name: 'Pizzería La Mía', distanceKm: 0.8, currentLoadKg: 45, wasteType: 'ACU', address: 'Calle 34 #6-10', lat: 40, lng: 35 },
  { id: 'G3', name: 'Burger & Beer', distanceKm: 1.2, currentLoadKg: 15, wasteType: 'ACU', address: 'Cra 5 #30-12', lat: 60, lng: 55 },
  { id: 'G4', name: 'Hotel Caribe Real', distanceKm: 2.5, currentLoadKg: 120, wasteType: 'FOG', address: 'Av San Martin', lat: 20, lng: 80 },
  { id: 'G5', name: 'Donas & Café', distanceKm: 0.5, currentLoadKg: 8, wasteType: 'ACU', address: 'Calle 32 #5-40', lat: 52, lng: 42 },
  { id: 'G6', name: 'Asadero El Pollo', distanceKm: 3.0, currentLoadKg: 60, wasteType: 'ACU', address: 'Transversal 4', lat: 80, lng: 20 },
];

export const MOCK_PROFILE: RegulatoryProfile = {
  razonSocial: "GASTRONOMÍA DEL CARIBE S.A.S",
  nit: "900.123.456-7",
  repLegal: "Juan Pérez",
  direccion: "Calle 32 # 5-20, Centro Histórico",
  municipio: "Cartagena de Indias",
  actividad: "Expendio a la mesa de comidas preparadas",
  ciiu: "5611",
  fechaInscripcion: "2023-01-15",
  actoAdministrativo: "Res. 0456 de 2023",
  
  // New Fields
  contactoOperativo: "María González",
  telefonoContacto: "300 987 6543",
  emailContacto: "operaciones@elcaribe.com",
  encargadoPlataforma: "Carlos Rodríguez",
  cargoEncargado: "Jefe de Cocina / Sostenibilidad",

  tipoTrampa: "Obra Civil",
  capacidadTrampaLts: 500,
  ubicacionTrampa: "Zona de lavado posterior",
  frecuenciaMantenimientoDias: 15, // Suggested maintenance every 15 days
  ultimoMantenimiento: "2023-10-10" // Example date close to current
};

export const MOCK_MONTHLY_REPORTS: MonthlyReport[] = [
  { month: 'Enero', monthIndex: 0, kgGenerated: 45.2, status: 'VERIFIED', certificateId: 'CERT-001', lastUpdated: '2023-02-01' },
  { month: 'Febrero', monthIndex: 1, kgGenerated: 38.5, status: 'VERIFIED', certificateId: 'CERT-004', lastUpdated: '2023-03-02' },
  { month: 'Marzo', monthIndex: 2, kgGenerated: 50.0, status: 'VERIFIED', certificateId: 'CERT-009', lastUpdated: '2023-04-05' },
  { month: 'Abril', monthIndex: 3, kgGenerated: 42.1, status: 'UPLOADED', certificateId: 'CERT-012', lastUpdated: '2023-05-03' },
  { month: 'Mayo', monthIndex: 4, kgGenerated: null, status: 'PENDING' },
  { month: 'Junio', monthIndex: 5, kgGenerated: null, status: 'PENDING' },
  { month: 'Julio', monthIndex: 6, kgGenerated: null, status: 'PENDING' },
  { month: 'Agosto', monthIndex: 7, kgGenerated: null, status: 'PENDING' },
  { month: 'Septiembre', monthIndex: 8, kgGenerated: null, status: 'PENDING' },
  { month: 'Octubre', monthIndex: 9, kgGenerated: null, status: 'PENDING' },
  { month: 'Noviembre', monthIndex: 10, kgGenerated: null, status: 'PENDING' },
  { month: 'Diciembre', monthIndex: 11, kgGenerated: null, status: 'PENDING' },
];

export const MOCK_WASTEWATER_REPORTS: WastewaterReport[] = [
  {
    id: 'LAB-2023-01',
    date: '2023-06-15',
    laboratory: 'Laboratorios Ambientales del Norte',
    ph: 7.2,
    grasasAceitesMgL: 85,
    solidosSuspendidosMgL: 120,
    dqoMgL: 450,
    status: 'Compliant',
    recommendations: ['Mantener frecuencia de limpieza actual', 'Resultados dentro de norma']
  },
  {
    id: 'LAB-2023-02',
    date: '2023-01-10',
    laboratory: 'EcoLabs S.A.S',
    ph: 5.8, // Low pH
    grasasAceitesMgL: 150, // High Grease
    solidosSuspendidosMgL: 300,
    dqoMgL: 800,
    status: 'NonCompliant',
    recommendations: ['Aumentar frecuencia de limpieza de trampa', 'Revisar dosificación de detergentes (pH bajo)', 'Programar succión de lodos']
  }
];

export const COMPLIANCE_CHECKLIST: ComplianceCheckitem[] = [
  { id: '1', label: 'Inscripción Generador ACU (EPA)', isComplete: true, requiredFor: 'Registration' },
  { id: '2', label: 'Acto Administrativo Vigente', isComplete: true, requiredFor: 'Registration' },
  { id: '3', label: 'Plan de Gestión de Residuos', isComplete: true, requiredFor: 'Registration' },
  { id: '4', label: 'Certificados Trimestre 1', isComplete: true, requiredFor: 'Monthly' },
  { id: '5', label: 'Certificados Trimestre 2', isComplete: false, requiredFor: 'Monthly' },
  { id: '6', label: 'Capacitación Personal (Anual)', isComplete: false, requiredFor: 'Yearly' },
];

export const LCA_FACTORS = {
  co2PerKgACU: 2.85, 
};