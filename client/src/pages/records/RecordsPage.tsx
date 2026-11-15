import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { PersonalRecord } from '../../types';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Download, 
  Upload, 
  Tag, 
  Briefcase, 
  Heart, 
  FileText,
  DollarSign,
  Smile,
  Calendar
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { triggerConfetti } from '../../components/ui/Confetti';

export const RecordsPage: React.FC = () => {
  const { records, addRecord, updateRecord, deleteRecord, user } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'project' | 'daily_log' | 'custom'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'project' | 'daily_log' | 'custom'>('daily_log');
  const [category, setCategory] = useState('General');
  const [recordDate, setRecordDate] = useState(new Date().toISOString().split('T')[0]);
  const [tagInput, setTagInput] = useState('');
  const [journalNotes, setJournalNotes] = useState('');
  const [mood, setMood] = useState<'Great' | 'Good' | 'Neutral' | 'Tired' | 'Stressed'>('Great');
  const [sleepHours, setSleepHours] = useState(7.5);
  const [waterLiters, setWaterLiters] = useState(2.5);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(50);
  const [hoursSpent, setHoursSpent] = useState(5);

  const filteredRecords = records.filter(r => {
    if (activeTab !== 'all' && r.type !== activeTab) return false;
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase()) && !r.details.journalNotes?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingRecordId(null);
    setTitle('');
    setType('daily_log');
    setCategory('General');
    setRecordDate(new Date().toISOString().split('T')[0]);
    setTagInput('');
    setJournalNotes('');
    setMood('Great');
    setSleepHours(7.5);
    setWaterLiters(2.5);
    setExpenseAmount(0);
    setProgressPercentage(50);
    setHoursSpent(5);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rec: PersonalRecord) => {
    setEditingRecordId(rec.id);
    setTitle(rec.title);
    setType(rec.type);
    setCategory(rec.category);
    setRecordDate(rec.recordDate);
    setTagInput(rec.tags.join(', '));
    setJournalNotes(rec.details.journalNotes || '');
    setMood(rec.details.mood || 'Great');
    setSleepHours(rec.details.sleepHours || 7.5);
    setWaterLiters(rec.details.waterLiters || 2.5);
    setExpenseAmount(rec.details.expenseAmount || 0);
    setProgressPercentage(rec.details.progressPercentage || 50);
    setHoursSpent(rec.details.hoursSpent || 5);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagInput.split(',').map(s => s.trim()).filter(Boolean);

    const recordPayload = {
      userId: user.id,
      title: title.trim(),
      type,
      category,
      recordDate,
      tags,
      details: {
        journalNotes: journalNotes.trim(),
        mood: type === 'daily_log' ? mood : undefined,
        sleepHours: type === 'daily_log' ? Number(sleepHours) : undefined,
        waterLiters: type === 'daily_log' ? Number(waterLiters) : undefined,
        expenseAmount: type === 'daily_log' ? Number(expenseAmount) : undefined,
        progressPercentage: type === 'project' ? Number(progressPercentage) : undefined,
        hoursSpent: type === 'project' ? Number(hoursSpent) : undefined,
      }
    };

    if (editingRecordId) {
      updateRecord(editingRecordId, recordPayload);
    } else {
      addRecord(recordPayload);
      triggerConfetti();
    }

    setIsModalOpen(false);
  };

  // Export to CSV
  const handleExportCSV = () => {
    let csv = "ID,Type,Title,Category,Date,Tags,Notes,Mood,Sleep,Water,Expense,Progress,Hours\n";
    records.forEach(r => {
      csv += `"${r.id}","${r.type}","${r.title.replace(/"/g, '""')}","${r.category}","${r.recordDate}","${r.tags.join(';')}","${(r.details.journalNotes || '').replace(/"/g, '""')}","${r.details.mood || ''}","${r.details.sleepHours || ''}","${r.details.waterLiters || ''}","${r.details.expenseAmount || ''}","${r.details.progressPercentage || ''}","${r.details.hoursSpent || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `timewise-records-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Personal Record Hub & Logbook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Records & Life Journal</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Central repository for academic notes, capstone project processing, daily wellness logs, and expenses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold glass border border-white/10 text-slate-200 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-glow-violet transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>New Record</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Tab filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl glass border border-white/10 text-xs">
          {[
            { id: 'all', label: 'All Records' },
            { id: 'project', label: 'Projects & Processing' },
            { id: 'daily_log', label: 'Daily Life Logs' },
            { id: 'custom', label: 'Custom Notes' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === t.id
                  ? 'bg-brand-600 text-white shadow-glow-violet font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search records, tags, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl glass-input"
          />
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((rec) => {
          const isProject = rec.type === 'project';
          const isDailyLog = rec.type === 'daily_log';

          return (
            <div
              key={rec.id}
              className="p-5 rounded-2xl glass-card border border-white/10 glass-card-hover flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    isProject ? 'bg-indigo-500/20 text-indigo-300' :
                    isDailyLog ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700/50 text-slate-300'
                  }`}>
                    {rec.type.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{rec.recordDate}</span>
                </div>

                <h3 className="text-base font-bold text-white line-clamp-1">{rec.title}</h3>

                {/* Specific metrics if project */}
                {isProject && (
                  <div className="mt-3 space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Progress</span>
                      <span className="font-bold text-brand-300">{rec.details.progressPercentage || 0}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-500 h-full rounded-full" 
                        style={{ width: `${rec.details.progressPercentage || 0}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Logged Hours: <span className="text-white font-mono">{rec.details.hoursSpent || 0} hrs</span>
                    </div>
                  </div>
                )}

                {/* Specific metrics if daily log */}
                {isDailyLog && (
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-dark-900 border border-white/5">
                      <div className="text-[10px] text-slate-400">Mood</div>
                      <div className="font-bold text-amber-300">{rec.details.mood || 'Great'}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-900 border border-white/5">
                      <div className="text-[10px] text-slate-400">Sleep</div>
                      <div className="font-bold text-indigo-300">{rec.details.sleepHours || 7}h</div>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-900 border border-white/5">
                      <div className="text-[10px] text-slate-400">Water</div>
                      <div className="font-bold text-cyan-300">{rec.details.waterLiters || 2}L</div>
                    </div>
                  </div>
                )}

                {rec.details.journalNotes && (
                  <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed font-light">
                    {rec.details.journalNotes}
                  </p>
                )}

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {rec.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">{rec.category}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(rec)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                    title="Edit record"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteRecord(rec.id)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Record Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRecordId ? 'Edit Record' : 'Create Life / Project Record'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Record Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Systems Final Milestone Review"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Record Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-dark-900"
              >
                <option value="daily_log">Daily Life Log (Mood, Sleep, Health)</option>
                <option value="project">Project Progress & Milestone</option>
                <option value="custom">General Personal Note</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          {/* Conditional fields based on type */}
          {type === 'daily_log' && (
            <div className="grid grid-cols-4 gap-3 p-3 rounded-xl bg-dark-900 border border-white/5">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Mood</label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value as any)}
                  className="w-full p-1.5 rounded glass-input text-xs bg-dark-850"
                >
                  <option value="Great">Great 🌟</option>
                  <option value="Good">Good 😊</option>
                  <option value="Neutral">Neutral 😐</option>
                  <option value="Tired">Tired 😴</option>
                  <option value="Stressed">Stressed ⚡</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Sleep (hrs)</label>
                <input
                  type="number"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                  className="w-full p-1.5 rounded glass-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Water (L)</label>
                <input
                  type="number"
                  step="0.2"
                  value={waterLiters}
                  onChange={(e) => setWaterLiters(Number(e.target.value))}
                  className="w-full p-1.5 rounded glass-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Expense ($)</label>
                <input
                  type="number"
                  step="1"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(Number(e.target.value))}
                  className="w-full p-1.5 rounded glass-input text-xs"
                />
              </div>
            </div>
          )}

          {type === 'project' && (
            <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-dark-900 border border-white/5">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={progressPercentage}
                  onChange={(e) => setProgressPercentage(Number(e.target.value))}
                  className="w-full p-2 rounded-xl glass-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Hours Spent</label>
                <input
                  type="number"
                  step="0.5"
                  value={hoursSpent}
                  onChange={(e) => setHoursSpent(Number(e.target.value))}
                  className="w-full p-2 rounded-xl glass-input text-xs"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Notes & Reflections
            </label>
            <textarea
              rows={4}
              placeholder="Write detailed notes, learnings, milestone processing details..."
              value={journalNotes}
              onChange={(e) => setJournalNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              placeholder="React, Distributed, Reflection, Lab"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-glow-violet transition-all"
            >
              {editingRecordId ? 'Save Changes' : 'Save Record'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

