import { useEffect, useState } from 'react';
import { FaArrowUp, FaCheckCircle, FaUser, FaUniversity, FaBan, FaSyncAlt } from 'react-icons/fa';

function Terms() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto m-8 p-8 bg-gray-100 shadow-md rounded-lg dark:bg-[#111827]">
      <h1 className="text-4xl font-bold text-[#12b981] mb-8 border-b-2 pb-4">Terms of Service</h1>
      <p className="text-base leading-relaxed text-[#374151] mb-6 dark:text-gray-200">
        These Terms of Service govern your use of Civix. By accessing or using our platform, you agree to these terms.
      </p>

      <div className="mt-10 p-6 rounded-lg border border-gray-300 bg-white/70 shadow-sm dark:border-gray-700 dark:bg-white/5">
        <h2 className="text-[#12b981] text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaCheckCircle className="text-[#12b981]" /> Use of Service
        </h2>
        <p className="text-base leading-relaxed text-[#374151] dark:text-gray-200">
          You agree to use Civix for lawful purposes only and not to misuse or interfere with the platform's functionality.
        </p>
      </div>

      <div className="mt-10 p-6 rounded-lg border border-gray-300 bg-white/70 shadow-sm dark:border-gray-700 dark:bg-white/5">
        <h2 className="text-[#12b981] text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaUser className="text-[#12b981]" /> User Responsibilities
        </h2>
        <p className="text-base leading-relaxed text-[#374151] dark:text-gray-200">
          Users are responsible for the accuracy of the information they submit and must avoid submitting false or misleading reports.
        </p>
      </div>

      <div className="mt-10 p-6 rounded-lg border border-gray-300 bg-white/70 shadow-sm dark:border-gray-700 dark:bg-white/5">
        <h2 className="text-[#12b981] text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaUniversity className="text-[#12b981]" /> Platform Rights
        </h2>
        <p className="text-base leading-relaxed text-[#374151] dark:text-gray-200">
          We reserve the right to modify, suspend, or discontinue the platform at any time without prior notice.
        </p>
      </div>

      <div className="mt-10 p-6 rounded-lg border border-gray-300 bg-white/70 shadow-sm dark:border-gray-700 dark:bg-white/5">
        <h2 className="text-[#12b981] text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaBan className="text-[#12b981]" /> Termination
        </h2>
        <p className="text-base leading-relaxed text-[#374151] dark:text-gray-200">
          We may suspend or terminate access if you violate these terms or engage in prohibited activities.
        </p>
      </div>

      <div className="mt-10 p-6 rounded-lg border border-gray-300 bg-white/70 shadow-sm dark:border-gray-700 dark:bg-white/5">
        <h2 className="text-[#12b981] text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaSyncAlt className="text-[#12b981]" /> Updates to Terms
        </h2>
        <p className="text-base leading-relaxed text-[#374151] dark:text-gray-200">
          We may revise these terms periodically. Continued use of Civix constitutes your acceptance of any changes.
        </p>
      </div>

      <hr className="mt-16 mb-6 border-t border-gray-300 dark:border-gray-600" />
      <footer className="text-sm text-gray-400 text-center">
        <em>Last updated: <time dateTime="2025-06">June 2025</time></em>
      </footer>


      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="fixed bottom-6 right-6 z-50 bg-[#12b981] text-white p-3 rounded-full shadow-lg hover:bg-[#0fa97d] transition duration-300"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default Terms;
