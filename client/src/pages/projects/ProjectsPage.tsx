import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Briefcase, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Trash2, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { triggerConfetti } from '../../components/ui/Confetti';

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  category: string;
  progress: number;
  status: 'in_progress' | 'completed' | 'on_hold';
  deadline: string;
  hoursSpent: number;
  milestones: string[];
}

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: 'prj-1',
      name: 'Raft Consensus Protocol & Fault-Tolerant KV Store',
      description: 'Distributed systems capstone: leader election, log replication, snapshotting in Go.',
      category: 'Academic / CS Capstone',
      progress: 75,
      status: 'in_progress',
      deadline: '2026-12-15',
      hoursSpent: 28.5,
      milestones: ['Raft paper synthesis', 'Randomized election timer', 'Heartbeat RPC tests', 'Log compaction']
    },
    {
      id: 'prj-2',
      name: 'TimeWise AI Platform MVP',
      description: 'Full-stack smart timetable, habit engine, and weather-aware scheduling SaaS.',
      category: 'Software Engineering',
      progress: 92,
      status: 'in_progress',
      deadline: '2026-11-30',
      hoursSpent: 36.0,
      milestones: ['Vite + Tailwind design tokens', 'Scheduling conflict solver', 'Web Audio synthesizer', 'Supabase schema']
    },
    {
      id: 'prj-3',
      name: 'Deep Learning Transformer Attention Visualizer',
      description: 'Multi-head self-attention heatmaps for BERT and GPT-style models in PyTorch.',
      category: 'Machine Learning',
      progress: 100,
      status: 'completed',
      deadline: '2026-11-05',
      hoursSpent: 19.0,
      milestones: ['Q, K, V dot-product layer', 'Positional embeddings', 'Jupyter report writeup']
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Academic');
  const [deadline, setDeadline] = useState('2026-12-20');
  const [progress, setProgress] = useState(25);
  const [hoursSpent, setHoursSpent] = useState(5);
  const [milestonesInput, setMilestonesInput] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const milestones = milestonesInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const newProject: ProjectItem = {
      id: `prj-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      category,
      deadline,
      progress: Number(progress),
      status: Number(progress) === 100 ? 'completed' : 'in_progress',
      hoursSpent: Number(hoursSpent),
      milestones
    };

    setProjects([newProject, ...projects]);
    triggerConfetti();
    setName('');
    setDescription('');
    setMilestonesInput('');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Academic & Technical Workspaces</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Project Workspaces</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Track major semester assignments, development sprints, and milestone deliverables.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-glow-violet transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((prj) => {
          const isDone = prj.progress === 100;

          return (
            <div
              key={prj.id}
              className={`p-6 rounded-2xl glass-card border transition-all flex flex-col justify-between space-y-4 ${
                isDone ? 'border-peach-400/40 bg-peach-300/10' : 'border-white/10 glass-card-hover'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300">
                    {prj.category}
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    isDone ? 'bg-peach-300/20 text-peach-300' : 'bg-brand-500/10 text-brand-300'
                  }`}>
                    {prj.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white line-clamp-1">{prj.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {prj.description}
                </p>

                {/* Progress bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Progress</span>
                    <span className="font-mono font-bold text-white">{prj.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isDone ? 'bg-peach-400' : 'bg-brand-500'}`}
                      style={{ width: `${prj.progress}%` }}
                    />
                  </div>
                </div>

                {/* Milestones preview */}
                {prj.milestones && prj.milestones.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Milestones ({prj.milestones.length})
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {prj.milestones.slice(0, 3).map((m, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-[11px] truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer info */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-brand-400" /> {prj.hoursSpent} hrs
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Due {prj.deadline}
                </span>
                <button
                  onClick={() => handleDelete(prj.id)}
                  className="p-1 hover:text-rose-400"
                  title="Delete project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Technical Project Workspace"
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Project Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Consensus State Machine"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Description & Scope
            </label>
            <textarea
              rows={2}
              placeholder="Objectives, tech stack, and primary deliverables..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <input
                type="text"
                placeholder="Academic / Web Dev / AI"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Current Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Hours Invested
              </label>
              <input
                type="number"
                step="0.5"
                value={hoursSpent}
                onChange={(e) => setHoursSpent(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Key Milestones (One per line)
            </label>
            <textarea
              rows={3}
              placeholder="Draft architectural diagram&#10;Implement database schema&#10;Write unit benchmarks"
              value={milestonesInput}
              onChange={(e) => setMilestonesInput(e.target.value)}
              className="w-full px-4 py-2 rounded-xl glass-input text-xs font-mono"
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
              Launch Workspace
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

