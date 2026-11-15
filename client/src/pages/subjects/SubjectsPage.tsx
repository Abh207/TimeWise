import React, { useState } from 'react';
import { 
  BookMarked, 
  Plus, 
  GraduationCap, 
  Clock, 
  Calendar, 
  FileText, 
  User, 
  Trash2, 
  CheckCircle2 
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { triggerConfetti } from '../../components/ui/Confetti';

interface SubjectItem {
  id: string;
  code: string;
  title: string;
  instructor: string;
  credits: number;
  room: string;
  examDate: string;
  gradeGoal: string;
}

export const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectItem[]>([
    {
      id: 'sub-1',
      code: 'CS 301',
      title: 'Advanced Algorithms & Complexity',
      instructor: 'Dr. Sarah Mitchell',
      credits: 4,
      room: 'Hall CS-301',
      examDate: '2026-12-14',
      gradeGoal: 'A (4.0)'
    },
    {
      id: 'sub-2',
      code: 'CS 350',
      title: 'Distributed Systems & Cloud Infrastructure',
      instructor: 'Prof. David Vance',
      credits: 4,
      room: 'Tech Hub B204',
      examDate: '2026-12-18',
      gradeGoal: 'A (4.0)'
    },
    {
      id: 'sub-3',
      code: 'MATH 240',
      title: 'Linear Algebra & Optimization for Machine Learning',
      instructor: 'Dr. Elena Rostova',
      credits: 3,
      room: 'Math Annex 105',
      examDate: '2026-12-11',
      gradeGoal: 'A- (3.7)'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [credits, setCredits] = useState(3);
  const [room, setRoom] = useState('');
  const [examDate, setExamDate] = useState('2026-12-20');
  const [gradeGoal, setGradeGoal] = useState('A (4.0)');

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    const newSub: SubjectItem = {
      id: `sub-${Date.now()}`,
      code: code.trim(),
      title: title.trim(),
      instructor: instructor.trim() || 'Staff Professor',
      credits: Number(credits),
      room: room.trim() || 'Campus Hall',
      examDate,
      gradeGoal
    };

    setSubjects([...subjects, newSub]);
    triggerConfetti();
    setCode('');
    setTitle('');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Academic Curriculum Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Academic Subjects & Faculty</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Manage course credits, instructors, exam countdowns, and target GPA requirements.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-glow-violet transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject</span>
        </button>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded-2xl glass-card border border-white/10 glass-card-hover flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">
                  {sub.code}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{sub.credits} Credits</span>
              </div>

              <h3 className="text-base font-bold text-white line-clamp-1">{sub.title}</h3>

              <div className="mt-3 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-slate-400">
                  <User className="w-3.5 h-3.5 text-brand-400" />
                  <span>{sub.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <GraduationCap className="w-3.5 h-3.5 text-peach-300" />
                  <span>Target Grade: <strong className="text-white">{sub.gradeGoal}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Final Exam: <strong className="text-white">{sub.examDate}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate">{sub.room}</span>
              <button
                onClick={() => handleDelete(sub.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400"
                title="Delete subject"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Academic Subject"
      >
        <form onSubmit={handleCreateSubject} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Course Code
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CS 301"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Credits
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Subject Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Advanced Algorithms & Complexity"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Instructor
              </label>
              <input
                type="text"
                placeholder="Dr. Sarah Mitchell"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Classroom Venue
              </label>
              <input
                type="text"
                placeholder="Hall CS-301"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Final Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Grade Target
              </label>
              <input
                type="text"
                placeholder="A (4.0)"
                value={gradeGoal}
                onChange={(e) => setGradeGoal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
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
              Add Subject
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

