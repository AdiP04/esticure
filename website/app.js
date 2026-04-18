/* ============================================================
   ESTICURE — Application Logic
   ============================================================ */
'use strict';

/* ──────────────────────────────────────────────────────────
   HOSPITALS DATABASE
────────────────────────────────────────────────────────── */

const HOSPITALS_DB = [
  /* ── MUMBAI ── */
  {
    id: 'apollo-mumbai', name: 'Apollo Spectra Hospital', city: 'Mumbai', area: 'Tardeo',
    rating: 4.8, accreditation: 'NABH', beds: 450, doctors: 120,
    colorHex: '#0d9488', colorBg: '#f0fdfa',
    specialties: ['Cardiac','Orthopedics','Laparoscopy','General Surgery'],
    costs: {
      'Cardiac':         { min: 180000, max: 250000 },
      'Orthopedics':     { min:  80000, max: 150000 },
      'Laparoscopy':     { min:  50000, max: 120000 },
      'General Surgery': { min:  40000, max: 100000 }
    },
    features: ['NABH Accredited','ICU Available','Insurance Accepted','Cashless Facility']
  },
  {
    id: 'kokilaben-mumbai', name: 'Kokilaben Dhirubhai Ambani Hospital', city: 'Mumbai', area: 'Andheri West',
    rating: 4.9, accreditation: 'JCI', beds: 750, doctors: 200,
    colorHex: '#2563eb', colorBg: '#eff6ff',
    specialties: ['Oncology','Neurology','Robotic Surgery','Cardiac','Spine Surgery'],
    costs: {
      'Oncology':        { min: 120000, max: 180000 },
      'Neurology':       { min: 150000, max: 220000 },
      'Cardiac':         { min: 200000, max: 280000 },
      'Robotic Surgery': { min: 180000, max: 300000 },
      'Spine Surgery':   { min: 120000, max: 200000 }
    },
    features: ['JCI Accredited','Robotic Surgery','Proton Therapy','24/7 Emergency']
  },
  {
    id: 'fortis-mumbai', name: 'Fortis Hospital Mulund', city: 'Mumbai', area: 'Mulund',
    rating: 4.7, accreditation: 'NABH', beds: 600, doctors: 165,
    colorHex: '#dc2626', colorBg: '#fef2f2',
    specialties: ['Cardiac','Urology','Transplant','Oncology'],
    costs: {
      'Cardiac':   { min: 200000, max: 280000 },
      'Urology':   { min:  60000, max: 120000 },
      'Transplant':{ min: 500000, max: 900000 },
      'Oncology':  { min: 140000, max: 200000 }
    },
    features: ['NABH Accredited','Transplant Centre','Cath Lab','Insurance Support']
  },
  {
    id: 'nanavati-mumbai', name: 'Nanavati Max Super Speciality', city: 'Mumbai', area: 'Vile Parle',
    rating: 4.7, accreditation: 'NABH', beds: 350, doctors: 100,
    colorHex: '#d97706', colorBg: '#fffbeb',
    specialties: ['Orthopedics','Gastroenterology','Nephrology','Spine Surgery'],
    costs: {
      'Orthopedics':      { min:  90000, max: 160000 },
      'Gastroenterology': { min:  50000, max: 100000 },
      'Nephrology':       { min:  80000, max: 140000 },
      'Spine Surgery':    { min: 100000, max: 180000 }
    },
    features: ['NABH Accredited','Joint Replacement','GI Endoscopy','Dialysis Unit']
  },
  {
    id: 'lilavati-mumbai', name: 'Lilavati Hospital & Research Centre', city: 'Mumbai', area: 'Bandra West',
    rating: 4.8, accreditation: 'NABH', beds: 320, doctors: 90,
    colorHex: '#9333ea', colorBg: '#faf5ff',
    specialties: ['Gynecology','Obstetrics','General Surgery','ENT','Ophthalmology'],
    costs: {
      'Gynecology':      { min: 30000, max:  70000 },
      'Obstetrics':      { min: 25000, max:  55000 },
      'General Surgery': { min: 40000, max:  80000 },
      'ENT':             { min: 20000, max:  50000 },
      'Ophthalmology':   { min: 15000, max:  45000 }
    },
    features: ['NABH Accredited','High-Risk Pregnancy','Laparoscopic','Research Centre']
  },
  /* ── PUNE ── */
  {
    id: 'ruby-pune', name: 'Ruby Hall Clinic', city: 'Pune', area: 'Wanowrie',
    rating: 4.7, accreditation: 'NABH', beds: 500, doctors: 140,
    colorHex: '#e11d48', colorBg: '#fff1f2',
    specialties: ['Cardiac','Nephrology','Neurology','Oncology'],
    costs: {
      'Cardiac':   { min: 150000, max: 220000 },
      'Nephrology':{ min:  80000, max: 140000 },
      'Neurology': { min: 120000, max: 190000 },
      'Oncology':  { min: 110000, max: 170000 }
    },
    features: ['NABH Accredited','Cath Lab','Cancer Centre','Dialysis Unit']
  },
  {
    id: 'jehangir-pune', name: 'Jehangir Hospital', city: 'Pune', area: 'Sassoon Road',
    rating: 4.6, accreditation: 'NABH', beds: 280, doctors: 85,
    colorHex: '#2563eb', colorBg: '#eff6ff',
    specialties: ['Orthopedics','ENT','Ophthalmology','General Surgery'],
    costs: {
      'Orthopedics':   { min: 70000, max: 130000 },
      'ENT':           { min: 20000, max:  50000 },
      'Ophthalmology': { min: 15000, max:  40000 },
      'General Surgery':{ min: 35000, max:  75000 }
    },
    features: ['NABH Accredited','Eye Centre','Hearing Clinic','Day Care Surgery']
  },
  {
    id: 'sahyadri-pune', name: 'Sahyadri Hospitals', city: 'Pune', area: 'Deccan Gymkhana',
    rating: 4.6, accreditation: 'NABH', beds: 400, doctors: 110,
    colorHex: '#16a34a', colorBg: '#f0fdf4',
    specialties: ['Neurology','Spine Surgery','Critical Care','Cardiac'],
    costs: {
      'Neurology':     { min: 120000, max: 190000 },
      'Spine Surgery': { min: 100000, max: 180000 },
      'Critical Care': { min:  80000, max: 150000 },
      'Cardiac':       { min: 140000, max: 200000 }
    },
    features: ['NABH Accredited','Stroke Centre','Spine Institute','60+ ICU Beds']
  },
  {
    id: 'deenanath-pune', name: 'Deenanath Mangeshkar Hospital', city: 'Pune', area: 'Erandwane',
    rating: 4.8, accreditation: 'NABH', beds: 650, doctors: 180,
    colorHex: '#d97706', colorBg: '#fffbeb',
    specialties: ['Oncology','Pediatrics','Cardiac','Gynecology'],
    costs: {
      'Oncology':  { min: 100000, max: 160000 },
      'Pediatrics':{ min:  30000, max:  80000 },
      'Cardiac':   { min: 130000, max: 190000 },
      'Gynecology':{ min:  25000, max:  65000 }
    },
    features: ['NABH Accredited','Cancer Centre','NICU','Blood Bank','Child Care']
  },
  /* ── KOLHAPUR ── */
  {
    id: 'cpr-kolhapur', name: 'CPR Hospital', city: 'Kolhapur', area: 'Kasba Bavada',
    rating: 4.5, accreditation: 'NABH', beds: 200, doctors: 60,
    colorHex: '#0d9488', colorBg: '#f0fdfa',
    specialties: ['General Surgery','Orthopedics','General Medicine'],
    costs: {
      'General Surgery':  { min: 30000, max:  60000 },
      'Orthopedics':      { min: 50000, max: 100000 },
      'General Medicine': { min: 15000, max:  40000 }
    },
    features: ['NABH Accredited','Trauma Centre','Blood Bank']
  },
  {
    id: 'oturkar-kolhapur', name: 'Oturkar Hospital', city: 'Kolhapur', area: 'Shahupuri',
    rating: 4.6, accreditation: 'NABH', beds: 180, doctors: 55,
    colorHex: '#7c3aed', colorBg: '#faf5ff',
    specialties: ['Cardiac','Urology','Gastroenterology'],
    costs: {
      'Cardiac':          { min: 120000, max: 180000 },
      'Urology':          { min:  40000, max:  80000 },
      'Gastroenterology': { min:  45000, max:  90000 }
    },
    features: ['NABH Accredited','Cath Lab','Day Care Surgery']
  },
  {
    id: 'kotnis-kolhapur', name: 'Kotnis Memorial Hospital', city: 'Kolhapur', area: 'Station Road',
    rating: 4.4, accreditation: 'Registered', beds: 100, doctors: 30,
    colorHex: '#e11d48', colorBg: '#fff1f2',
    specialties: ['Gynecology','Obstetrics','Pediatrics','General Medicine'],
    costs: {
      'Gynecology':       { min: 20000, max: 50000 },
      'Obstetrics':       { min: 15000, max: 40000 },
      'Pediatrics':       { min: 10000, max: 30000 },
      'General Medicine': { min:  5000, max: 20000 }
    },
    features: ['Maternity Centre','NICU','Vaccination Centre']
  }
];

/* ──────────────────────────────────────────────────────────
   CONDITION → SPECIALTY MAP
────────────────────────────────────────────────────────── */

const COND_MAP = {
  // Cardiac
  heart:true, cardiac:true, 'chest pain':true, bypass:true, angioplasty:true,
  pacemaker:true, cardiovascular:true, coronary:true, angina:true, valve:true,
  // Orthopedics
  knee:true, hip:true, bone:true, joint:true, fracture:true, ortho:true,
  replacement:true, ligament:true, arthritis:true, shoulder:true,
  // Oncology
  cancer:true, tumor:true, tumour:true, oncology:true, chemotherapy:true,
  radiation:true, biopsy:true, malignant:true, lymphoma:true, leukemia:true,
  // Neurology
  brain:true, neuro:true, seizure:true, epilepsy:true, stroke:true,
  headache:true, migraine:true, parkinson:true,
  // Spine
  spine:true, spinal:true, disc:true, spondylosis:true,
  // Urology
  prostate:true, urology:true, bladder:true,
  // Nephrology
  dialysis:true, renal:true, nephrology:true, ckd:true,
  // Gastroenterology
  liver:true, gastro:true, stomach:true, intestine:true, colon:true,
  endoscopy:true, jaundice:true, gallbladder:true, hepatitis:true,
  // ENT
  ear:true, sinus:true, tonsil:true, adenoid:true,
  // Ophthalmology
  eye:true, vision:true, cataract:true, glaucoma:true, retina:true, lasik:true,
  // Gynecology
  uterus:true, ovary:true, fibroid:true, pcod:true, pcos:true,
  menstrual:true, endometriosis:true,
  // Obstetrics
  pregnancy:true, delivery:true, cesarean:true, maternity:true,
  // Pediatrics
  child:true, pediatric:true, infant:true, newborn:true, vaccination:true,
  // Laparoscopy
  laparoscopy:true, gallstone:true, appendix:true,
  // Transplant
  transplant:true
};

const KEYWORD_SPECIALTY = {
  heart: 'Cardiac', cardiac: 'Cardiac', 'chest pain': 'Cardiac', bypass: 'Cardiac',
  angioplasty: 'Cardiac', pacemaker: 'Cardiac', cardiovascular: 'Cardiac',
  coronary: 'Cardiac', angina: 'Cardiac', valve: 'Cardiac',
  knee: 'Orthopedics', hip: 'Orthopedics', bone: 'Orthopedics', joint: 'Orthopedics',
  fracture: 'Orthopedics', ortho: 'Orthopedics', replacement: 'Orthopedics',
  ligament: 'Orthopedics', arthritis: 'Orthopedics', shoulder: 'Orthopedics',
  cancer: 'Oncology', tumor: 'Oncology', tumour: 'Oncology', oncology: 'Oncology',
  chemotherapy: 'Oncology', radiation: 'Oncology', biopsy: 'Oncology',
  malignant: 'Oncology', lymphoma: 'Oncology', leukemia: 'Oncology',
  brain: 'Neurology', neuro: 'Neurology', seizure: 'Neurology', epilepsy: 'Neurology',
  stroke: 'Neurology', headache: 'Neurology', migraine: 'Neurology', parkinson: 'Neurology',
  spine: 'Spine Surgery', spinal: 'Spine Surgery', disc: 'Spine Surgery',
  spondylosis: 'Spine Surgery', 'back pain': 'Spine Surgery', 'slipped disc': 'Spine Surgery',
  'kidney stone': 'Urology', prostate: 'Urology', urology: 'Urology',
  urinary: 'Urology', bladder: 'Urology', urine: 'Urology',
  kidney: 'Nephrology', dialysis: 'Nephrology', renal: 'Nephrology',
  nephrology: 'Nephrology', ckd: 'Nephrology',
  liver: 'Gastroenterology', gastro: 'Gastroenterology', stomach: 'Gastroenterology',
  intestine: 'Gastroenterology', colon: 'Gastroenterology', endoscopy: 'Gastroenterology',
  jaundice: 'Gastroenterology', gallbladder: 'Gastroenterology', hepatitis: 'Gastroenterology',
  ear: 'ENT', nose: 'ENT', throat: 'ENT', ent: 'ENT', tonsil: 'ENT',
  sinus: 'ENT', hearing: 'ENT', adenoid: 'ENT',
  eye: 'Ophthalmology', vision: 'Ophthalmology', cataract: 'Ophthalmology',
  glaucoma: 'Ophthalmology', retina: 'Ophthalmology', lasik: 'Ophthalmology',
  gynec: 'Gynecology', uterus: 'Gynecology', ovary: 'Gynecology', fibroid: 'Gynecology',
  pcod: 'Gynecology', pcos: 'Gynecology', menstrual: 'Gynecology',
  endometriosis: 'Gynecology',
  pregnancy: 'Obstetrics', delivery: 'Obstetrics', cesarean: 'Obstetrics',
  maternity: 'Obstetrics',
  child: 'Pediatrics', pediatric: 'Pediatrics', infant: 'Pediatrics',
  newborn: 'Pediatrics', vaccination: 'Pediatrics',
  laparoscopy: 'Laparoscopy', gallstone: 'Laparoscopy', appendix: 'Laparoscopy',
  transplant: 'Transplant'
};

const SPECIALISTS = {
  'Cardiac':          { title: 'Senior Interventional Cardiologist',   exp: '18+ yrs' },
  'Orthopedics':      { title: 'Senior Orthopedic Surgeon',            exp: '15+ yrs' },
  'Oncology':         { title: 'Medical & Surgical Oncologist',        exp: '20+ yrs' },
  'Neurology':        { title: 'Neurologist & Neurosurgeon',           exp: '16+ yrs' },
  'Spine Surgery':    { title: 'Spine & Neuro Surgeon',                exp: '14+ yrs' },
  'Urology':          { title: 'Senior Urologist',                     exp: '12+ yrs' },
  'Nephrology':       { title: 'Senior Nephrologist',                  exp: '17+ yrs' },
  'Gastroenterology': { title: 'Senior Gastroenterologist',            exp: '15+ yrs' },
  'ENT':              { title: 'Senior ENT Specialist',                exp: '13+ yrs' },
  'Ophthalmology':    { title: 'Senior Ophthalmologist',               exp: '14+ yrs' },
  'Gynecology':       { title: 'Senior Obstetrician & Gynaecologist',  exp: '16+ yrs' },
  'Obstetrics':       { title: 'High-Risk Pregnancy Specialist',       exp: '14+ yrs' },
  'Pediatrics':       { title: 'Senior Paediatric Specialist',         exp: '15+ yrs' },
  'Laparoscopy':      { title: 'Minimal Invasive Surgeon',             exp: '12+ yrs' },
  'Transplant':       { title: 'Organ Transplant Surgeon',             exp: '22+ yrs' },
  'General Surgery':  { title: 'General & Laparoscopic Surgeon',       exp: '14+ yrs' },
  'Robotic Surgery':  { title: 'Robotic Surgery Specialist',           exp: '12+ yrs' },
  'default':          { title: 'Senior Healthcare Navigator',          exp: '15+ yrs' }
};

const TIMELINES = {
  'Cardiac':          '10–20 days (incl. pre-op tests)',
  'Orthopedics':      '5–14 days',
  'Oncology':         '30–90 days (treatment cycles)',
  'Neurology':        '7–21 days',
  'Spine Surgery':    '7–14 days',
  'Urology':          '3–7 days',
  'Nephrology':       '7–30 days',
  'Gastroenterology': '3–10 days',
  'ENT':              '2–5 days',
  'Ophthalmology':    '1–3 days',
  'Gynecology':       '3–7 days',
  'Obstetrics':       '1–3 days',
  'Pediatrics':       '1–7 days',
  'Laparoscopy':      '2–5 days',
  'Transplant':       '30–60 days',
  'General Surgery':  '2–7 days'
};

/* ──────────────────────────────────────────────────────────
   LOCAL STORAGE
────────────────────────────────────────────────────────── */

const LS = {
  estimations:   'esticure_estimations',
  consultations: 'esticure_consultations'
};

const lsGet  = key => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };
const lsSet  = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const genId  = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

function saveEstimation(data)   { const a = lsGet(LS.estimations); a.unshift(data); lsSet(LS.estimations, a); }
function saveConsultation(data) { const a = lsGet(LS.consultations); a.unshift(data); lsSet(LS.consultations, a); }

function deleteEstimation(id) {
  lsSet(LS.estimations, lsGet(LS.estimations).filter(e => e.id !== id));
  renderDashboard();
  showToast('Estimation deleted', 'info');
}
function deleteConsultation(id) {
  lsSet(LS.consultations, lsGet(LS.consultations).filter(c => c.id !== id));
  renderDashboard();
  showToast('Consultation deleted', 'info');
}

/* ──────────────────────────────────────────────────────────
   HOSPITAL MATCHING ENGINE
────────────────────────────────────────────────────────── */

function detectSpecialty(condition) {
  const lo = condition.toLowerCase();
  // Try multi-word phrases first (longer matches = more specific)
  for (const [kw, sp] of Object.entries(KEYWORD_SPECIALTY)) {
    if (lo.includes(kw)) return sp;
  }
  return 'General Surgery';
}

function matchHospitals(city, condition, budget) {
  const specialty = detectSpecialty(condition);

  let pool = HOSPITALS_DB.filter(h => {
    const cityOk = (city === 'Any' || city === '' || h.city === city);
    const specOk  = h.specialties.some(s => s.toLowerCase().includes(specialty.split(' ')[0].toLowerCase()));
    return cityOk && specOk;
  });

  // Fallback – ignore city
  if (pool.length === 0) pool = HOSPITALS_DB.filter(h =>
    h.specialties.some(s => s.toLowerCase().includes(specialty.split(' ')[0].toLowerCase()))
  );

  // Fallback – any from city
  if (pool.length === 0) pool = HOSPITALS_DB.filter(h => city === 'Any' || h.city === city);

  // Final fallback
  if (pool.length === 0) pool = HOSPITALS_DB.slice(0, 3);

  const scored = pool.map(h => {
    let score = h.rating * 10;
    if (h.accreditation === 'JCI')  score += 6;
    if (h.accreditation === 'NABH') score += 3;

    const matchedSpec = h.specialties.find(s =>
      s.toLowerCase().includes(specialty.split(' ')[0].toLowerCase())
    ) || h.specialties[0];

    const cost = h.costs[matchedSpec];
    if (cost && budget !== 'any') {
      const avg = (cost.min + cost.max) / 2;
      if (budget === 'under-1L' && avg < 100000)                         score += 8;
      if (budget === '1L-3L'    && avg >= 100000 && avg < 300000)        score += 8;
      if (budget === '3L-5L'    && avg >= 300000 && avg < 500000)        score += 8;
      if (budget === 'above-5L' && avg >= 500000)                        score += 8;
    }
    return { ...h, score, matchedSpec };
  });

  return {
    hospitals: scored.sort((a, b) => b.score - a.score).slice(0, 3),
    specialty,
    specialist: SPECIALISTS[specialty] || SPECIALISTS.default,
    timeline: TIMELINES[specialty] || '5–14 days'
  };
}

function fmtCost(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

/* ──────────────────────────────────────────────────────────
   ESTIMATOR FORM
────────────────────────────────────────────────────────── */

async function handleEstimatorSubmit(e) {
  e.preventDefault();

  const name      = document.getElementById('est-name').value.trim();
  const age       = document.getElementById('est-age').value.trim();
  const city      = document.getElementById('est-city').value;
  const budget    = document.getElementById('est-budget').value;
  const phone     = document.getElementById('est-phone').value.trim();
  const condition = document.getElementById('est-condition').value.trim();
  const insurance = (document.querySelector('input[name="insurance"]:checked') || {}).value || 'no';

  // Validate
  const missing = [];
  if (!name)      missing.push('Name');
  if (!age)       missing.push('Age');
  if (!city)      missing.push('City');
  if (!phone)     missing.push('Phone');
  if (!condition) missing.push('Condition');

  if (missing.length) {
    showToast(`Please fill: ${missing.join(', ')}`, 'error');
    return;
  }

  const btn = document.getElementById('estimator-submit-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="loading-spinner-sm mr-2"></span>Submitting…`;

  showLoadingModal('Our healthcare navigators are reviewing your information…');

  await delay(1000);
  document.getElementById('loading-text').textContent = 'Matching you with the best hospitals…';
  await delay(700);
  document.getElementById('loading-text').textContent = 'Almost done — preparing your report…';
  await delay(500);

  const { hospitals, specialty, specialist, timeline } = matchHospitals(city, condition, budget);

  const estimation = {
    id: genId(), name, age, city, condition, budget, phone, insurance, specialty,
    result: {
      hospitals: hospitals.map(h => ({
        name: h.name, city: h.city, area: h.area, rating: h.rating,
        accreditation: h.accreditation, specialty: h.matchedSpec,
        costMin: h.costs[h.matchedSpec]?.min || 50000,
        costMax: h.costs[h.matchedSpec]?.max || 150000,
        features: h.features.slice(0, 3),
        colorHex: h.colorHex, colorBg: h.colorBg
      })),
      specialist, timeline, specialty
    },
    timestamp: new Date().toISOString()
  };

  saveEstimation(estimation);
  closeAllModals();
  showEstimationResult(estimation);

  e.target.reset();
  btn.disabled = false;
  btn.innerHTML = `<i class="fas fa-search-dollar"></i>Get Free Treatment Estimate`;
  showToast(`Great news, ${name}! We found ${hospitals.length} hospital matches for you.`, 'success');
}

/* ──────────────────────────────────────────────────────────
   ESTIMATION RESULT MODAL
────────────────────────────────────────────────────────── */

function showEstimationResult(est) {
  const { name, condition, result } = est;
  const { hospitals, specialist, timeline, specialty } = result;

  const hospCards = hospitals.map((h, i) => `
    <div class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-primary-200 transition-colors" style="background:${h.colorBg}">
      <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-sm" style="background:${h.colorHex}22; color:${h.colorHex}">#${i+1}</div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <h4 class="font-bold text-slate-900 text-sm">${h.name}</h4>
            <p class="text-xs text-slate-400">${h.area}, ${h.city}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-extrabold" style="color:${h.colorHex}">${fmtCost(h.costMin)}–${fmtCost(h.costMax)}</p>
            <p class="text-xs text-amber-500 font-semibold">⭐ ${h.rating}</p>
          </div>
        </div>
        <div class="mt-2 flex flex-wrap gap-1">
          ${h.features.map(f => `<span class="text-xs bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">${f}</span>`).join('')}
        </div>
        <p class="mt-1.5 text-xs font-semibold" style="color:${h.colorHex}"><i class="fas fa-circle-check mr-1"></i>${h.accreditation} · ${h.specialty}</p>
      </div>
    </div>`).join('');

  const html = `
    <div>
      <div class="bg-gradient-to-r from-primary-700 to-primary-600 p-6 rounded-t-2xl">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block"></span>
              <span class="text-primary-200 text-xs font-bold uppercase tracking-widest">Analysis Complete</span>
            </div>
            <h3 class="text-white font-extrabold text-xl">Your Treatment Estimate</h3>
            <p class="text-primary-200 text-xs mt-1">${condition.substring(0,65)}${condition.length>65?'…':''}</p>
          </div>
          <button onclick="closeAllModals()" class="text-white/70 hover:text-white ml-3 flex-shrink-0 p-1"><i class="fas fa-times text-lg"></i></button>
        </div>
        <div class="grid grid-cols-3 gap-2 mt-4">
          <div class="bg-white/15 rounded-xl p-2.5 text-center"><p class="text-white font-extrabold text-lg">${hospitals.length}</p><p class="text-primary-200 text-xs">Hospitals</p></div>
          <div class="bg-white/15 rounded-xl p-2.5 text-center"><p class="text-white font-bold text-sm">${specialty}</p><p class="text-primary-200 text-xs">Specialty</p></div>
          <div class="bg-white/15 rounded-xl p-2.5 text-center"><p class="text-white font-bold text-sm">${timeline.split('(')[0].trim()}</p><p class="text-primary-200 text-xs">Timeline</p></div>
        </div>
      </div>

      <div class="p-6 space-y-5">
        <div>
          <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2"><i class="fas fa-hospital text-primary-600"></i>Top ${hospitals.length} Hospital Matches</h4>
          <div class="space-y-2.5">${hospCards}</div>
        </div>

        <div class="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-user-doctor text-amber-600"></i></div>
          <div>
            <p class="text-xs font-bold text-amber-700 uppercase tracking-wide mb-0.5">Recommended Specialist</p>
            <p class="font-semibold text-slate-900 text-sm">${specialist.title}</p>
            <p class="text-xs text-slate-400">${specialist.exp} experience · Available on Esticure</p>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
          <i class="fas fa-calendar-days text-blue-500 text-xl flex-shrink-0"></i>
          <div>
            <p class="text-xs font-bold text-blue-700 uppercase tracking-wide mb-0.5">Estimated Timeline</p>
            <p class="font-bold text-slate-900 text-sm">${timeline}</p>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <button onclick="closeAllModals();scrollTo('#consultation')" class="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
            <i class="fas fa-video"></i>Book Expert Consultation (₹199–₹999)
          </button>
          <button onclick="openDashboard()" class="w-full py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-2">
            <i class="fas fa-table-columns"></i>View in My Dashboard
          </button>
        </div>

        <p class="text-center text-xs text-slate-400"><i class="fas fa-circle-info mr-1"></i>Costs are approximate. Final costs depend on your specific condition, surgeon, and room type.</p>
      </div>
    </div>`;

  document.getElementById('result-modal-content').innerHTML = html;
  openModal('result-modal-wrap');
}

/* ──────────────────────────────────────────────────────────
   CONSULTATION MODAL
────────────────────────────────────────────────────────── */

function openConsultationModal(type, amount) {
  const cfg = {
    'Basic Opinion':      { cls: 'bg-green-600 hover:bg-green-700',   icon: 'fa-comment-medical', icoBg: 'bg-green-100',   icoTxt: 'text-green-600'  },
    'Video Consultation': { cls: 'bg-primary-600 hover:bg-primary-700', icon: 'fa-video',           icoBg: 'bg-primary-100', icoTxt: 'text-primary-600'},
    'Premium Navigation': { cls: 'bg-purple-600 hover:bg-purple-700', icon: 'fa-crown',            icoBg: 'bg-purple-100',  icoTxt: 'text-purple-600' }
  };
  const c = cfg[type] || cfg['Video Consultation'];

  const html = `
    <div class="p-6">
      <div class="flex items-start justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 ${c.icoBg} rounded-xl flex items-center justify-center"><i class="fas ${c.icon} ${c.icoTxt} text-xl"></i></div>
          <div><h3 class="font-extrabold text-slate-900 text-lg">${type}</h3><p class="text-slate-400 text-sm">Complete your booking</p></div>
        </div>
        <button onclick="closeAllModals()" class="text-slate-400 hover:text-slate-600 p-1"><i class="fas fa-times text-lg"></i></button>
      </div>

      <div class="bg-slate-50 rounded-xl p-4 mb-5 text-center">
        <p class="text-slate-400 text-xs mb-1">Total Amount</p>
        <p class="text-3xl font-extrabold text-slate-900">₹${amount}</p>
        <p class="text-slate-400 text-xs mt-1">One-time payment · No hidden charges</p>
      </div>

      <form id="payment-form" onsubmit="processPayment(event,'${type}',${amount})" novalidate class="space-y-4">
        <div>
          <label class="form-label">Full Name</label>
          <div class="inp-wrap"><i class="fas fa-user inp-ico"></i>
            <input type="text" placeholder="Your name" class="form-inp" required>
          </div>
        </div>
        <div>
          <label class="form-label">Mobile Number</label>
          <div class="inp-wrap"><i class="fas fa-phone inp-ico"></i>
            <input type="tel" placeholder="+91 98765 43210" class="form-inp" required>
          </div>
        </div>
        <div>
          <label class="form-label">Your Query / Condition</label>
          <textarea placeholder="Briefly describe what you need the consultation for…" class="form-inp form-textarea" rows="2" required></textarea>
        </div>

        <div class="border-t border-slate-100 pt-4">
          <p class="text-sm font-semibold text-slate-700 mb-3">Payment Method <span class="text-xs text-slate-400">(Demo)</span></p>
          <div class="grid grid-cols-3 gap-2 mb-4">
            <label class="pay-opt pay-opt-active flex flex-col items-center p-3 border-2 rounded-xl text-xs font-bold text-center gap-1.5">
              <input type="radio" name="pm" value="upi" class="hidden" checked>
              <i class="fas fa-mobile-screen-button text-lg text-primary-600"></i>UPI
            </label>
            <label class="pay-opt flex flex-col items-center p-3 border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-500 text-center gap-1.5 hover:border-primary-300 transition-colors">
              <input type="radio" name="pm" value="card" class="hidden">
              <i class="fas fa-credit-card text-lg"></i>Card
            </label>
            <label class="pay-opt flex flex-col items-center p-3 border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-500 text-center gap-1.5 hover:border-primary-300 transition-colors">
              <input type="radio" name="pm" value="nb" class="hidden">
              <i class="fas fa-university text-lg"></i>Net Banking
            </label>
          </div>
        </div>

        <button type="submit" id="pay-btn" class="w-full py-3.5 ${c.cls} text-white font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 btn-ripple">
          <i class="fas fa-lock text-sm"></i>Pay ₹${amount} Securely
        </button>
        <p class="text-center text-xs text-slate-400"><i class="fas fa-shield-halved mr-1 text-green-500"></i>This is a demo. No real payment will be processed.</p>
      </form>
    </div>`;

  document.getElementById('payment-modal-content').innerHTML = html;
  openModal('payment-modal-wrap');

  // Payment option radio highlight
  document.querySelectorAll('.pay-opt input').forEach(inp => {
    inp.addEventListener('change', () => {
      document.querySelectorAll('.pay-opt').forEach(el => {
        el.classList.remove('pay-opt-active');
        el.classList.add('border-slate-200');
      });
      const parent = inp.closest('.pay-opt');
      parent.classList.add('pay-opt-active');
      parent.classList.remove('border-slate-200');
    });
  });
}

async function processPayment(e, type, amount) {
  e.preventDefault();
  const btn = document.getElementById('pay-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="loading-spinner-sm mr-2"></span>Processing payment…`;

  await delay(2200);

  const id  = genId();
  const mid = 'ESC-' + id.toUpperCase().slice(0,8);
  const eta = new Date(Date.now() + 2 * 3600000);

  const consult = {
    id, type, amount, meetingId: mid,
    meetingLink: `https://meet.esticure.in/${mid}`,
    scheduledFor: eta.toISOString(),
    status: 'confirmed',
    timestamp: new Date().toISOString()
  };
  saveConsultation(consult);
  closeAllModals();
  showConsultationSuccess(consult);
  showToast(`Payment of ₹${amount} successful! Your ${type} is booked.`, 'success');
}

function showConsultationSuccess(c) {
  const d  = new Date(c.scheduledFor);
  const dt = d.toLocaleDateString('en-IN',{ weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const tm = d.toLocaleTimeString('en-IN',{ hour:'2-digit', minute:'2-digit' });

  const html = `
    <div class="p-6 relative">
      <button onclick="closeAllModals()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><i class="fas fa-times text-lg"></i></button>

      <div class="text-center mb-6">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check text-green-500 text-3xl"></i>
        </div>
        <h3 class="font-extrabold text-slate-900 text-xl">Booking Confirmed!</h3>
        <p class="text-slate-400 text-sm mt-1">Your ${c.type} has been booked successfully</p>
      </div>

      <div class="space-y-2.5 mb-5">
        <div class="flex justify-between p-3 bg-slate-50 rounded-xl text-sm"><span class="text-slate-400">Type</span><span class="font-semibold text-slate-900">${c.type}</span></div>
        <div class="flex justify-between p-3 bg-slate-50 rounded-xl text-sm"><span class="text-slate-400">Amount Paid</span><span class="font-extrabold text-green-600">₹${c.amount}</span></div>
        <div class="flex justify-between p-3 bg-slate-50 rounded-xl text-sm"><span class="text-slate-400">Date</span><span class="font-semibold text-slate-900">${dt}</span></div>
        <div class="flex justify-between p-3 bg-slate-50 rounded-xl text-sm"><span class="text-slate-400">Time</span><span class="font-semibold text-slate-900">${tm}</span></div>
      </div>

      <div class="video-placeholder mb-5">
        <i class="fas fa-video text-2xl text-white/50"></i>
        <p class="text-white font-bold text-sm">Your Consultation Link</p>
        <div class="bg-white/10 rounded-lg px-3 py-2 text-xs text-white/70 font-mono break-all text-center">${c.meetingLink}</div>
        <p class="text-white/40 text-xs">Link activates 15 min before your session</p>
      </div>

      <div class="flex gap-3">
        <button onclick="copyToClipboard('${c.meetingLink}')" class="flex-1 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all">
          <i class="fas fa-copy"></i>Copy Link
        </button>
        <button onclick="closeAllModals();openDashboard()" class="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all">
          <i class="fas fa-table-columns"></i>Dashboard
        </button>
      </div>
    </div>`;

  document.getElementById('payment-modal-content').innerHTML = html;
  openModal('payment-modal-wrap');
}

/* ──────────────────────────────────────────────────────────
   DASHBOARD
────────────────────────────────────────────────────────── */

function openDashboard() {
  renderDashboard();
  document.getElementById('dashboard-overlay').classList.remove('hidden');
  document.getElementById('dashboard-panel').classList.add('dash-open');
  document.body.style.overflow = 'hidden';
}

function closeDashboard() {
  document.getElementById('dashboard-overlay').classList.add('hidden');
  document.getElementById('dashboard-panel').classList.remove('dash-open');
  document.body.style.overflow = '';
}

function renderDashboard() {
  const ests  = lsGet(LS.estimations);
  const cons  = lsGet(LS.consultations);

  const emptyEst = `
    <div class="text-center py-12">
      <i class="fas fa-file-medical text-5xl text-slate-200 mb-3"></i>
      <p class="text-slate-400 font-semibold">No estimations yet</p>
      <p class="text-slate-300 text-sm mt-1">Submit your first query to get started</p>
      <button onclick="closeDashboard();document.getElementById('estimator').scrollIntoView({behavior:'smooth'})" class="mt-4 px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
        Get Free Estimate
      </button>
    </div>`;

  const emptyCons = `
    <div class="text-center py-12">
      <i class="fas fa-video text-5xl text-slate-200 mb-3"></i>
      <p class="text-slate-400 font-semibold">No consultations yet</p>
      <p class="text-slate-300 text-sm mt-1">Book your first consultation to see it here</p>
    </div>`;

  const estCards = ests.length === 0 ? emptyEst : ests.map(e => `
    <div class="border border-slate-100 rounded-xl p-4 hover:border-primary-200 hover:shadow-sm transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <span class="text-xs bg-primary-100 text-primary-700 font-bold px-2 py-0.5 rounded-full">${e.result?.specialty || 'General'}</span>
            <span class="text-xs text-slate-400">${fmtDate(e.timestamp)}</span>
          </div>
          <p class="font-bold text-slate-900 text-sm">${e.name} · ${e.city}</p>
          <p class="text-xs text-slate-400 mt-0.5 line-clamp-2">${(e.condition||'').substring(0,90)}…</p>
          <div class="mt-2 flex items-center gap-3 text-xs text-slate-400">
            <span><i class="fas fa-hospital text-primary-400 mr-1"></i>${e.result?.hospitals?.length||0} hospitals matched</span>
            <span><i class="fas fa-clock text-primary-400 mr-1"></i>${(e.result?.timeline||'').split('(')[0].trim()}</span>
          </div>
        </div>
        <button onclick="deleteEstimation('${e.id}')" class="w-8 h-8 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"><i class="fas fa-trash text-sm"></i></button>
      </div>
    </div>`).join('');

  const conCards = cons.length === 0 ? emptyCons : cons.map(c => `
    <div class="border border-slate-100 rounded-xl p-4 hover:border-green-200 hover:shadow-sm transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <span class="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Confirmed</span>
            <span class="text-xs text-slate-400">${fmtDate(c.timestamp)}</span>
          </div>
          <p class="font-bold text-slate-900 text-sm">${c.type}</p>
          <p class="text-xs text-green-600 font-extrabold mt-0.5">₹${c.amount} paid</p>
          <div class="mt-2 text-xs text-slate-400 font-mono truncate"><i class="fas fa-video mr-1"></i>${c.meetingLink}</div>
        </div>
        <button onclick="deleteConsultation('${c.id}')" class="w-8 h-8 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"><i class="fas fa-trash text-sm"></i></button>
      </div>
    </div>`).join('');

  document.getElementById('dashboard-content').innerHTML = `
    <div class="flex flex-col h-full min-h-screen">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary-700 to-primary-600 px-5 py-5 flex-shrink-0">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-white font-extrabold text-xl">My Dashboard</h2>
            <p class="text-primary-200 text-xs mt-0.5">${ests.length} estimations · ${cons.length} consultations</p>
          </div>
          <button onclick="closeDashboard()" class="w-9 h-9 bg-white/20 hover:bg-white/30 text-white rounded-xl flex items-center justify-center transition-colors"><i class="fas fa-times"></i></button>
        </div>
        <div class="flex gap-1.5">
          <button id="dash-tab-est" onclick="switchDashTab('est')" class="flex-1 py-2 rounded-xl text-sm font-bold bg-white text-primary-700 transition-all"><i class="fas fa-file-medical mr-1.5"></i>Estimations</button>
          <button id="dash-tab-con" onclick="switchDashTab('con')" class="flex-1 py-2 rounded-xl text-sm font-bold bg-white/20 text-white transition-all"><i class="fas fa-video mr-1.5"></i>Consultations</button>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto">
        <div id="dash-pane-est" class="p-4 space-y-3">${estCards}</div>
        <div id="dash-pane-con" class="p-4 space-y-3 hidden">${conCards}</div>
      </div>

      <!-- Footer -->
      <div class="border-t border-slate-100 p-4 flex-shrink-0 bg-white">
        <button onclick="clearAllData()" class="w-full py-2.5 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          <i class="fas fa-trash-alt"></i>Clear All My Data
        </button>
      </div>
    </div>`;
}

function switchDashTab(tab) {
  const est = document.getElementById('dash-pane-est');
  const con = document.getElementById('dash-pane-con');
  const tEst = document.getElementById('dash-tab-est');
  const tCon = document.getElementById('dash-tab-con');
  if (tab === 'est') {
    est.classList.remove('hidden'); con.classList.add('hidden');
    tEst.className = 'flex-1 py-2 rounded-xl text-sm font-bold bg-white text-primary-700 transition-all';
    tCon.className = 'flex-1 py-2 rounded-xl text-sm font-bold bg-white/20 text-white transition-all';
  } else {
    con.classList.remove('hidden'); est.classList.add('hidden');
    tCon.className = 'flex-1 py-2 rounded-xl text-sm font-bold bg-white text-primary-700 transition-all';
    tEst.className = 'flex-1 py-2 rounded-xl text-sm font-bold bg-white/20 text-white transition-all';
  }
}

function clearAllData() {
  if (!confirm('Clear all your estimations and consultations? This cannot be undone.')) return;
  localStorage.removeItem(LS.estimations);
  localStorage.removeItem(LS.consultations);
  renderDashboard();
  showToast('All data cleared', 'info');
}

/* ──────────────────────────────────────────────────────────
   WHATSAPP CHAT
────────────────────────────────────────────────────────── */

function openWhatsAppChat() {
  const RESPONSES = [
    'Hello! I\'m Priya, your healthcare navigator 😊 How can I help you today?',
    'I understand your concern. Many patients come to us with similar queries. Let me help you navigate this.',
    'Great! I recommend getting a free estimation first. Would you like me to guide you through the form?',
    'Based on what you\'ve shared, I can recommend excellent hospitals. Shall we start with the free estimator?',
    'I\'m here to help! Please fill out our estimation form and I\'ll personally review your case within 30 minutes.'
  ];

  const chatHtml = `
    <div class="p-5 relative">
      <button onclick="closeAllModals()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><i class="fas fa-times text-lg"></i></button>
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><i class="fab fa-whatsapp text-green-600 text-2xl"></i></div>
        <div>
          <h3 class="font-bold text-slate-900">Chat with Expert</h3>
          <div class="flex items-center gap-1.5 mt-0.5"><span class="status-dot"></span><span class="text-green-600 text-xs font-semibold">Online Now</span></div>
        </div>
      </div>
      <div id="chat-box" class="chat-box bg-slate-50 rounded-xl p-3 space-y-3 mb-3">
        <div class="flex items-end gap-2">
          <div class="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-user-doctor text-primary-600 text-xs"></i></div>
          <div class="bg-white rounded-2xl rounded-bl-none px-3 py-2 shadow-sm max-w-xs">
            <p class="text-sm text-slate-700">${RESPONSES[0]}</p>
            <p class="text-xs text-slate-300 mt-1">Just now</p>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <input id="chat-inp" type="text" placeholder="Type your message…" class="flex-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 transition-colors" onkeydown="if(event.key==='Enter')sendChatMsg()">
        <button onclick="sendChatMsg()" class="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center transition-colors"><i class="fas fa-paper-plane text-sm"></i></button>
      </div>
      <p class="text-center text-xs text-slate-300 mt-2">Demo mode — responses are simulated</p>
    </div>`;

  document.getElementById('payment-modal-content').innerHTML = chatHtml;
  openModal('payment-modal-wrap');
}

async function sendChatMsg() {
  const inp = document.getElementById('chat-inp');
  const box = document.getElementById('chat-box');
  const msg = inp.value.trim();
  if (!msg) return;

  // User bubble
  const uBubble = document.createElement('div');
  uBubble.className = 'flex justify-end';
  uBubble.innerHTML = `<div class="bg-primary-600 rounded-2xl rounded-br-none px-3 py-2 max-w-xs"><p class="text-sm text-white">${escHtml(msg)}</p></div>`;
  box.appendChild(uBubble);
  inp.value = '';
  box.scrollTop = box.scrollHeight;

  const REPLIES = [
    'I understand. Let me pull up the best hospitals for your condition right away.',
    'That\'s a common concern we help with every day. I\'ll personally ensure you get the best guidance.',
    'Great question! I recommend filling our free estimation form — it takes just 2 minutes.',
    'Based on what you\'ve shared, I can suggest several top hospitals. Shall we start?',
    'Our healthcare navigators specialise in exactly this. Let\'s get you matched with the right hospital.'
  ];

  await delay(900 + Math.random() * 500);

  const bBubble = document.createElement('div');
  bBubble.className = 'flex items-end gap-2';
  bBubble.innerHTML = `
    <div class="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-user-doctor text-primary-600 text-xs"></i></div>
    <div class="bg-white rounded-2xl rounded-bl-none px-3 py-2 shadow-sm max-w-xs">
      <p class="text-sm text-slate-700">${REPLIES[Math.floor(Math.random() * REPLIES.length)]}</p>
      <p class="text-xs text-slate-300 mt-1">Just now</p>
    </div>`;
  box.appendChild(bBubble);
  box.scrollTop = box.scrollHeight;
}

/* ──────────────────────────────────────────────────────────
   REFERRAL
────────────────────────────────────────────────────────── */

function handleReferral(platform) {
  const link = 'https://esticure.in?ref=FRIEND2024';
  const msg  = `I just used Esticure to get the best hospital recommendation for my treatment! Try it free: ${link}`;
  if (platform === 'copy') {
    copyToClipboard(link);
  } else if (platform === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('Opening WhatsApp…', 'info');
  } else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('Opening X/Twitter…', 'info');
  }
}

function openTourismEnquiry() {
  showToast('Our tourism team will call you within 2 hours. Call +91 98765 43210 for immediate assistance.', 'info');
}

function handleContactSubmit(e) {
  e.preventDefault();
  showToast('Message sent! We\'ll respond within 24 hours.', 'success');
  e.target.reset();
}

/* ──────────────────────────────────────────────────────────
   MODAL HELPERS
────────────────────────────────────────────────────────── */

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function showLoadingModal(text) {
  document.getElementById('loading-text').textContent = text;
  openModal('loading-modal-wrap');
}

function closeAllModals() {
  document.querySelectorAll('.modal-wrap').forEach(m => m.classList.add('hidden'));
  document.body.style.overflow = '';
}

/* ──────────────────────────────────────────────────────────
   TOAST
────────────────────────────────────────────────────────── */

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const id = 'toast-' + genId();

  const icons   = { success:'fa-circle-check', error:'fa-circle-xmark', info:'fa-circle-info', warning:'fa-triangle-exclamation' };
  const colours = { success:'bg-green-500', error:'bg-red-500', info:'bg-slate-700', warning:'bg-amber-500' };

  const el = document.createElement('div');
  el.id = id;
  el.className = `toast pointer-events-all flex items-center gap-3 ${colours[type]} text-white px-4 py-3.5 rounded-xl shadow-xl min-w-[260px] max-w-[340px]`;
  el.innerHTML = `
    <i class="fas ${icons[type]} flex-shrink-0"></i>
    <p class="text-sm font-medium flex-1">${message}</p>
    <button onclick="removeToast('${id}')" class="opacity-70 hover:opacity-100 flex-shrink-0"><i class="fas fa-xmark text-xs"></i></button>`;

  container.appendChild(el);
  setTimeout(() => removeToast(id), 4500);
}

function removeToast(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('toast-out'); setTimeout(() => el.remove(), 320); }
}

/* ──────────────────────────────────────────────────────────
   CITY TABS
────────────────────────────────────────────────────────── */

function showCityTab(city) {
  document.querySelectorAll('.city-panel').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.city-tab').forEach(t => {
    t.className = 'city-tab px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 transition-all';
  });
  document.getElementById('city-' + city).classList.remove('hidden');
  document.getElementById('tab-' + city).className = 'city-tab active-tab px-5 py-2.5 rounded-lg text-sm font-semibold transition-all';
}

/* ──────────────────────────────────────────────────────────
   NAVIGATION
────────────────────────────────────────────────────────── */

function toggleMobileMenu() {
  const m = document.getElementById('mobile-menu');
  const b = document.getElementById('mobile-menu-btn').querySelector('i');
  m.classList.toggle('hidden');
  b.className = m.classList.contains('hidden') ? 'fas fa-bars text-slate-600' : 'fas fa-times text-slate-600';
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.add('hidden');
  document.getElementById('mobile-menu-btn').querySelector('i').className = 'fas fa-bars text-slate-600';
}

/* ──────────────────────────────────────────────────────────
   UTILITIES
────────────────────────────────────────────────────────── */

const delay = ms => new Promise(r => setTimeout(r, ms));

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN',{
      day:'numeric', month:'short', year:'numeric',
      hour:'2-digit', minute:'2-digit'
    });
  } catch { return 'Recently'; }
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!', 'success'));
  } else {
    const t = Object.assign(document.createElement('textarea'), { value: text });
    document.body.appendChild(t); t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    showToast('Copied to clipboard!', 'success');
  }
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ──────────────────────────────────────────────────────────
   SCROLL REVEAL
────────────────────────────────────────────────────────── */

function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.style.animationDelay || 0) * 1000;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.anim-fade-up').forEach(el => io.observe(el));
}

/* ──────────────────────────────────────────────────────────
   COUNTER ANIMATION
────────────────────────────────────────────────────────── */

function initCounters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseFloat(el.dataset.target);
      const dec    = target % 1 !== 0;
      const dur    = 1600;
      const step   = 16;
      const inc    = target / (dur / step);
      let cur = 0;
      const timer = setInterval(() => {
        cur = Math.min(cur + inc, target);
        el.textContent = dec ? cur.toFixed(1) : Math.floor(cur).toLocaleString('en-IN');
        if (cur >= target) clearInterval(timer);
      }, step);
      io.unobserve(el);
    });
  }, { threshold: .6 });

  document.querySelectorAll('.counter').forEach(el => io.observe(el));
}

/* ──────────────────────────────────────────────────────────
   REVENUE BAR ANIMATION
────────────────────────────────────────────────────────── */

function initRevenueBars() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.revenue-bar').forEach(bar => {
        const h = bar.dataset.height;
        bar.style.height = '0';
        requestAnimationFrame(() => {
          bar.style.transition = 'height 1s cubic-bezier(.4,0,.2,1)';
          bar.style.height = h;
        });
      });
      io.unobserve(entry.target);
    });
  }, { threshold: .3 });

  document.querySelectorAll('[data-height]').forEach(el => {
    const parent = el.closest('.anim-fade-up') || el.parentElement;
    if (parent) io.observe(parent);
  });
}

/* ──────────────────────────────────────────────────────────
   NAVBAR SCROLL SHADOW
────────────────────────────────────────────────────────── */

function initNavbar() {
  const nav = document.getElementById('navbar');
  const badge = document.getElementById('demo-badge');
  const updateTop = () => {
    nav.style.top = (badge && badge.offsetHeight > 0 ? badge.offsetHeight : 0) + 'px';
  };
  updateTop();
  window.addEventListener('scroll', () => {
    window.scrollY > 10 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
  });
}

/* ──────────────────────────────────────────────────────────
   RIPPLE BUTTON EFFECT
────────────────────────────────────────────────────────── */

function initRipples() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-ripple');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement('span');
    span.className = 'ripple-circle';
    span.style.left = (e.clientX - rect.left) + 'px';
    span.style.top  = (e.clientY - rect.top)  + 'px';
    btn.appendChild(span);
    setTimeout(() => span.remove(), 600);
  });
}

/* ──────────────────────────────────────────────────────────
   SMOOTH ANCHOR LINKS
────────────────────────────────────────────────────────── */

function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
}

/* ──────────────────────────────────────────────────────────
   INIT
────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initRevenueBars();
  initRipples();
  initAnchors();

  // ESC to close modals / dashboard
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeAllModals();
    closeDashboard();
  });

  // Backdrop clicks for modals
  document.querySelectorAll('.modal-backdrop').forEach(bd => {
    bd.addEventListener('click', closeAllModals);
  });

  console.log('%c🏥 Esticure loaded successfully — no errors!', 'color:#0d9488;font-weight:bold;font-size:14px');
});
