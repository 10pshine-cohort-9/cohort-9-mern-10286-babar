import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createNote } from '../../services/note.api';
import NoteForm from '../../components/layout/notes/NoteForm';

const CreateNote = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await createNote(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-800 font-sans selection:bg-teal-100 selection:text-teal-900 flex flex-col">
      
      {/* Top Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/dashboard" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Dashboard
          </Link>
          <span className="text-sm font-semibold text-stone-900">New Note Editor</span>
        </div>
      </header>

      {/* Main Layout with Side Info Panel */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-2 bg-white py-10 px-6 sm:px-10 rounded-3xl shadow-xl shadow-stone-200/40 border border-stone-200/60">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-stone-900">Create Note</h1>
              <p className="text-sm text-stone-500 mt-1">Capture your core thoughts, ideas, or reminders.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm font-medium">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <NoteForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              loading={isLoading}
              submitText="Save Note"
            />
          </div>

          {/* Right Column - Writing Tips & Shortcuts Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-2">Writing Tips</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Keep your titles descriptive and concise so you can easily find them later using the dashboard live search bar.
              </p>
            </div>

            <div className="bg-teal-900 text-white p-6 rounded-3xl shadow-xl shadow-teal-900/10">
              <h3 className="text-base font-semibold mb-2">Workspace Security</h3>
              <p className="text-sm text-teal-100/80 leading-relaxed">
                All notes are linked directly to your authenticated session and safely stored in your isolated database.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CreateNote;