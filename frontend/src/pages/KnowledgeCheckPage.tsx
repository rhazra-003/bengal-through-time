import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw, ShieldCheck, XCircle } from 'lucide-react';
import { Footer } from '../components/Footer';
import { knowledgeCheckQuestions } from '../data/knowledgeCheckQuestions';

const QUESTIONS_PER_ROUND = 5;

export const KnowledgeCheckPage: React.FC = () => {
  const navigate = useNavigate();
  const [roundStart, setRoundStart] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [roundCorrect, setRoundCorrect] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [roundComplete, setRoundComplete] = useState(false);

  const question = knowledgeCheckQuestions[roundStart + questionIndex];
  const questionNumber = roundStart + questionIndex + 1;
  const currentRoundSize = Math.min(QUESTIONS_PER_ROUND, knowledgeCheckQuestions.length - roundStart);
  const isLastQuestion = questionIndex === currentRoundSize - 1;
  const allQuestionsComplete = roundStart + currentRoundSize >= knowledgeCheckQuestions.length;

  const handleSubmit = () => {
    if (selectedAnswer === null || submitted) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    setSubmitted(true);
    if (isCorrect) {
      setRoundCorrect((current) => current + 1);
      setTotalCorrect((current) => current + 1);
    }
    if (isLastQuestion) setRoundComplete(true);
  };

  const handleNext = () => {
    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  const handleTryAgain = () => {
    setRoundStart((current) => current + QUESTIONS_PER_ROUND);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setRoundCorrect(0);
    setRoundComplete(false);
  };

  return (
    <div className="min-h-screen bg-parchment-100 flex flex-col">
      <main className="max-w-3xl mx-auto w-full px-4 sm:px-8 py-10 flex-1">
        <div className="space-y-3 mb-8">
          <button type="button" onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-xs font-serif font-semibold text-brass-amber hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Previous Page
          </button>
          <div className="flex items-center gap-2 text-brass-amber">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs uppercase font-bold tracking-widest">Knowledge Check</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-ink leading-tight">
            Test Your Bengal History Knowledge
          </h1>
          <p className="text-sm text-ink-muted leading-relaxed">
            Take a short, focused challenge through the atlas. Choose an answer, see the explanation immediately, and build your score one question at a time.
          </p>
        </div>

        <section className="bg-parchment-200 border border-parchment-300 rounded-xl p-5 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-parchment-300 pb-4 mb-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-bold text-brass-amber">
                Round {Math.floor(roundStart / QUESTIONS_PER_ROUND) + 1} of {Math.ceil(knowledgeCheckQuestions.length / QUESTIONS_PER_ROUND)}
              </span>
              <p className="font-serif font-bold text-ink mt-1">Question {questionNumber}</p>
            </div>
            <div className="text-xs text-ink-muted">
              Score: <strong className="text-ink">{totalCorrect}/{questionNumber - (submitted ? 0 : 1)}</strong>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif font-bold text-xl text-ink leading-snug">{question.question}</h2>

            <div className="grid gap-3" role="radiogroup" aria-label="Answer options">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = submitted && index === question.correctAnswer;
                const isWrongSelection = submitted && isSelected && !isCorrect;
                let optionClass = 'border-parchment-300 bg-parchment-100 hover:border-brass-amber hover:bg-parchment-200';
                if (isCorrect) optionClass = 'border-emerald-500 bg-emerald-50 text-emerald-900';
                if (isWrongSelection) optionClass = 'border-red-400 bg-red-50 text-red-900';
                if (isSelected && !submitted) optionClass = 'border-brass-amber bg-brass-amber/10 ring-2 ring-brass-amber/30';

                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={submitted}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full text-left flex items-center gap-3 rounded-lg border p-3.5 text-sm transition-colors ${optionClass}`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current font-serif font-bold text-xs">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {isCorrect && <CheckCircle className="w-5 h-5 shrink-0 text-emerald-700" />}
                    {isWrongSelection && <XCircle className="w-5 h-5 shrink-0 text-red-700" />}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className={`rounded-lg border p-4 text-sm ${selectedAnswer === question.correctAnswer ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-red-300 bg-red-50 text-red-900'}`}>
                <strong>{selectedAnswer === question.correctAnswer ? 'You are right!' : 'Not quite!'}</strong>{' '}
                The correct answer is <strong>{question.options[question.correctAnswer]}</strong>.
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <span className="text-xs text-ink-light">Five questions per round</span>
              {!submitted ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass-amber px-4 py-2.5 text-xs font-serif font-bold text-parchment-100 transition-colors hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Answer <CheckCircle className="w-4 h-4" />
                </button>
              ) : isLastQuestion ? (
                allQuestionsComplete ? (
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass-amber px-4 py-2.5 text-xs font-serif font-bold text-parchment-100 transition-colors hover:bg-amber-900"
                  >
                    <RotateCcw className="w-4 h-4" /> Play Again
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleTryAgain}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass-amber px-4 py-2.5 text-xs font-serif font-bold text-parchment-100 transition-colors hover:bg-amber-900"
                  >
                    Try More <ArrowRight className="w-4 h-4" />
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass-amber px-4 py-2.5 text-xs font-serif font-bold text-parchment-100 transition-colors hover:bg-amber-900"
                >
                  Next Question <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {roundComplete && (
          <div className="mt-5 rounded-xl border border-parchment-300 bg-parchment-200 p-5 text-center shadow-sm">
            <p className="font-serif font-bold text-ink">
              {allQuestionsComplete ? `You completed all ${knowledgeCheckQuestions.length} questions.` : `Round complete: ${roundCorrect} of ${currentRoundSize} correct.`}
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              {allQuestionsComplete ? `Final score: ${totalCorrect} of ${knowledgeCheckQuestions.length}.` : 'Choose Try More to unlock the next five questions.'}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
