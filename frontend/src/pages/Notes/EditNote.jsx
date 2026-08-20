import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getNote, updateNote } from '../../services/note.api';

const EditNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [loadFailed, setLoadFailed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        setIsLoading(true);
        const response = await getNote(id);
        const note = response?.data?.note || response?.note || response?.data;
        
        if (note) {
          setTitle(note.title || '');
          setContent(note.content || '');
        } else {
          setError('Note not found.');
          setLoadFailed(true);
        }
      } catch (err) {
        setError(err.message || 'Failed to load note details.');
        setLoadFailed(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoteData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      await updateNote(id, { title, content });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to update note. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm font-medium text-stone-500">Loading your note...</p>
        </div>
      </div>
    );
  }

  if (loadFailed) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center gap-4 font-sans px-4 text-center">
        <p className="text-sm font-medium text-red-600">{error}</p>
        <Link to="/dashboard" className="px-6 py-3 rounded-full bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-all">
          Return to Dashboard
        </Link>
      </div>
    );
  }

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
          <span className="text-sm font-semibold text-stone-900">Edit Note Editor</span>
        </div>
      </header>

      {/* Main Layout with Side Info Panel */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column - Form (Takes 2 columns) */}
          <div className="lg:col-span-2 bg-white py-10 px-6 sm:px-10 rounded-3xl shadow-xl shadow-stone-200/40 border border-stone-200/60">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-stone-900">Edit Note</h1>
              <p className="text-sm text-stone-500 mt-1">Modify your note content and save changes securely.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm font-medium">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-stone-700 mb-2">
                  Note Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note title..."
                  className="w-full px-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm font-medium"
                  disabled={isSaving}
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-semibold text-stone-700 mb-2">
                  Note Content
                </label>
                <textarea
                  id="content"
                  rows="10"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Note content..."
                  className="w-full px-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm leading-relaxed resize-y"
                  disabled={isSaving}
                />
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-stone-100">
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-full text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 rounded-full bg-teal-600 text-white font-medium text-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm shadow-teal-600/20"
                >
                  {isSaving ? 'Saving changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-2">Editing Mode</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Any adjustments you make will seamlessly overwrite the previous version of this note upon saving.
              </p>
            </div>

            <div className="bg-teal-900 text-white p-6 rounded-3xl shadow-xl shadow-teal-900/10">
              <h3 className="text-base font-semibold mb-2">Need to go back?</h3>
              <p className="text-sm text-teal-100/80 leading-relaxed mb-4">
                Discard your changes by clicking cancel to return safely to your workspace dashboard.
              </p>
              <Link
                to="/dashboard"
                className="inline-block px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EditNote;