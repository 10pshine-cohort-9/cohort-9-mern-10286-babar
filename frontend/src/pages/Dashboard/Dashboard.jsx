import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getNotes, deleteNote } from '../../services/note.api';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Modal states
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewingNote, setViewingNote] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchUserNotes = async () => {
    try {
      setIsLoading(true);
      const response = await getNotes();
      const notesData = response?.data?.notes || response?.notes || response?.data || [];
      setNotes(notesData);
    } catch (err) {
      setError(err.message || 'Failed to load notes.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserNotes();
  }, []);

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    setIsDeleting(true);
    try {
      await deleteNote(noteToDelete);
      setNotes(notes.filter((note) => note.id !== noteToDelete));
      setNoteToDelete(null);
      setViewingNote(null); // Close read modal if open for this note
    } catch (err) {
      alert(err.message || 'Failed to delete note.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'recent') {
      const noteDate = new Date(note.createdAt);
      const daysAgo = (new Date() - noteDate) / (1000 * 60 * 60 * 24);
      return matchesSearch && daysAgo <= 7;
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-800 font-sans selection:bg-teal-100 selection:text-teal-900 relative">
      
      {/* Top Glass Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center shadow-md shadow-teal-600/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-stone-900 block leading-none">
                NoteSpace
              </span>
              <span className="text-xs text-stone-400 font-medium mt-1 block">Workspace Studio</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-stone-500 hover:text-red-600 px-4 py-2 rounded-full hover:bg-red-50 transition-all"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Title & CTA Action */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-stone-900">Your Workspace</h1>
            <p className="text-sm text-stone-500 mt-1">Organize your thoughts, code snippets, and daily tasks in one clean view.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/notes/create"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-teal-600 text-white font-medium text-sm hover:bg-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all gap-2 shadow-md shadow-teal-600/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              New Note
            </Link>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-3 rounded-2xl border border-stone-200/80 shadow-sm">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              All Notes ({notes.length})
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'recent'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Recent (7 Days)
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Notes Grid Display */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white p-6 rounded-3xl border border-stone-200/60 h-52 animate-pulse flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="w-3/4 h-5 bg-stone-100 rounded-lg"></div>
                  <div className="w-full h-3 bg-stone-100 rounded"></div>
                  <div className="w-5/6 h-3 bg-stone-100 rounded"></div>
                </div>
                <div className="w-1/3 h-3 bg-stone-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-stone-200/60 p-8 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-1">No notes found</h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6">
              {searchQuery ? 'No notes match your search criteria.' : 'Create your first note to begin building your workspace.'}
            </p>
            {!searchQuery && (
              <Link
                to="/notes/create"
                className="px-6 py-3 rounded-full bg-teal-600 text-white font-medium text-sm hover:bg-teal-700 transition-all inline-block shadow-sm shadow-teal-600/20"
              >
                Create Your First Note
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div 
                key={note.id} 
                className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div 
                  onClick={() => setViewingNote(note)}
                  className="cursor-pointer flex-1"
                >
                  <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-1">
                    {note.title}
                  </h3>
                  <p className="text-sm text-stone-600 line-clamp-4 leading-relaxed whitespace-pre-line mb-4 font-normal">
                    {note.content}
                  </p>
                </div>
                
                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-400">
                  <span className="font-medium">
                    {new Date(note.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewingNote(note)}
                      title="Read Full Note"
                      className="p-2 rounded-xl text-stone-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    <Link
                      to={`/notes/edit/${note.id}`}
                      title="Edit Note"
                      className="p-2 rounded-xl text-stone-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    
                    <button
                      onClick={() => setNoteToDelete(note.id)}
                      title="Delete Note"
                      className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Read Note Full View Modal with Proper Scroll View & Edit/Delete Actions */}
      {viewingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-stone-100 flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-100 mb-4 shrink-0">
              <div>
                <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block mb-1">Document Reader</span>
                <h2 className="text-2xl font-bold text-stone-900">{viewingNote.title}</h2>
              </div>
              <button
                onClick={() => setViewingNote(null)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content Body with proper min-h-0 constraint */}
            <div className="flex-1 overflow-y-auto pr-2 my-2 min-h-0">
              <p className="text-stone-700 leading-relaxed whitespace-pre-line text-sm sm:text-base font-normal">
                {viewingNote.content}
              </p>
            </div>

            {/* Modal Footer with Edit, Delete, and Close Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-400 shrink-0 mt-4">
              <span>Created: {new Date(viewingNote.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
              
              <div className="flex items-center gap-2">
                <Link
                  to={`/notes/edit/${viewingNote.id}`}
                  className="px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-medium text-xs hover:bg-teal-100 transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Link>

                <button
                  onClick={() => setNoteToDelete(viewingNote.id)}
                  className="px-4 py-2 rounded-full bg-red-50 text-red-600 font-medium text-xs hover:bg-red-100 transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>

                <button
                  onClick={() => setViewingNote(null)}
                  className="px-5 py-2 rounded-full bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {noteToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-100 animate-fade-in-up">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-1">Delete Note</h3>
            <p className="text-sm text-stone-500 mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setNoteToDelete(null)}
                className="flex-1 py-2.5 px-4 rounded-full border border-stone-200 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors shadow-sm shadow-red-600/20 flex items-center justify-center gap-2"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;