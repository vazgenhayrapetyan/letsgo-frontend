import { useEffect, useState } from 'react';
import api from '../api';

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Քանի որ C#-ում ունենք [HttpGet("tickets")] երթուղի, եկեք սկզբում բերենք թեմաները
    // (Հետագայում C#-ում կավելացնենք նաև /api/topics հասցեն, եթե պետք լինի, բայց այժմ ստուգենք կապը)
    api.get('/tickets') 
      .then(() => {
        // Ժամանակավոր լցնենք Workbench-ում մեր ավելացրած իրական թեմաները
        setTopics([
          { id: 1, name: 'Ճանապարհային նշաններ' },
          { id: 2, name: 'Խաչմերուկների անցում' },
          { id: 3, name: 'Արագության սահմանափակում' }
        ]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Թեմաները ներբեռնելիս սխալ առաջացավ:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-8 text-xl font-semibold">Բեռնվում է...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Ուսուցում ըստ Թեմաների</h1>
      
      <div className="space-y-4">
        {topics.map(topic => (
          <div 
            key={topic.id}
            className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm flex justify-between items-center hover:border-green-500 hover:shadow-md cursor-pointer transition-all duration-200"
          >
            <span className="text-lg font-semibold text-gray-800">{topic.name}</span>
            <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-sm font-bold">
              Անցնել թեստը →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
