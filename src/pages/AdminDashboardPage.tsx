import React, { useState, useEffect } from 'react';
import { api, useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  DashboardStats,
  Phrase,
  TranslationRequestItem,
  TranslationReportItem,
  User,
  LANGUAGES
} from '../types';
import {
  Users,
  Languages,
  Clock,
  AlertTriangle,
  Sparkles,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Shield,
  Filter,
  Check,
  X,
  FileText
} from 'lucide-react';

interface AdminDashboardPageProps {
  navigate: (page: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigate }) => {
  const { isAdmin } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'phrases' | 'requests' | 'reports' | 'users'>('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [requests, setRequests] = useState<TranslationRequestItem[]>([]);
  const [reports, setReports] = useState<TranslationReportItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Phrase Search & Filter in Admin
  const [phraseSearch, setPhraseSearch] = useState('');
  const [phraseCategory, setPhraseCategory] = useState('all');

  // Add / Edit Phrase Modal
  const [phraseModalOpen, setPhraseModalOpen] = useState(false);
  const [editingPhrase, setEditingPhrase] = useState<Phrase | null>(null);
  const [formData, setFormData] = useState({
    sourceText: '',
    category: 'Daily conversation',
    english: '',
    urdu: '',
    shina: '',
    balti: '',
    burushaski: '',
    shinaPron: '',
    baltiPron: '',
    burushaskiPron: '',
    pronunciationText: '',
    verified: true,
  });

  const loadAll = async () => {
    setLoading(true);
    try {
      const [statsRes, phrasesRes, requestsRes, reportsRes, usersRes] = await Promise.all([
        api.get('/api/admin/dashboard'),
        api.get('/api/admin/phrases'),
        api.get('/api/translation-requests'),
        api.get('/api/admin/reports'),
        api.get('/api/admin/users'),
      ]);

      setStats(statsRes.data?.stats);
      setPhrases(phrasesRes.data?.phrases || []);
      setRequests(requestsRes.data?.requests || []);
      setReports(reportsRes.data?.reports || []);
      setUsers(usersRes.data?.users || []);
    } catch (err) {
      console.error('Error loading admin portal:', err);
      showToast('Failed to load admin management data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAll();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="py-24 text-center px-4">
        <Shield className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Privileges Required</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
          You must be logged in as an administrator to view this portal.
        </p>
        <button
          onClick={() => navigate('login')}
          className="px-5 py-2.5 bg-[#0F4C81] text-white rounded-xl text-xs font-semibold"
        >
          Sign in as Admin
        </button>
      </div>
    );
  }

  // Handle Phrase Add / Update
  const openNewPhraseModal = () => {
    setEditingPhrase(null);
    setFormData({
      sourceText: '',
      category: 'Daily conversation',
      english: '',
      urdu: '',
      shina: '',
      balti: '',
      burushaski: '',
      shinaPron: '',
      baltiPron: '',
      burushaskiPron: '',
      pronunciationText: '',
      verified: true,
    });
    setPhraseModalOpen(true);
  };

  const openEditPhraseModal = (phrase: Phrase) => {
    setEditingPhrase(phrase);
    setFormData({
      sourceText: phrase.sourceText,
      category: phrase.category,
      english: phrase.translations.english,
      urdu: phrase.translations.urdu,
      shina: phrase.translations.shina,
      balti: phrase.translations.balti,
      burushaski: phrase.translations.burushaski,
      shinaPron: phrase.pronunciations?.shina || '',
      baltiPron: phrase.pronunciations?.balti || '',
      burushaskiPron: phrase.pronunciations?.burushaski || '',
      pronunciationText: phrase.pronunciationText || '',
      verified: phrase.verified,
    });
    setPhraseModalOpen(true);
  };

  const handleSavePhrase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sourceText.trim() || !formData.urdu.trim() || !formData.shina.trim() || !formData.balti.trim() || !formData.burushaski.trim()) {
      showToast('Please provide all 5 language translations.', 'error');
      return;
    }

    try {
      const payload = {
        sourceText: formData.sourceText.trim(),
        category: formData.category,
        translations: {
          english: formData.english.trim() || formData.sourceText.trim(),
          urdu: formData.urdu.trim(),
          shina: formData.shina.trim(),
          balti: formData.balti.trim(),
          burushaski: formData.burushaski.trim(),
        },
        pronunciations: {
          shina: formData.shinaPron.trim(),
          balti: formData.baltiPron.trim(),
          burushaski: formData.burushaskiPron.trim(),
        },
        pronunciationText: formData.pronunciationText.trim(),
        verified: formData.verified,
      };

      if (editingPhrase) {
        const id = editingPhrase._id || editingPhrase.id;
        await api.put(`/api/phrases/${id}`, payload);
        showToast('Phrase updated successfully!', 'success');
      } else {
        await api.post('/api/phrases', payload);
        showToast('New phrase added to dictionary!', 'success');
      }

      setPhraseModalOpen(false);
      loadAll();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to save phrase.', 'error');
    }
  };

  const handleDeletePhrase = async (id: string) => {
    if (!window.confirm('Delete this phrase from the database?')) return;
    try {
      await api.delete(`/api/phrases/${id}`);
      showToast('Phrase removed.', 'info');
      setPhrases((prev) => prev.filter((p) => p._id !== id && p.id !== id));
    } catch (e) {
      showToast('Failed to delete phrase.', 'error');
    }
  };

  // Handle Request Status
  const handleUpdateRequestStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await api.put(`/api/translation-requests/${id}`, { status });
      showToast(`Request marked as ${status}.`, 'success');
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch (e) {
      showToast('Failed to update request.', 'error');
    }
  };

  // Handle Report Status
  const handleUpdateReportStatus = async (id: string, status: 'reviewed' | 'resolved') => {
    try {
      await api.put(`/api/reports/${id}`, { status });
      showToast(`Report updated to ${status}.`, 'success');
      setReports((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch (e) {
      showToast('Failed to update report.', 'error');
    }
  };

  // Handle User Role
  const handleToggleUserRole = async (userObj: User) => {
    const newRole = userObj.role === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Change ${userObj.name}'s role to ${newRole}?`)) return;

    try {
      const id = userObj._id || userObj.id;
      await api.put(`/api/admin/users/${id}/role`, { role: newRole });
      showToast(`User role updated to ${newRole}.`, 'success');
      setUsers((prev) =>
        prev.map((u) => ((u._id || u.id) === id ? { ...u, role: newRole } : u))
      );
    } catch (e) {
      showToast('Failed to change user role.', 'error');
    }
  };

  // Filtered Phrases
  const filteredPhrases = phrases.filter((p) => {
    const matchCat = phraseCategory === 'all' || p.category.toLowerCase() === phraseCategory.toLowerCase();
    const matchQ =
      !phraseSearch.trim() ||
      p.sourceText.toLowerCase().includes(phraseSearch.toLowerCase()) ||
      p.translations.urdu.toLowerCase().includes(phraseSearch.toLowerCase()) ||
      p.translations.shina.toLowerCase().includes(phraseSearch.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>Administrative Console</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Gilgit Bridge Management
            </h1>
          </div>

          <button
            onClick={openNewPhraseModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0F4C81] text-white rounded-xl text-xs font-semibold hover:bg-[#0c3e6a] shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Phrase</span>
          </button>
        </div>

        {/* Tab Navigation Controls (Interactive Filter Segmented Tab Buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview Metrics', count: null },
            { id: 'phrases', label: 'Dictionary Phrases', count: phrases.length },
            { id: 'requests', label: 'Translation Requests', count: requests.filter((r) => r.status === 'pending').length },
            { id: 'reports', label: 'Dialect Reports', count: reports.filter((r) => r.status === 'pending').length },
            { id: 'users', label: 'User Accounts', count: users.length },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  active
                    ? 'bg-[#0F4C81] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8 animate-fade-in">
            {/* 5 Primary Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-medium block mb-1">Total Users</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
                  {stats.totalUsers}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">Verified accounts</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-medium block mb-1">Dictionary Phrases</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0F4C81] dark:text-sky-400">
                  {stats.totalPhrases}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">100% verified entries</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-medium block mb-1">Translations Run</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0E9F8D]">
                  {stats.totalTranslations}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">Cross-language lookups</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-medium block mb-1">Pending Requests</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-500">
                  {stats.pendingRequests}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">Missing phrase submissions</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-medium block mb-1">Incorrect Reports</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-rose-500">
                  {stats.pendingReports}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">Dialect review queue</span>
              </div>
            </div>

            {/* Language & Category Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  Phrases by Category Breakdown
                </h3>
                <div className="space-y-2 text-xs">
                  {Object.entries(stats.categoryDistribution).map(([cat, count]) => (
                    <div key={cat} className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800 last:border-none">
                      <span className="text-slate-600 dark:text-slate-400">{cat}</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  Recent Activity Stream
                </h3>
                <div className="space-y-3 text-xs">
                  {stats.recentActivity.slice(0, 6).map((act) => (
                    <div key={act._id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">{act.sourceText}</span>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {act.sourceLanguage} → {act.targetLanguage}: {act.translatedText}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DICTIONARY PHRASES */}
        {activeTab === 'phrases' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={phraseSearch}
                  onChange={(e) => setPhraseSearch(e.target.value)}
                  placeholder="Filter dictionary phrases..."
                  className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <select
                  value={phraseCategory}
                  onChange={(e) => setPhraseCategory(e.target.value)}
                  className="text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="Greetings">Greetings</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Education">Education</option>
                  <option value="Family">Family</option>
                  <option value="Daily conversation">Daily conversation</option>
                  <option value="Tourist communication">Tourist communication</option>
                </select>

                <span className="text-xs text-slate-500 font-mono">
                  {filteredPhrases.length} phrases
                </span>
              </div>
            </div>

            {/* Phrases Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">English Phrase</th>
                    <th className="py-3 px-3">Urdu</th>
                    <th className="py-3 px-3">Shina</th>
                    <th className="py-3 px-3">Balti</th>
                    <th className="py-3 px-3">Burushaski</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredPhrases.slice(0, 50).map((p) => {
                    const id = p._id || p.id || '';
                    return (
                      <tr key={id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                          {p.sourceText}
                        </td>
                        <td className="py-3 px-3 font-urdu text-slate-700 dark:text-slate-300">
                          {p.translations.urdu}
                        </td>
                        <td className="py-3 px-3 font-urdu text-[#0F4C81] dark:text-sky-400">
                          {p.translations.shina}
                        </td>
                        <td className="py-3 px-3 font-urdu text-[#0E9F8D]">
                          {p.translations.balti}
                        </td>
                        <td className="py-3 px-3 font-urdu text-amber-600 dark:text-amber-400">
                          {p.translations.burushaski}
                        </td>
                        <td className="py-3 px-3 text-slate-500">
                          {p.category}
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => openEditPhraseModal(p)}
                            className="p-1 text-slate-500 hover:text-[#0F4C81] dark:hover:text-sky-400 mr-1"
                            title="Edit Phrase"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePhrase(id)}
                            className="p-1 text-slate-400 hover:text-rose-500"
                            title="Delete Phrase"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TRANSLATION REQUESTS */}
        {activeTab === 'requests' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              User-Submitted Translation Requests
            </h2>
            <p className="text-xs text-slate-500">
              Phrases requested by users when exact dictionary matches were missing.
            </p>

            {requests.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">No phrase requests pending.</div>
            ) : (
              <div className="space-y-3">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          "{req.requestedText}"
                        </span>
                        <span className="font-semibold text-[#0F4C81] dark:text-sky-400 uppercase text-[11px]">
                          ({req.sourceLanguage} → {req.targetLanguage})
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                        <span>Requested by: {req.user || 'Guest'}</span>
                        {req.userEmail && <span>({req.userEmail})</span>}
                        <span>·</span>
                        <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                        <span>·</span>
                        <span className={`font-semibold capitalize ${
                          req.status === 'approved' ? 'text-emerald-500' : req.status === 'rejected' ? 'text-rose-500' : 'text-amber-500'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {req.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateRequestStatus(req._id, 'approved')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleUpdateRequestStatus(req._id, 'rejected')}
                            className="flex items-center gap-1 px-3 py-1.5 border border-rose-300 dark:border-rose-800 text-rose-600 rounded-lg hover:bg-rose-50 font-semibold"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: INCORRECT REPORTS */}
        {activeTab === 'reports' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Reported Incorrect Translations
            </h2>
            <p className="text-xs text-slate-500">
              Community submissions flagging pronunciation accents or regional dialect discrepancies.
            </p>

            {reports.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">No active dialect reports.</div>
            ) : (
              <div className="space-y-3">
                {reports.map((rep) => (
                  <div
                    key={rep._id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {rep.originalPhrase}
                        </span>
                        <span className="text-slate-400">→</span>
                        <span className="font-semibold text-[#0F4C81] dark:text-sky-400">
                          {rep.currentTranslation}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 mt-1">
                        <strong className="text-amber-600">Issue:</strong> {rep.issueDescription}
                      </p>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] mt-2">
                        <span>Reported by: {rep.user}</span>
                        <span>·</span>
                        <span className={`font-semibold capitalize ${rep.status === 'resolved' ? 'text-emerald-500' : 'text-amber-500'}`}>
                          Status: {rep.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {rep.status !== 'resolved' && (
                        <button
                          onClick={() => handleUpdateReportStatus(rep._id, 'resolved')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Resolved</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: USERS MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Registered Accounts ({users.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase text-[10px]">
                    <th className="py-3 px-3">Name</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">City</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {users.map((u) => {
                    const id = u._id || u.id;
                    return (
                      <tr key={id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                          {u.name}
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                          {u.email}
                        </td>
                        <td className="py-3 px-3 text-slate-500">
                          {u.city || 'Gilgit'}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            u.role === 'admin'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleToggleUserRole(u)}
                            className="px-2 py-1 text-[11px] font-semibold rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            Toggle Role
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PHRASE */}
        {phraseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingPhrase ? 'Edit Phrase Entry' : 'Add Verified Phrase to Dictionary'}
                </h3>
                <button
                  onClick={() => setPhraseModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePhrase} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      English Source Phrase *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sourceText}
                      onChange={(e) => setFormData({ ...formData, sourceText: e.target.value })}
                      placeholder="e.g. Where is the bus stop?"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    >
                      <option value="Greetings">Greetings</option>
                      <option value="Travel">Travel</option>
                      <option value="Food">Food</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Education">Education</option>
                      <option value="Family">Family</option>
                      <option value="Daily conversation">Daily conversation</option>
                      <option value="Tourist communication">Tourist communication</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Urdu Translation (اردو) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.urdu}
                    onChange={(e) => setFormData({ ...formData, urdu: e.target.value })}
                    placeholder="اردو ترجمہ"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-urdu text-base text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Shina Translation (شینا) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shina}
                    onChange={(e) => setFormData({ ...formData, shina: e.target.value })}
                    placeholder="شینا ترجمہ (e.g. بس اڈا کونے ہن؟)"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-urdu text-base text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Balti Translation (بلتی) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.balti}
                    onChange={(e) => setFormData({ ...formData, balti: e.target.value })}
                    placeholder="بلتی ترجمہ (e.g. بس اڈا گانے یود؟)"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-urdu text-base text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Burushaski Translation (بروشسکی) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.burushaski}
                    onChange={(e) => setFormData({ ...formData, burushaski: e.target.value })}
                    placeholder="بروشسکی ترجمہ (e.g. بس اڈا امے بی؟)"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-urdu text-base text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Shina Pronunciation
                    </label>
                    <input
                      type="text"
                      value={formData.shinaPron}
                      onChange={(e) => setFormData({ ...formData, shinaPron: e.target.value })}
                      placeholder="Bus adda konay han?"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-[11px] text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Balti Pronunciation
                    </label>
                    <input
                      type="text"
                      value={formData.baltiPron}
                      onChange={(e) => setFormData({ ...formData, baltiPron: e.target.value })}
                      placeholder="Bus adda ganey yod?"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-[11px] text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Burushaski Pronunciation
                    </label>
                    <input
                      type="text"
                      value={formData.burushaskiPron}
                      onChange={(e) => setFormData({ ...formData, burushaskiPron: e.target.value })}
                      placeholder="Bus adda amine bi?"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-[11px] text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setPhraseModalOpen(false)}
                    className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-white bg-[#0F4C81] hover:bg-[#0c3e6a] rounded-xl"
                  >
                    Save Phrase
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
