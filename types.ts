import React from 'react';

export enum UserRole {
  GENERATOR = 'GENERATOR',
  COLLECTOR = 'COLLECTOR',
  AUTHORITY = 'AUTHORITY'
}

export enum WasteType {
  ACU = 'Aceite Cocina Usado',
  FOG = 'Grasas y Aceites (Trampa)'
}

export enum Status {
  PENDING = 'Pendiente',
  SCHEDULED = 'Programado',
  COLLECTED = 'Recolectado',
  PROCESSED = 'Procesado',
  CERTIFIED = 'Certificado'
}

export interface WasteRecord {
  id: string;
  generatorName: string;
  type: WasteType;
  amountKg: number;
  dateCreated: string;
  scheduledDate?: string;
  status: Status;
  hash: string; 
  co2SavedKg: number; 
}

export interface RoutePoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'generator' | 'depot';
  demandKg?: number;
}

// Updated Regulatory Profile to include detailed Establishment Info
export interface RegulatoryProfile {
  razonSocial: string;
  nit: string;
  repLegal: string;
  direccion: string;
  municipio: string;
  actividad: string;
  ciiu: string;
  fechaInscripcion: string;
  actoAdministrativo: string;
  
  // New Contact & Staff Info
  contactoOperativo: string;
  telefonoContacto: string;
  emailContacto: string;
  encargadoPlataforma: string;
  cargoEncargado: string;

  // Infrastructure & Maintenance
  tipoTrampa: 'Prefabricada' | 'Obra Civil' | 'Mecánica Automática';
  capacidadTrampaLts: number;
  ubicacionTrampa: string;
  frecuenciaMantenimientoDias: number;
  ultimoMantenimiento: string;
}

export interface WastewaterReport {
  id: string;
  date: string;
  laboratory: string;
  ph: number;
  grasasAceitesMgL: number; // Limit usually around 100 mg/L
  solidosSuspendidosMgL: number;
  dqoMgL: number;
  fileUrl?: string;
  status: 'Compliant' | 'NonCompliant' | 'Pending';
  recommendations: string[];
}

export interface MonthlyReport {
  month: string;
  monthIndex: number; // 0-11
  kgGenerated: number | null;
  certificateId?: string;
  fileUrl?: string;
  status: 'PENDING' | 'UPLOADED' | 'VERIFIED';
  lastUpdated?: string;
}

export interface ComplianceCheckitem {
  id: string;
  label: string;
  isComplete: boolean;
  requiredFor: 'Registration' | 'Monthly' | 'Yearly';
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export interface NearbyGenerator {
  id: string;
  name: string;
  distanceKm: number;
  currentLoadKg: number;
  wasteType: 'ACU' | 'FOG';
  address: string;
  lat: number;
  lng: number;
}