import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function TicketsPage() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tickets')
    .then(response => {
      setTickets(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Տվյալները ներբեռնելիս սխալ առաջացավ ", error);
      setLoading(false);
    });
  }, []);
  if(loading) {
    return <div className="text-center">...Բեռնվում է</div>
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Քննական Տոմսեր</h1>
      
      {/* Տոմսերի Ցուցակը Tailwind-ով */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tickets.map(ticket => (
          <div 
            key={ticket.id} 
            onClick={() => navigate(`/tickets/${ticket.id}`)} 
            className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm text-center font-bold text-gray-700 hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-200"
          >
            {ticket.ticketNumber}
          </div>
        ))}
      </div>
    </div>
  );
}
