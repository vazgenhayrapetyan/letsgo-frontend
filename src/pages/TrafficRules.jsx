import { useEffect, useState } from 'react';
import api from '../api';

export default function TrafficRules() {
  const [rules, setRules] = useState([]);
  const [activeChapter, setActiveChapter] = useState(null); // Պահում է բացված գլխի ID-ն
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rules')
      .then(response => {
        setRules(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Օրենքները ներբեռնելիս սխալ առաջացավ:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-8 text-xl font-semibold">Կանոնագիրքը բեռնվում է...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-3">Ճանապարհային Երթևեկության Կանոններ</h1>
        <p className="text-gray-600">Հայաստանի Հանրապետության պաշտոնական տեսական կանոնագիրքը</p>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => {
          const isOpen = activeChapter === rule.id;
          return (
            <div 
              key={rule.id} 
              className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-200"
            >
              {/* Գլխի Կոճակը */}
              <button
                onClick={() => setActiveChapter(isOpen ? null : rule.id)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-800 hover:bg-gray-50 transition"
              >
                <div className="flex flex-col sm:flex-row sm:gap-3">
                  <span className="text-blue-600 font-extrabold whitespace-nowrap">{rule.chapterNumber}.</span>
                  <span>{rule.title}</span>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Օրենքի Բուն Տեքստը (Բացվող հատված) */}
              {isOpen && (
                <div className="p-6 bg-gray-50 border-t border-gray-100 text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {rule.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
