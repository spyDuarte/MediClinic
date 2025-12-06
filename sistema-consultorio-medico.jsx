import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, DollarSign, BarChart3, Clock, Plus, Search, Edit, Trash2, Check, X, ChevronLeft, ChevronRight, User, Phone, Mail, MapPin, Activity, Stethoscope, Pill, ClipboardList, TrendingUp, AlertCircle, CheckCircle, Bell, Settings, LogOut, Heart, Thermometer, Weight, Ruler, Eye, Save, Filter, Download, Printer } from 'lucide-react';

// ========== DADOS INICIAIS ==========
const initialPatients = [
  { id: 1, name: 'Maria Silva Santos', cpf: '123.456.789-00', phone: '(11) 98765-4321', email: 'maria@email.com', birthDate: '1985-03-15', gender: 'F', address: 'Rua das Flores, 123 - São Paulo/SP', bloodType: 'O+', allergies: 'Dipirona', insurance: 'Unimed', insuranceNumber: '123456789', notes: 'Paciente hipertensa', registeredAt: '2024-01-10' },
  { id: 2, name: 'João Pedro Oliveira', cpf: '987.654.321-00', phone: '(11) 91234-5678', email: 'joao@email.com', birthDate: '1978-07-22', gender: 'M', address: 'Av. Paulista, 1000 - São Paulo/SP', bloodType: 'A+', allergies: 'Nenhuma', insurance: 'Bradesco Saúde', insuranceNumber: '987654321', notes: 'Diabético tipo 2', registeredAt: '2024-02-05' },
  { id: 3, name: 'Ana Carolina Ferreira', cpf: '456.789.123-00', phone: '(11) 99876-5432', email: 'ana@email.com', birthDate: '1990-11-08', gender: 'F', address: 'Rua Augusta, 500 - São Paulo/SP', bloodType: 'B-', allergies: 'Penicilina', insurance: 'Particular', insuranceNumber: '', notes: '', registeredAt: '2024-03-12' },
  { id: 4, name: 'Carlos Eduardo Lima', cpf: '321.654.987-00', phone: '(11) 94567-8901', email: 'carlos@email.com', birthDate: '1965-05-30', gender: 'M', address: 'Rua Oscar Freire, 200 - São Paulo/SP', bloodType: 'AB+', allergies: 'Sulfa, Ibuprofeno', insurance: 'SulAmérica', insuranceNumber: '456789123', notes: 'Cardiopata - uso de marcapasso', registeredAt: '2024-01-20' },
  { id: 5, name: 'Fernanda Costa Souza', cpf: '789.123.456-00', phone: '(11) 97654-3210', email: 'fernanda@email.com', birthDate: '1995-09-18', gender: 'F', address: 'Alameda Santos, 800 - São Paulo/SP', bloodType: 'A-', allergies: 'Nenhuma', insurance: 'Amil', insuranceNumber: '789456123', notes: 'Gestante - 28 semanas', registeredAt: '2024-04-01' },
];

const initialAppointments = [
  { id: 1, patientId: 1, patientName: 'Maria Silva Santos', date: '2025-12-06', time: '09:00', duration: 30, type: 'Consulta', status: 'confirmed', notes: 'Retorno hipertensão' },
  { id: 2, patientId: 2, patientName: 'João Pedro Oliveira', date: '2025-12-06', time: '09:30', duration: 30, type: 'Consulta', status: 'confirmed', notes: 'Acompanhamento diabetes' },
  { id: 3, patientId: 3, patientName: 'Ana Carolina Ferreira', date: '2025-12-06', time: '10:00', duration: 45, type: 'Primeira Consulta', status: 'waiting', notes: 'Nova paciente' },
  { id: 4, patientId: 4, patientName: 'Carlos Eduardo Lima', date: '2025-12-06', time: '11:00', duration: 30, type: 'Retorno', status: 'pending', notes: 'Avaliação cardíaca' },
  { id: 5, patientId: 5, patientName: 'Fernanda Costa Souza', date: '2025-12-06', time: '14:00', duration: 45, type: 'Pré-natal', status: 'pending', notes: 'Consulta pré-natal mensal' },
  { id: 6, patientId: 1, patientName: 'Maria Silva Santos', date: '2025-12-07', time: '10:00', duration: 30, type: 'Exame', status: 'pending', notes: 'Coleta de exames' },
  { id: 7, patientId: 2, patientName: 'João Pedro Oliveira', date: '2025-12-09', time: '15:00', duration: 30, type: 'Retorno', status: 'pending', notes: 'Resultado de exames' },
];

const initialMedicalRecords = [
  { id: 1, patientId: 1, date: '2024-11-15', type: 'Consulta', complaint: 'Dor de cabeça frequente', diagnosis: 'Cefaleia tensional', prescription: 'Paracetamol 750mg - 1 comp. 8/8h se dor', notes: 'Orientada sobre controle do estresse', vitals: { pressure: '140/90', heartRate: 78, temp: 36.5, weight: 68, height: 165 } },
  { id: 2, patientId: 1, date: '2024-10-10', type: 'Retorno', complaint: 'Acompanhamento hipertensão', diagnosis: 'Hipertensão arterial controlada', prescription: 'Manter Losartana 50mg 1x/dia', notes: 'PA estável, manter medicação', vitals: { pressure: '130/85', heartRate: 72, temp: 36.2, weight: 67.5, height: 165 } },
  { id: 3, patientId: 2, date: '2024-11-20', type: 'Consulta', complaint: 'Controle glicêmico', diagnosis: 'DM2 controlado', prescription: 'Metformina 850mg - 1 comp. 2x/dia', notes: 'Glicemia de jejum: 110mg/dL', vitals: { pressure: '120/80', heartRate: 68, temp: 36.4, weight: 82, height: 175 } },
  { id: 4, patientId: 4, date: '2024-11-25', type: 'Retorno', complaint: 'Avaliação pós-procedimento', diagnosis: 'Marcapasso funcionando adequadamente', prescription: 'Manter medicações atuais', notes: 'ECG normal, sem arritmias', vitals: { pressure: '125/80', heartRate: 65, temp: 36.3, weight: 78, height: 172 } },
  { id: 5, patientId: 5, date: '2024-11-28', type: 'Pré-natal', complaint: 'Consulta de rotina - 24 semanas', diagnosis: 'Gestação de evolução normal', prescription: 'Sulfato ferroso + Ácido fólico', notes: 'BCF: 140bpm, AU: 24cm', vitals: { pressure: '110/70', heartRate: 82, temp: 36.6, weight: 72, height: 168 } },
];

const initialTransactions = [
  { id: 1, type: 'income', patientId: 1, patientName: 'Maria Silva Santos', description: 'Consulta médica', category: 'Consulta', amount: 350, date: '2024-11-15', paymentMethod: 'PIX', status: 'paid' },
  { id: 2, type: 'income', patientId: 2, patientName: 'João Pedro Oliveira', description: 'Consulta médica', category: 'Consulta', amount: 350, date: '2024-11-20', paymentMethod: 'Cartão Crédito', status: 'paid' },
  { id: 3, type: 'income', patientId: 3, patientName: 'Ana Carolina Ferreira', description: 'Primeira consulta', category: 'Consulta', amount: 450, date: '2024-11-22', paymentMethod: 'Dinheiro', status: 'paid' },
  { id: 4, type: 'expense', patientId: null, patientName: '', description: 'Aluguel do consultório', category: 'Aluguel', amount: 3500, date: '2024-11-05', paymentMethod: 'Boleto', status: 'paid' },
  { id: 5, type: 'expense', patientId: null, patientName: '', description: 'Material de escritório', category: 'Material', amount: 280, date: '2024-11-10', paymentMethod: 'Cartão Débito', status: 'paid' },
  { id: 6, type: 'income', patientId: 4, patientName: 'Carlos Eduardo Lima', description: 'Retorno + ECG', category: 'Procedimento', amount: 550, date: '2024-11-25', paymentMethod: 'Convênio', status: 'pending' },
  { id: 7, type: 'expense', patientId: null, patientName: '', description: 'Conta de luz', category: 'Utilidades', amount: 450, date: '2024-11-28', paymentMethod: 'Débito Automático', status: 'paid' },
  { id: 8, type: 'income', patientId: 5, patientName: 'Fernanda Costa Souza', description: 'Consulta pré-natal', category: 'Consulta', amount: 400, date: '2024-11-28', paymentMethod: 'Convênio', status: 'paid' },
];

// ========== COMPONENTES DE UI ==========
const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, className = '', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg shadow-teal-500/25',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200',
    danger: 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-500/25',
    success: 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/25',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25',
    ghost: 'hover:bg-slate-100 text-slate-600',
    outline: 'border-2 border-teal-500 text-teal-600 hover:bg-teal-50',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2', lg: 'px-6 py-3 text-lg' };
  
  return (
    <button className={`inline-flex items-center gap-2 font-medium rounded-xl transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
      {children}
    </button>
  );
};

const Input = ({ label, icon: Icon, error, className = '', ...props }) => (
  <div className={`space-y-1.5 ${className}`}>
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />}
      <input className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-white border-2 ${error ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-teal-500'} rounded-xl outline-none transition-colors`} {...props} />
    </div>
    {error && <p className="text-sm text-rose-500">{error}</p>}
  </div>
);

const Select = ({ label, options = [], className = '', ...props }) => (
  <div className={`space-y-1.5 ${className}`}>
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <select className="w-full px-4 py-2.5 bg-white border-2 border-slate-200 focus:border-teal-500 rounded-xl outline-none transition-colors appearance-none cursor-pointer" {...props}>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, className = '', ...props }) => (
  <div className={`space-y-1.5 ${className}`}>
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <textarea className="w-full px-4 py-3 bg-white border-2 border-slate-200 focus:border-teal-500 rounded-xl outline-none transition-colors resize-none" {...props} />
  </div>
);

const Card = ({ children, className = '', hover = false }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${hover ? 'hover:shadow-lg hover:border-slate-300 transition-all duration-300' : ''} ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-rose-100 text-rose-700',
    info: 'bg-sky-100 text-sky-700',
    primary: 'bg-teal-100 text-teal-700',
  };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${variants[variant]} ${className}`}>{children}</span>;
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative ${sizes[size]} w-full bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendUp, color = 'teal' }) => {
  const colors = {
    teal: 'from-teal-500 to-cyan-500 shadow-teal-500/30',
    emerald: 'from-emerald-500 to-green-500 shadow-emerald-500/30',
    amber: 'from-amber-500 to-orange-500 shadow-amber-500/30',
    rose: 'from-rose-500 to-pink-500 shadow-rose-500/30',
    violet: 'from-violet-500 to-purple-500 shadow-violet-500/30',
    sky: 'from-sky-500 to-blue-500 shadow-sky-500/30',
  };
  
  return (
    <Card className="p-6" hover>
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-800">{value}</p>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              <TrendingUp size={14} className={!trendUp ? 'rotate-180' : ''} />
              {trend}
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${colors[color]} shadow-lg`}>
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </Card>
  );
};

// ========== FUNÇÕES AUXILIARES ==========
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR');
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const calculateAge = (birthDate) => {
  if (!birthDate) return '';
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const getStatusBadge = (status) => {
  const statusMap = {
    pending: { label: 'Pendente', variant: 'warning' },
    confirmed: { label: 'Confirmado', variant: 'success' },
    waiting: { label: 'Aguardando', variant: 'info' },
    completed: { label: 'Finalizado', variant: 'default' },
    cancelled: { label: 'Cancelado', variant: 'danger' },
    paid: { label: 'Pago', variant: 'success' },
  };
  const config = statusMap[status] || { label: status, variant: 'default' };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

// ========== COMPONENTE PRINCIPAL ==========
export default function ConsultorioMedico() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [medicalRecords, setMedicalRecords] = useState(initialMedicalRecords);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'patients', label: 'Pacientes', icon: Users },
    { id: 'appointments', label: 'Agenda', icon: Calendar },
    { id: 'records', label: 'Prontuários', icon: FileText },
    { id: 'financial', label: 'Financeiro', icon: DollarSign },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  ];

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
  };

  // ========== DASHBOARD ==========
  const Dashboard = () => {
    const todayAppointments = appointments.filter(a => a.date === selectedDate);
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const pendingPayments = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 mt-1">Bem-vindo ao seu consultório</p>
          </div>
          <div className="flex items-center gap-3">
            <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-auto" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Pacientes Cadastrados" value={patients.length} subtitle="Total de pacientes" icon={Users} color="teal" trend="+12% este mês" trendUp />
          <StatCard title="Consultas Hoje" value={todayAppointments.length} subtitle={`${todayAppointments.filter(a => a.status === 'completed').length} realizadas`} icon={Calendar} color="sky" />
          <StatCard title="Receita do Mês" value={formatCurrency(totalIncome)} subtitle="Total recebido" icon={TrendingUp} color="emerald" trend="+8% vs mês anterior" trendUp />
          <StatCard title="Pagamentos Pendentes" value={formatCurrency(pendingPayments)} subtitle={`${transactions.filter(t => t.status === 'pending').length} pendentes`} icon={AlertCircle} color="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Consultas de Hoje</h2>
              <Button size="sm" icon={Plus} onClick={() => openModal('appointment')}>Nova Consulta</Button>
            </div>
            {todayAppointments.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                <p>Nenhuma consulta agendada para hoje</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayAppointments.map(apt => (
                  <div key={apt.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold">
                        {apt.time}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{apt.patientName}</p>
                        <p className="text-sm text-slate-500">{apt.type} • {apt.duration} min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(apt.status)}
                      <Button variant="ghost" size="sm" icon={Eye} onClick={() => { setSelectedPatient(patients.find(p => p.id === apt.patientId)); setActiveTab('records'); }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Atividade Recente</h2>
            <div className="space-y-4">
              {[...transactions].reverse().slice(0, 5).map(t => (
                <div key={t.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      <DollarSign size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{t.description}</p>
                      <p className="text-xs text-slate-500">{formatDate(t.date)}</p>
                    </div>
                  </div>
                  <span className={`font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Resumo Financeiro</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl">
                <span className="text-emerald-700 font-medium">Total de Receitas</span>
                <span className="text-emerald-700 font-bold text-xl">{formatCurrency(totalIncome)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-rose-50 rounded-xl">
                <span className="text-rose-700 font-medium">Total de Despesas</span>
                <span className="text-rose-700 font-bold text-xl">{formatCurrency(totalExpense)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-teal-50 rounded-xl border-2 border-teal-200">
                <span className="text-teal-700 font-medium">Lucro Líquido</span>
                <span className="text-teal-700 font-bold text-xl">{formatCurrency(totalIncome - totalExpense)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Próximas Consultas</h2>
            <div className="space-y-3">
              {appointments.filter(a => a.date >= selectedDate && a.status !== 'completed').slice(0, 4).map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{apt.patientName}</p>
                      <p className="text-sm text-slate-500">{formatDate(apt.date)} às {apt.time}</p>
                    </div>
                  </div>
                  {getStatusBadge(apt.status)}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  // ========== PACIENTES ==========
  const Patients = () => {
    const [patientForm, setPatientForm] = useState({
      name: '', cpf: '', phone: '', email: '', birthDate: '', gender: 'M',
      address: '', bloodType: '', allergies: '', insurance: '', insuranceNumber: '', notes: ''
    });

    const filteredPatients = patients.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cpf.includes(searchTerm) ||
      p.phone.includes(searchTerm)
    );

    const handleSavePatient = () => {
      if (!patientForm.name || !patientForm.cpf) return;
      
      if (editingItem) {
        setPatients(patients.map(p => p.id === editingItem.id ? { ...patientForm, id: editingItem.id, registeredAt: editingItem.registeredAt } : p));
      } else {
        const newPatient = { ...patientForm, id: Date.now(), registeredAt: new Date().toISOString().split('T')[0] };
        setPatients([...patients, newPatient]);
      }
      closeModal();
      setPatientForm({ name: '', cpf: '', phone: '', email: '', birthDate: '', gender: 'M', address: '', bloodType: '', allergies: '', insurance: '', insuranceNumber: '', notes: '' });
    };

    const handleDeletePatient = (id) => {
      if (confirm('Deseja realmente excluir este paciente?')) {
        setPatients(patients.filter(p => p.id !== id));
      }
    };

    useEffect(() => {
      if (editingItem && modalType === 'patient') {
        setPatientForm(editingItem);
      } else {
        setPatientForm({ name: '', cpf: '', phone: '', email: '', birthDate: '', gender: 'M', address: '', bloodType: '', allergies: '', insurance: '', insuranceNumber: '', notes: '' });
      }
    }, [editingItem, modalType]);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Pacientes</h1>
            <p className="text-slate-500 mt-1">{patients.length} pacientes cadastrados</p>
          </div>
          <Button icon={Plus} onClick={() => openModal('patient')}>Novo Paciente</Button>
        </div>

        <Card className="p-4">
          <div className="flex gap-4">
            <Input icon={Search} placeholder="Buscar por nome, CPF ou telefone..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="flex-1" />
            <Button variant="secondary" icon={Filter}>Filtrar</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map(patient => (
            <Card key={patient.id} className="p-5" hover>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {patient.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{patient.name}</h3>
                    <p className="text-sm text-slate-500">{calculateAge(patient.birthDate)} anos • {patient.gender === 'M' ? 'Masculino' : 'Feminino'}</p>
                  </div>
                </div>
                <Badge variant="primary">{patient.bloodType || 'N/I'}</Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone size={14} /> {patient.phone}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail size={14} /> {patient.email}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Stethoscope size={14} /> {patient.insurance || 'Particular'}
                </div>
              </div>

              {patient.allergies && patient.allergies !== 'Nenhuma' && (
                <div className="mt-3 p-2 bg-rose-50 rounded-lg">
                  <p className="text-xs text-rose-600 font-medium">⚠️ Alergias: {patient.allergies}</p>
                </div>
              )}

              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                <Button variant="ghost" size="sm" icon={Eye} onClick={() => { setSelectedPatient(patient); setActiveTab('records'); }} className="flex-1">Ver Prontuário</Button>
                <Button variant="ghost" size="sm" icon={Edit} onClick={() => openModal('patient', patient)} />
                <Button variant="ghost" size="sm" icon={Trash2} onClick={() => handleDeletePatient(patient.id)} className="text-rose-500 hover:bg-rose-50" />
              </div>
            </Card>
          ))}
        </div>

        <Modal isOpen={showModal && modalType === 'patient'} onClose={closeModal} title={editingItem ? 'Editar Paciente' : 'Novo Paciente'} size="lg">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nome Completo *" value={patientForm.name} onChange={e => setPatientForm({...patientForm, name: e.target.value})} className="col-span-2" />
            <Input label="CPF *" value={patientForm.cpf} onChange={e => setPatientForm({...patientForm, cpf: e.target.value})} placeholder="000.000.000-00" />
            <Input label="Data de Nascimento" type="date" value={patientForm.birthDate} onChange={e => setPatientForm({...patientForm, birthDate: e.target.value})} />
            <Select label="Sexo" value={patientForm.gender} onChange={e => setPatientForm({...patientForm, gender: e.target.value})} options={[{value: 'M', label: 'Masculino'}, {value: 'F', label: 'Feminino'}]} />
            <Select label="Tipo Sanguíneo" value={patientForm.bloodType} onChange={e => setPatientForm({...patientForm, bloodType: e.target.value})} options={[{value:'', label:'Selecione'},{value:'A+', label:'A+'},{value:'A-', label:'A-'},{value:'B+', label:'B+'},{value:'B-', label:'B-'},{value:'AB+', label:'AB+'},{value:'AB-', label:'AB-'},{value:'O+', label:'O+'},{value:'O-', label:'O-'}]} />
            <Input label="Telefone" value={patientForm.phone} onChange={e => setPatientForm({...patientForm, phone: e.target.value})} placeholder="(00) 00000-0000" />
            <Input label="E-mail" type="email" value={patientForm.email} onChange={e => setPatientForm({...patientForm, email: e.target.value})} />
            <Input label="Endereço" value={patientForm.address} onChange={e => setPatientForm({...patientForm, address: e.target.value})} className="col-span-2" />
            <Input label="Convênio" value={patientForm.insurance} onChange={e => setPatientForm({...patientForm, insurance: e.target.value})} />
            <Input label="Nº Carteirinha" value={patientForm.insuranceNumber} onChange={e => setPatientForm({...patientForm, insuranceNumber: e.target.value})} />
            <Input label="Alergias" value={patientForm.allergies} onChange={e => setPatientForm({...patientForm, allergies: e.target.value})} className="col-span-2" />
            <Textarea label="Observações" value={patientForm.notes} onChange={e => setPatientForm({...patientForm, notes: e.target.value})} rows={3} className="col-span-2" />
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button icon={Save} onClick={handleSavePatient}>Salvar Paciente</Button>
          </div>
        </Modal>
      </div>
    );
  };

  // ========== AGENDA ==========
  const Appointments = () => {
    const [appointmentForm, setAppointmentForm] = useState({
      patientId: '', date: selectedDate, time: '', duration: 30, type: 'Consulta', status: 'pending', notes: ''
    });
    const [viewMode, setViewMode] = useState('day');

    const hours = Array.from({ length: 12 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);
    
    const filteredAppointments = appointments.filter(a => a.date === selectedDate);

    const handleSaveAppointment = () => {
      if (!appointmentForm.patientId || !appointmentForm.date || !appointmentForm.time) return;
      
      const patient = patients.find(p => p.id === parseInt(appointmentForm.patientId));
      
      if (editingItem) {
        setAppointments(appointments.map(a => a.id === editingItem.id ? { ...appointmentForm, id: editingItem.id, patientName: patient?.name || '' } : a));
      } else {
        const newAppointment = { ...appointmentForm, id: Date.now(), patientId: parseInt(appointmentForm.patientId), patientName: patient?.name || '' };
        setAppointments([...appointments, newAppointment]);
      }
      closeModal();
      setAppointmentForm({ patientId: '', date: selectedDate, time: '', duration: 30, type: 'Consulta', status: 'pending', notes: '' });
    };

    const handleDeleteAppointment = (id) => {
      if (confirm('Deseja realmente excluir esta consulta?')) {
        setAppointments(appointments.filter(a => a.id !== id));
      }
    };

    const updateAppointmentStatus = (id, status) => {
      setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
    };

    const navigateDate = (direction) => {
      const current = new Date(selectedDate);
      current.setDate(current.getDate() + direction);
      setSelectedDate(current.toISOString().split('T')[0]);
    };

    useEffect(() => {
      if (editingItem && modalType === 'appointment') {
        setAppointmentForm({ ...editingItem, patientId: editingItem.patientId.toString() });
      } else {
        setAppointmentForm({ patientId: '', date: selectedDate, time: '', duration: 30, type: 'Consulta', status: 'pending', notes: '' });
      }
    }, [editingItem, modalType, selectedDate]);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Agenda</h1>
            <p className="text-slate-500 mt-1">Gerencie suas consultas e horários</p>
          </div>
          <Button icon={Plus} onClick={() => openModal('appointment')}>Nova Consulta</Button>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" icon={ChevronLeft} onClick={() => navigateDate(-1)} />
              <div className="text-center">
                <p className="text-xl font-bold text-slate-800">{new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <Button variant="ghost" size="sm" icon={ChevronRight} onClick={() => navigateDate(1)} />
            </div>
            <div className="flex gap-2">
              <Button variant={viewMode === 'day' ? 'primary' : 'secondary'} size="sm" onClick={() => setViewMode('day')}>Dia</Button>
              <Button variant={viewMode === 'list' ? 'primary' : 'secondary'} size="sm" onClick={() => setViewMode('list')}>Lista</Button>
            </div>
          </div>
        </Card>

        {viewMode === 'day' ? (
          <Card className="p-6">
            <div className="space-y-2">
              {hours.map(hour => {
                const hourAppointments = filteredAppointments.filter(a => a.time.startsWith(hour.split(':')[0]));
                return (
                  <div key={hour} className="flex gap-4 min-h-[60px]">
                    <div className="w-20 py-2 text-right text-sm font-medium text-slate-400">{hour}</div>
                    <div className="flex-1 border-t border-slate-100 py-2">
                      {hourAppointments.length > 0 ? (
                        <div className="space-y-2">
                          {hourAppointments.map(apt => (
                            <div key={apt.id} className={`p-3 rounded-xl border-l-4 ${apt.status === 'confirmed' ? 'bg-emerald-50 border-emerald-500' : apt.status === 'waiting' ? 'bg-sky-50 border-sky-500' : apt.status === 'completed' ? 'bg-slate-50 border-slate-400' : apt.status === 'cancelled' ? 'bg-rose-50 border-rose-500' : 'bg-amber-50 border-amber-500'}`}>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-slate-800">{apt.time} - {apt.patientName}</p>
                                  <p className="text-sm text-slate-500">{apt.type} • {apt.duration} min • {apt.notes}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(apt.status)}
                                  <div className="flex gap-1">
                                    {apt.status === 'pending' && <Button variant="ghost" size="sm" icon={Check} onClick={() => updateAppointmentStatus(apt.id, 'confirmed')} className="text-emerald-600" />}
                                    {apt.status === 'confirmed' && <Button variant="ghost" size="sm" icon={Clock} onClick={() => updateAppointmentStatus(apt.id, 'waiting')} className="text-sky-600" />}
                                    {apt.status === 'waiting' && <Button variant="ghost" size="sm" icon={CheckCircle} onClick={() => updateAppointmentStatus(apt.id, 'completed')} className="text-emerald-600" />}
                                    <Button variant="ghost" size="sm" icon={Edit} onClick={() => openModal('appointment', apt)} />
                                    <Button variant="ghost" size="sm" icon={Trash2} onClick={() => handleDeleteAppointment(apt.id)} className="text-rose-500" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full flex items-center">
                          <button onClick={() => { setAppointmentForm({...appointmentForm, time: hour, date: selectedDate}); openModal('appointment'); }} className="text-sm text-slate-400 hover:text-teal-600 transition-colors">+ Adicionar consulta</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                <p>Nenhuma consulta agendada para este dia</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAppointments.sort((a, b) => a.time.localeCompare(b.time)).map(apt => (
                  <div key={apt.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex flex-col items-center justify-center text-white">
                        <span className="text-lg font-bold">{apt.time}</span>
                        <span className="text-xs opacity-80">{apt.duration}min</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-lg">{apt.patientName}</p>
                        <p className="text-slate-500">{apt.type}</p>
                        {apt.notes && <p className="text-sm text-slate-400 mt-1">{apt.notes}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(apt.status)}
                      <Button variant="ghost" size="sm" icon={Edit} onClick={() => openModal('appointment', apt)} />
                      <Button variant="ghost" size="sm" icon={Trash2} onClick={() => handleDeleteAppointment(apt.id)} className="text-rose-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        <Modal isOpen={showModal && modalType === 'appointment'} onClose={closeModal} title={editingItem ? 'Editar Consulta' : 'Nova Consulta'}>
          <div className="space-y-4">
            <Select label="Paciente *" value={appointmentForm.patientId} onChange={e => setAppointmentForm({...appointmentForm, patientId: e.target.value})} options={[{value: '', label: 'Selecione um paciente'}, ...patients.map(p => ({value: p.id.toString(), label: p.name}))]} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Data *" type="date" value={appointmentForm.date} onChange={e => setAppointmentForm({...appointmentForm, date: e.target.value})} />
              <Input label="Horário *" type="time" value={appointmentForm.time} onChange={e => setAppointmentForm({...appointmentForm, time: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Duração (min)" type="number" value={appointmentForm.duration} onChange={e => setAppointmentForm({...appointmentForm, duration: parseInt(e.target.value)})} />
              <Select label="Tipo" value={appointmentForm.type} onChange={e => setAppointmentForm({...appointmentForm, type: e.target.value})} options={[{value:'Consulta', label:'Consulta'},{value:'Retorno', label:'Retorno'},{value:'Primeira Consulta', label:'Primeira Consulta'},{value:'Exame', label:'Exame'},{value:'Procedimento', label:'Procedimento'},{value:'Pré-natal', label:'Pré-natal'}]} />
            </div>
            <Select label="Status" value={appointmentForm.status} onChange={e => setAppointmentForm({...appointmentForm, status: e.target.value})} options={[{value:'pending', label:'Pendente'},{value:'confirmed', label:'Confirmado'},{value:'waiting', label:'Aguardando'},{value:'completed', label:'Finalizado'},{value:'cancelled', label:'Cancelado'}]} />
            <Textarea label="Observações" value={appointmentForm.notes} onChange={e => setAppointmentForm({...appointmentForm, notes: e.target.value})} rows={3} />
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button icon={Save} onClick={handleSaveAppointment}>Salvar</Button>
          </div>
        </Modal>
      </div>
    );
  };

  // ========== PRONTUÁRIOS ==========
  const MedicalRecords = () => {
    const [recordForm, setRecordForm] = useState({
      patientId: selectedPatient?.id || '', date: new Date().toISOString().split('T')[0], type: 'Consulta',
      complaint: '', diagnosis: '', prescription: '', notes: '',
      vitals: { pressure: '', heartRate: '', temp: '', weight: '', height: '' }
    });

    const patientRecords = selectedPatient ? medicalRecords.filter(r => r.patientId === selectedPatient.id).sort((a, b) => new Date(b.date) - new Date(a.date)) : [];

    const handleSaveRecord = () => {
      if (!recordForm.patientId || !recordForm.complaint) return;
      
      if (editingItem) {
        setMedicalRecords(medicalRecords.map(r => r.id === editingItem.id ? { ...recordForm, id: editingItem.id } : r));
      } else {
        const newRecord = { ...recordForm, id: Date.now(), patientId: parseInt(recordForm.patientId) };
        setMedicalRecords([...medicalRecords, newRecord]);
      }
      closeModal();
      setRecordForm({ patientId: selectedPatient?.id || '', date: new Date().toISOString().split('T')[0], type: 'Consulta', complaint: '', diagnosis: '', prescription: '', notes: '', vitals: { pressure: '', heartRate: '', temp: '', weight: '', height: '' } });
    };

    useEffect(() => {
      if (editingItem && modalType === 'record') {
        setRecordForm({ ...editingItem, patientId: editingItem.patientId.toString() });
      } else {
        setRecordForm({ patientId: selectedPatient?.id?.toString() || '', date: new Date().toISOString().split('T')[0], type: 'Consulta', complaint: '', diagnosis: '', prescription: '', notes: '', vitals: { pressure: '', heartRate: '', temp: '', weight: '', height: '' } });
      }
    }, [editingItem, modalType, selectedPatient]);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Prontuários</h1>
            <p className="text-slate-500 mt-1">Histórico médico dos pacientes</p>
          </div>
          {selectedPatient && <Button icon={Plus} onClick={() => openModal('record')}>Novo Registro</Button>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 p-4 h-fit">
            <h3 className="font-semibold text-slate-800 mb-4">Selecionar Paciente</h3>
            <Input icon={Search} placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="mb-4" />
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(patient => (
                <button key={patient.id} onClick={() => setSelectedPatient(patient)} className={`w-full p-3 rounded-xl text-left transition-all ${selectedPatient?.id === patient.id ? 'bg-teal-100 border-2 border-teal-500' : 'bg-slate-50 hover:bg-slate-100'}`}>
                  <p className="font-medium text-slate-800">{patient.name}</p>
                  <p className="text-sm text-slate-500">{calculateAge(patient.birthDate)} anos</p>
                </button>
              ))}
            </div>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            {selectedPatient ? (
              <>
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        {selectedPatient.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">{selectedPatient.name}</h2>
                        <p className="text-slate-500">{calculateAge(selectedPatient.birthDate)} anos • {selectedPatient.gender === 'M' ? 'Masculino' : 'Feminino'} • {selectedPatient.bloodType}</p>
                      </div>
                    </div>
                    <Button variant="secondary" icon={Edit} onClick={() => { openModal('patient', selectedPatient); }}>Editar</Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Telefone</p>
                      <p className="font-medium text-slate-800">{selectedPatient.phone}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">E-mail</p>
                      <p className="font-medium text-slate-800 text-sm">{selectedPatient.email}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Convênio</p>
                      <p className="font-medium text-slate-800">{selectedPatient.insurance || 'Particular'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Cadastro</p>
                      <p className="font-medium text-slate-800">{formatDate(selectedPatient.registeredAt)}</p>
                    </div>
                  </div>

                  {(selectedPatient.allergies && selectedPatient.allergies !== 'Nenhuma') && (
                    <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                      <div className="flex items-center gap-2 text-rose-700">
                        <AlertCircle size={18} />
                        <span className="font-semibold">Alergias:</span>
                        <span>{selectedPatient.allergies}</span>
                      </div>
                    </div>
                  )}

                  {selectedPatient.notes && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-sm text-amber-800"><strong>Observações:</strong> {selectedPatient.notes}</p>
                    </div>
                  )}
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Histórico de Atendimentos</h3>
                    <span className="text-sm text-slate-500">{patientRecords.length} registros</span>
                  </div>

                  {patientRecords.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                      <FileText size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Nenhum registro encontrado</p>
                      <Button className="mt-4" icon={Plus} onClick={() => openModal('record')}>Criar Primeiro Registro</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {patientRecords.map(record => (
                        <div key={record.id} className="border border-slate-200 rounded-xl overflow-hidden">
                          <div className="flex items-center justify-between p-4 bg-slate-50">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                                <ClipboardList className="text-teal-600" size={24} />
                              </div>
                              <div>
                                <p className="font-semibold text-slate-800">{record.type}</p>
                                <p className="text-sm text-slate-500">{formatDate(record.date)}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" icon={Edit} onClick={() => openModal('record', record)} />
                          </div>
                          
                          <div className="p-4 space-y-4">
                            {record.vitals && (
                              <div className="flex flex-wrap gap-3">
                                {record.vitals.pressure && (
                                  <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 rounded-lg">
                                    <Heart size={16} className="text-rose-500" />
                                    <span className="text-sm font-medium text-rose-700">{record.vitals.pressure} mmHg</span>
                                  </div>
                                )}
                                {record.vitals.heartRate && (
                                  <div className="flex items-center gap-2 px-3 py-2 bg-sky-50 rounded-lg">
                                    <Activity size={16} className="text-sky-500" />
                                    <span className="text-sm font-medium text-sky-700">{record.vitals.heartRate} bpm</span>
                                  </div>
                                )}
                                {record.vitals.temp && (
                                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg">
                                    <Thermometer size={16} className="text-amber-500" />
                                    <span className="text-sm font-medium text-amber-700">{record.vitals.temp}°C</span>
                                  </div>
                                )}
                                {record.vitals.weight && (
                                  <div className="flex items-center gap-2 px-3 py-2 bg-violet-50 rounded-lg">
                                    <Weight size={16} className="text-violet-500" />
                                    <span className="text-sm font-medium text-violet-700">{record.vitals.weight} kg</span>
                                  </div>
                                )}
                                {record.vitals.height && (
                                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg">
                                    <Ruler size={16} className="text-emerald-500" />
                                    <span className="text-sm font-medium text-emerald-700">{record.vitals.height} cm</span>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Queixa Principal</p>
                                <p className="text-slate-700">{record.complaint}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Diagnóstico</p>
                                <p className="text-slate-700">{record.diagnosis}</p>
                              </div>
                            </div>
                            
                            {record.prescription && (
                              <div className="p-3 bg-teal-50 rounded-xl">
                                <p className="text-xs font-semibold text-teal-600 uppercase mb-1">Prescrição</p>
                                <p className="text-teal-800">{record.prescription}</p>
                              </div>
                            )}
                            
                            {record.notes && (
                              <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Observações</p>
                                <p className="text-slate-600 text-sm">{record.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </>
            ) : (
              <Card className="p-12 text-center">
                <Users size={64} className="mx-auto mb-4 text-slate-300" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">Selecione um paciente</h3>
                <p className="text-slate-400">Escolha um paciente na lista ao lado para visualizar seu prontuário</p>
              </Card>
            )}
          </div>
        </div>

        <Modal isOpen={showModal && modalType === 'record'} onClose={closeModal} title={editingItem ? 'Editar Registro' : 'Novo Registro Médico'} size="lg">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Select label="Paciente *" value={recordForm.patientId} onChange={e => setRecordForm({...recordForm, patientId: e.target.value})} options={[{value: '', label: 'Selecione'}, ...patients.map(p => ({value: p.id.toString(), label: p.name}))]} />
              <Input label="Data" type="date" value={recordForm.date} onChange={e => setRecordForm({...recordForm, date: e.target.value})} />
              <Select label="Tipo" value={recordForm.type} onChange={e => setRecordForm({...recordForm, type: e.target.value})} options={[{value:'Consulta', label:'Consulta'},{value:'Retorno', label:'Retorno'},{value:'Exame', label:'Exame'},{value:'Procedimento', label:'Procedimento'},{value:'Pré-natal', label:'Pré-natal'},{value:'Emergência', label:'Emergência'}]} />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-semibold text-slate-700 mb-3">Sinais Vitais</h4>
              <div className="grid grid-cols-5 gap-3">
                <Input label="PA (mmHg)" placeholder="120/80" value={recordForm.vitals.pressure} onChange={e => setRecordForm({...recordForm, vitals: {...recordForm.vitals, pressure: e.target.value}})} />
                <Input label="FC (bpm)" type="number" placeholder="72" value={recordForm.vitals.heartRate} onChange={e => setRecordForm({...recordForm, vitals: {...recordForm.vitals, heartRate: e.target.value}})} />
                <Input label="Temp (°C)" placeholder="36.5" value={recordForm.vitals.temp} onChange={e => setRecordForm({...recordForm, vitals: {...recordForm.vitals, temp: e.target.value}})} />
                <Input label="Peso (kg)" placeholder="70" value={recordForm.vitals.weight} onChange={e => setRecordForm({...recordForm, vitals: {...recordForm.vitals, weight: e.target.value}})} />
                <Input label="Altura (cm)" placeholder="170" value={recordForm.vitals.height} onChange={e => setRecordForm({...recordForm, vitals: {...recordForm.vitals, height: e.target.value}})} />
              </div>
            </div>

            <Textarea label="Queixa Principal *" value={recordForm.complaint} onChange={e => setRecordForm({...recordForm, complaint: e.target.value})} rows={2} />
            <Textarea label="Diagnóstico" value={recordForm.diagnosis} onChange={e => setRecordForm({...recordForm, diagnosis: e.target.value})} rows={2} />
            <Textarea label="Prescrição" value={recordForm.prescription} onChange={e => setRecordForm({...recordForm, prescription: e.target.value})} rows={3} />
            <Textarea label="Observações" value={recordForm.notes} onChange={e => setRecordForm({...recordForm, notes: e.target.value})} rows={2} />
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button icon={Save} onClick={handleSaveRecord}>Salvar Registro</Button>
          </div>
        </Modal>
      </div>
    );
  };

  // ========== FINANCEIRO ==========
  const Financial = () => {
    const [transactionForm, setTransactionForm] = useState({
      type: 'income', patientId: '', description: '', category: '', amount: '', date: new Date().toISOString().split('T')[0], paymentMethod: '', status: 'pending'
    });
    const [filterType, setFilterType] = useState('all');

    const incomeCategories = ['Consulta', 'Retorno', 'Procedimento', 'Exame', 'Convênio', 'Outros'];
    const expenseCategories = ['Aluguel', 'Salários', 'Material', 'Equipamentos', 'Utilidades', 'Marketing', 'Impostos', 'Manutenção', 'Outros'];

    const filteredTransactions = transactions.filter(t => filterType === 'all' || t.type === filterType).sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const pendingAmount = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0);

    const handleSaveTransaction = () => {
      if (!transactionForm.description || !transactionForm.amount || !transactionForm.category) return;
      
      const patient = transactionForm.patientId ? patients.find(p => p.id === parseInt(transactionForm.patientId)) : null;
      
      if (editingItem) {
        setTransactions(transactions.map(t => t.id === editingItem.id ? { ...transactionForm, id: editingItem.id, amount: parseFloat(transactionForm.amount), patientId: transactionForm.patientId ? parseInt(transactionForm.patientId) : null, patientName: patient?.name || '' } : t));
      } else {
        const newTransaction = { ...transactionForm, id: Date.now(), amount: parseFloat(transactionForm.amount), patientId: transactionForm.patientId ? parseInt(transactionForm.patientId) : null, patientName: patient?.name || '' };
        setTransactions([...transactions, newTransaction]);
      }
      closeModal();
      setTransactionForm({ type: 'income', patientId: '', description: '', category: '', amount: '', date: new Date().toISOString().split('T')[0], paymentMethod: '', status: 'pending' });
    };

    const handleDeleteTransaction = (id) => {
      if (confirm('Deseja realmente excluir esta transação?')) {
        setTransactions(transactions.filter(t => t.id !== id));
      }
    };

    const updateTransactionStatus = (id, status) => {
      setTransactions(transactions.map(t => t.id === id ? { ...t, status } : t));
    };

    useEffect(() => {
      if (editingItem && modalType === 'transaction') {
        setTransactionForm({ ...editingItem, amount: editingItem.amount.toString(), patientId: editingItem.patientId?.toString() || '' });
      } else {
        setTransactionForm({ type: 'income', patientId: '', description: '', category: '', amount: '', date: new Date().toISOString().split('T')[0], paymentMethod: '', status: 'pending' });
      }
    }, [editingItem, modalType]);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Financeiro</h1>
            <p className="text-slate-500 mt-1">Controle de receitas e despesas</p>
          </div>
          <Button icon={Plus} onClick={() => openModal('transaction')}>Nova Transação</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Receitas" value={formatCurrency(totalIncome)} icon={TrendingUp} color="emerald" />
          <StatCard title="Despesas" value={formatCurrency(totalExpense)} icon={TrendingUp} color="rose" />
          <StatCard title="Saldo" value={formatCurrency(totalIncome - totalExpense)} icon={DollarSign} color={totalIncome - totalExpense >= 0 ? 'teal' : 'rose'} />
        </div>

        <Card className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <Button variant={filterType === 'all' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType('all')}>Todos</Button>
              <Button variant={filterType === 'income' ? 'success' : 'secondary'} size="sm" onClick={() => setFilterType('income')}>Receitas</Button>
              <Button variant={filterType === 'expense' ? 'danger' : 'secondary'} size="sm" onClick={() => setFilterType('expense')}>Despesas</Button>
            </div>
            <div className="flex-1" />
            <Button variant="secondary" size="sm" icon={Download}>Exportar</Button>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-600">Data</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Descrição</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Categoria</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Pagamento</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Status</th>
                  <th className="text-right p-4 font-semibold text-slate-600">Valor</th>
                  <th className="text-center p-4 font-semibold text-slate-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(t => (
                  <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-600">{formatDate(t.date)}</td>
                    <td className="p-4">
                      <p className="font-medium text-slate-800">{t.description}</p>
                      {t.patientName && <p className="text-sm text-slate-500">{t.patientName}</p>}
                    </td>
                    <td className="p-4"><Badge variant={t.type === 'income' ? 'success' : 'danger'}>{t.category}</Badge></td>
                    <td className="p-4 text-slate-600">{t.paymentMethod}</td>
                    <td className="p-4">{getStatusBadge(t.status)}</td>
                    <td className={`p-4 text-right font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        {t.status === 'pending' && (
                          <Button variant="ghost" size="sm" icon={Check} onClick={() => updateTransactionStatus(t.id, 'paid')} className="text-emerald-600" />
                        )}
                        <Button variant="ghost" size="sm" icon={Edit} onClick={() => openModal('transaction', t)} />
                        <Button variant="ghost" size="sm" icon={Trash2} onClick={() => handleDeleteTransaction(t.id)} className="text-rose-500" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Modal isOpen={showModal && modalType === 'transaction'} onClose={closeModal} title={editingItem ? 'Editar Transação' : 'Nova Transação'}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant={transactionForm.type === 'income' ? 'success' : 'secondary'} onClick={() => setTransactionForm({...transactionForm, type: 'income', category: ''})} className="justify-center py-4">
                <TrendingUp size={20} /> Receita
              </Button>
              <Button variant={transactionForm.type === 'expense' ? 'danger' : 'secondary'} onClick={() => setTransactionForm({...transactionForm, type: 'expense', category: ''})} className="justify-center py-4">
                <TrendingUp size={20} className="rotate-180" /> Despesa
              </Button>
            </div>
            
            {transactionForm.type === 'income' && (
              <Select label="Paciente (opcional)" value={transactionForm.patientId} onChange={e => setTransactionForm({...transactionForm, patientId: e.target.value})} options={[{value: '', label: 'Selecione'}, ...patients.map(p => ({value: p.id.toString(), label: p.name}))]} />
            )}
            
            <Input label="Descrição *" value={transactionForm.description} onChange={e => setTransactionForm({...transactionForm, description: e.target.value})} />
            
            <div className="grid grid-cols-2 gap-4">
              <Select label="Categoria *" value={transactionForm.category} onChange={e => setTransactionForm({...transactionForm, category: e.target.value})} options={[{value: '', label: 'Selecione'}, ...(transactionForm.type === 'income' ? incomeCategories : expenseCategories).map(c => ({value: c, label: c}))]} />
              <Input label="Valor (R$) *" type="number" value={transactionForm.amount} onChange={e => setTransactionForm({...transactionForm, amount: e.target.value})} placeholder="0,00" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input label="Data" type="date" value={transactionForm.date} onChange={e => setTransactionForm({...transactionForm, date: e.target.value})} />
              <Select label="Forma de Pagamento" value={transactionForm.paymentMethod} onChange={e => setTransactionForm({...transactionForm, paymentMethod: e.target.value})} options={[{value:'', label:'Selecione'},{value:'PIX', label:'PIX'},{value:'Dinheiro', label:'Dinheiro'},{value:'Cartão Crédito', label:'Cartão de Crédito'},{value:'Cartão Débito', label:'Cartão de Débito'},{value:'Boleto', label:'Boleto'},{value:'Convênio', label:'Convênio'},{value:'Transferência', label:'Transferência'},{value:'Débito Automático', label:'Débito Automático'}]} />
            </div>
            
            <Select label="Status" value={transactionForm.status} onChange={e => setTransactionForm({...transactionForm, status: e.target.value})} options={[{value:'pending', label:'Pendente'},{value:'paid', label:'Pago'},{value:'cancelled', label:'Cancelado'}]} />
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button icon={Save} onClick={handleSaveTransaction}>Salvar</Button>
          </div>
        </Modal>
      </div>
    );
  };

  // ========== RELATÓRIOS ==========
  const Reports = () => {
    const [reportPeriod, setReportPeriod] = useState('month');

    const totalPatients = patients.length;
    const totalAppointments = appointments.length;
    const completedAppointments = appointments.filter(a => a.status === 'completed').length;
    const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length;
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    const incomeByCategory = transactions.filter(t => t.type === 'income').reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const expenseByCategory = transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const appointmentsByType = appointments.reduce((acc, a) => {
      acc[a.type] = (acc[a.type] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Relatórios</h1>
            <p className="text-slate-500 mt-1">Análise de desempenho do consultório</p>
          </div>
          <div className="flex gap-2">
            <Select value={reportPeriod} onChange={e => setReportPeriod(e.target.value)} options={[{value:'week', label:'Última Semana'},{value:'month', label:'Último Mês'},{value:'quarter', label:'Último Trimestre'},{value:'year', label:'Último Ano'}]} />
            <Button variant="secondary" icon={Printer}>Imprimir</Button>
            <Button icon={Download}>Exportar PDF</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total de Pacientes" value={totalPatients} icon={Users} color="teal" />
          <StatCard title="Consultas Realizadas" value={completedAppointments} subtitle={`de ${totalAppointments} agendadas`} icon={Calendar} color="sky" />
          <StatCard title="Taxa de Comparecimento" value={`${totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0}%`} icon={CheckCircle} color="emerald" />
          <StatCard title="Ticket Médio" value={formatCurrency(completedAppointments > 0 ? totalIncome / completedAppointments : 0)} icon={DollarSign} color="violet" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Receitas por Categoria</h3>
            <div className="space-y-4">
              {Object.entries(incomeByCategory).sort((a, b) => b[1] - a[1]).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">{category}</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(amount)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(amount / totalIncome) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between">
              <span className="font-semibold text-slate-700">Total</span>
              <span className="font-bold text-emerald-600 text-lg">{formatCurrency(totalIncome)}</span>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Despesas por Categoria</h3>
            <div className="space-y-4">
              {Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1]).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">{category}</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(amount)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(amount / totalExpense) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between">
              <span className="font-semibold text-slate-700">Total</span>
              <span className="font-bold text-rose-600 text-lg">{formatCurrency(totalExpense)}</span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Consultas por Tipo</h3>
            <div className="space-y-3">
              {Object.entries(appointmentsByType).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-700">{type}</span>
                  <Badge variant="primary">{count}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Status das Consultas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500" />
                  <span className="text-slate-600">Realizadas</span>
                </div>
                <span className="font-semibold text-slate-800">{completedAppointments}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-amber-500" />
                  <span className="text-slate-600">Pendentes</span>
                </div>
                <span className="font-semibold text-slate-800">{appointments.filter(a => a.status === 'pending').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-sky-500" />
                  <span className="text-slate-600">Confirmadas</span>
                </div>
                <span className="font-semibold text-slate-800">{appointments.filter(a => a.status === 'confirmed').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-rose-500" />
                  <span className="text-slate-600">Canceladas</span>
                </div>
                <span className="font-semibold text-slate-800">{cancelledAppointments}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Resumo Financeiro</h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl">
                <p className="text-sm text-emerald-600 font-medium mb-1">Receita Total</p>
                <p className="text-2xl font-bold text-emerald-700">{formatCurrency(totalIncome)}</p>
              </div>
              <div className="p-4 bg-rose-50 rounded-xl">
                <p className="text-sm text-rose-600 font-medium mb-1">Despesa Total</p>
                <p className="text-2xl font-bold text-rose-700">{formatCurrency(totalExpense)}</p>
              </div>
              <div className={`p-4 rounded-xl ${totalIncome - totalExpense >= 0 ? 'bg-teal-50' : 'bg-rose-50'}`}>
                <p className={`text-sm font-medium mb-1 ${totalIncome - totalExpense >= 0 ? 'text-teal-600' : 'text-rose-600'}`}>Lucro Líquido</p>
                <p className={`text-2xl font-bold ${totalIncome - totalExpense >= 0 ? 'text-teal-700' : 'text-rose-700'}`}>{formatCurrency(totalIncome - totalExpense)}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  // ========== RENDERIZAÇÃO PRINCIPAL ==========
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'patients': return <Patients />;
      case 'appointments': return <Appointments />;
      case 'records': return <MedicalRecords />;
      case 'financial': return <Financial />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Stethoscope className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg">MediClinic</h1>
              <p className="text-xs text-slate-500">Sistema de Gestão</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30' : 'text-slate-600 hover:bg-slate-100'}`}>
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <User className="text-teal-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Dr. Carlos Silva</p>
                <p className="text-xs text-slate-500">CRM 12345-SP</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors">
              <Settings size={16} /> Configurações
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>

      {/* Estilos de Animação */}
      <style>{`
        @keyframes zoom-in-95 {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in { animation: zoom-in-95 0.2s ease-out; }
      `}</style>
    </div>
  );
}
