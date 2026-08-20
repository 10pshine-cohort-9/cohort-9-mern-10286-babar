import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-800 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      
      {/* 1. Responsive Navigation */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-teal-600 flex items-center justify-center shadow-sm">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-medium tracking-tight text-stone-900">
              NoteSpace
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/login" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="text-sm font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md transition-all">
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Responsive Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[85vh]">
        
        {/* Left Text */}
        <div className="flex-1 text-center lg:text-left z-10 w-full mt-8 sm:mt-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 leading-[1.15] mb-4 sm:mb-6">
            A quiet place for <br className="hidden lg:block" />
            <span className="text-teal-600 italic">your thoughts.</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-500 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0">
            A simple, elegant notebook for your daily ideas, lists, and reminders. Free yourself from digital clutter and focus on writing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center">
              Start writing for free
            </Link>
          </div>
        </div>

        {/* Right Visual - Hidden on mobile (sm and down) for a cleaner UX */}
        <div className="flex-1 relative w-full max-w-md lg:max-w-none hidden md:block mt-12 lg:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-teal-50 rounded-full blur-3xl -z-10"></div>
          
          <div className="relative transform scale-90 lg:scale-100">
            {/* Main Note Card */}
            <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 rotate-[-2deg] relative z-20">
              <h3 className="text-lg lg:text-xl font-medium text-stone-800 mb-3">Morning Routine</h3>
              <ul className="space-y-3 text-stone-500 text-sm lg:text-base">
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-sm border-2 border-teal-500 bg-teal-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="line-through text-stone-400">Meditate for 10 minutes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-sm border-2 border-stone-200"></div>
                  <span>Review weekly goals</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-sm border-2 border-stone-200"></div>
                  <span>Brainstorm project ideas</span>
                </li>
              </ul>
            </div>

            {/* Background Note Card */}
            <div className="absolute -bottom-6 lg:-bottom-10 -right-4 lg:-right-6 bg-white/90 backdrop-blur-sm p-5 lg:p-6 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100 rotate-[4deg] z-10 w-56 lg:w-64">
              <h3 className="text-sm font-medium text-stone-800 mb-2">Book Recommendations</h3>
              <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                "The Creative Act" by Rick Rubin. Make sure to read the chapter on creating an environment that fosters new ideas...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Responsive Features Grid */}
      <section className="bg-white py-16 sm:py-24 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          
          <div className="flex flex-col items-center text-center px-4 sm:px-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-4 sm:mb-6">
              <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-stone-900 mb-2 sm:mb-3">Format your way</h3>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
              Make your text bold, create lists, or add headers. Structure your thoughts beautifully without fighting the editor.
            </p>
          </div>

          <div className="flex flex-col items-center text-center px-4 sm:px-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-4 sm:mb-6">
              <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-stone-900 mb-2 sm:mb-3">Keep it private</h3>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
              Your personal space. Everything you write is locked safely away, accessible only by you.
            </p>
          </div>

          <div className="flex flex-col items-center text-center px-4 sm:px-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-4 sm:mb-6">
              <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-stone-900 mb-2 sm:mb-3">Never lose a thought</h3>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
              Everything saves instantly in the background. Pick up exactly where you left off at any time.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Responsive Footer */}
      <footer className="py-8 sm:py-10 bg-[#FAFAF9] text-center border-t border-stone-100">
        <p className="text-xs sm:text-sm text-stone-400">&copy; {new Date().getFullYear()} NoteSpace. A quiet place to write.</p>
      </footer>

    </div>
  );
};

export default Home;