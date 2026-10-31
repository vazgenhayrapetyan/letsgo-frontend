import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function TakeTicket() {
  const { ticketId } = useParams(); // Վերցնում է տոմսի ID-ն հասցեից
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0); // Ընթացիկ հարցի ինդեքսը
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Դիմում ենք C# բեքենդի համապատասխան հասցեին
    api.get(`/tickets/${ticketId}/questions`)
      .then(response => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Հարցերը ներբեռնելիս սխալ առաջացավ:", error);
        setLoading(false);
      });
  }, [ticketId]);

  if (loading) return <div className="text-center p-8 text-xl font-semibold">Թեստը բեռնվում է...</div>;
  if (questions.length === 0) return (
    <div className="text-center p-8">
      <p className="text-xl text-gray-600 mb-4">Այս տոմսում դեռ հարցեր չկան լրացված:</p>
      <Link to="/tickets" className="text-blue-600 font-bold underline">Վերադառնալ ցուցակին</Link>
    </div>
  );

  const currentQuestion = questions[currentIdx];

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return; // Թույլ չտալ փոխել պատասխանը
    setSelectedAnswerId(answer.id);
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedAnswerId(null);
    setIsAnswered(false);
    setCurrentIdx(prev => prev + 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Վերևի վահանակ */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/tickets" className="text-sm font-semibold text-gray-600 hover:text-blue-600">← Հետ դեպի Տոմսեր</Link>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
          Հարց՝ {currentIdx + 1} / {questions.length}
        </span>
      </div>

      {/* Քննական Քարտ */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
        {/* Հարցի նկարը (եթե կա բազայում) */}
        {currentQuestion.imageUrl && (
          <div className="flex justify-center mb-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <img 
              src={`http://localhost:5173/${currentQuestion.imageUrl}`} 
              alt="Հարցի պատկեր" 
              className="max-h-64 object-contain rounded-lg"
            />
          </div>
        )}

        {/* Հարցի տեքստը */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {currentQuestion.questionText}
        </h2>

        {/* Պատասխանների տարբերակները */}
        <div className="space-y-3">
          {currentQuestion.answers?.map(answer => {
            // Ոճավորումը՝ ըստ ընտրության և ճշտության
            let btnClass = "border-gray-200 hover:bg-gray-50 text-gray-700";
            if (isAnswered) {
              if (answer.isCorrect) {
                btnClass = "bg-green-100 border-green-400 text-green-800 font-semibold";
              } else if (selectedAnswerId === answer.id) {
                btnClass = "bg-red-100 border-red-400 text-red-800";
              }
            }

            return (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(answer)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-base ${btnClass}`}
              >
                {answer.answerText}
              </button>
            );
          })}
        </div>

        {/* Բացատրության բլոկ (ցույց է տալիս պատասխանելուց հետո) */}
        {isAnswered && currentQuestion.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
            <strong>Մեկնաբանություն.</strong> {currentQuestion.explanation}
          </div>
        )}
      </div>

      {/* Հաջորդ հարցի կոճակը */}
      {isAnswered && currentIdx < questions.length - 1 && (
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition duration-200 shadow-md"
        >
          Հաջորդ Հարցը →
        </button>
      )}

      {isAnswered && currentIdx === questions.length - 1 && (
        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 font-bold">
          Շնորհավորում ենք, Դուք ավարտեցիք այս տոմսի բոլոր հարցերը:
        </div>
      )}
    </div>
  );
}
