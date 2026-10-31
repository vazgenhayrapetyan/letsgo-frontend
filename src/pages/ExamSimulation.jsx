import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function ExamSimulation() {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // Պահում է օգտատիրոջ ընտրած պատասխանները
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Բերում ենք 20 պատահական հարցերը C# բեքենդից
    api.get('/exam-simulation')
      .then(response => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Քննական հարցերը ներբեռնելիս սխալ առաջացավ:", error);
        setLoading(false);
      });
  }, []);

  // Ժամանակաչափի (Timer) աշխատանքը
  useEffect(() => {
    if (loading || isFinished || timeLeft <= 0) {
      if (timeLeft === 0 && !isFinished) setIsFinished(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, loading, isFinished]);

  if (loading) return <div className="text-center p-8 text-xl font-semibold">Քննությունը նախապատրաստվում է...</div>;

  const currentQuestion = questions[currentIdx];

  const handleAnswerSelect = (answerId) => {
    setUserAnswers({ ...userAnswers, [currentIdx]: answerId });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Ժամանակի ձևաչափը (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Արդյունքների հաշվարկ
  const getResults = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const selectedId = userAnswers[idx];
      const correctAns = q.answers.find(a => a.isCorrect);
      if (correctAns && selectedId === correctAns.id) {
        correctCount++;
      }
    });
    const wrongCount = questions.length - correctCount;
    const isPassed = correctCount >= 18; // Անցնելու շեմը՝ 18 ճիշտ պատասխան
    return { correctCount, wrongCount, isPassed };
  };

  if (isFinished) {
    const { correctCount, wrongCount, isPassed } = getResults();
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-8">
          <div className="text-6xl mb-4">{isPassed ? '🎉' : '❌'}</div>
          <h1 className={`text-3xl font-black mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
            {isPassed ? 'Քննությունը Հանձնված է' : 'Քննությունը Ձախողված է'}
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Անցնելու համար անհրաժեշտ է նվազագույնը 18 ճիշտ պատասխան:
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
              <div className="text-sm font-bold text-green-700">Ճիշտ</div>
              <div className="text-2xl font-black text-green-600">{correctCount}</div>
            </div>
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
              <div className="text-sm font-bold text-red-700">Սխալ</div>
              <div className="text-2xl font-black text-red-600">{wrongCount}</div>
            </div>
          </div>

          <Link to="/" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md">
            Վերադառնալ Գլխավոր Էջ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Վերևի քննական վահանակ */}
      <div className="flex justify-between items-center mb-6 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <span className="font-bold text-gray-700">Նախնական Քննություն</span>
        <div className="flex gap-4 items-center">
          <span className={`text-xl font-mono font-black ${timeLeft < 120 ? 'text-red-600 animate-pulse' : 'text-gray-800'}`}>
            ⏱️ {formatTime(timeLeft)}
          </span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
            Հարց՝ {currentIdx + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Քննական Հարցի Քարտ */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
        {currentQuestion.imageUrl && (
          <div className="flex justify-center mb-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <img 
              src={`http://localhost:5173/${currentQuestion.imageUrl}`} 
              alt="Քննական հարց" 
              className="max-h-64 object-contain rounded-lg"
            />
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {currentQuestion.questionText}
        </h2>

        <div className="space-y-3">
          {currentQuestion.answers?.map(answer => {
            const isSelected = userAnswers[currentIdx] === answer.id;
            return (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(answer.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 text-base ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' 
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {answer.answerText}
              </button>
            );
          })}
        </div>
      </div>

      {/* Հաջորդ/Ավարտել կոճակ */}
      <button
        onClick={handleNext}
        disabled={userAnswers[currentIdx] === undefined}
        className={`w-full font-bold py-3.5 px-6 rounded-xl transition duration-200 shadow-md ${
          userAnswers[currentIdx] !== undefined
            ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {currentIdx === questions.length - 1 ? 'Ավարտել Քննությունը' : 'Հաջորդ Հարցը →'}
      </button>
    </div>
  );
}
