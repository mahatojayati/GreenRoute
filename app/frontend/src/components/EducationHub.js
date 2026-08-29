import React, { useState } from "react";
import {
  BookOpen,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Leaf,
  RefreshCw,
  Award
} from "lucide-react";
import { EDUCATION } from "@/constants/testIds";

const wasteGuideItems = [
  {
    item: "Greasy Pizza Boxes",
    bin: "Organic / Trash",
    binColor: "bg-amber-100 text-amber-900 border-amber-300",
    instruction: "Clean top lid can be recycled with paper. The oil-soaked cardboard base belongs in compost or general waste.",
  },
  {
    item: "Aluminium Beverage Cans",
    bin: "Recyclable (Blue)",
    binColor: "bg-blue-100 text-blue-900 border-blue-300",
    instruction: "Rinse quickly. Do not crush if your local sensor uses optical sorting.",
  },
  {
    item: "Lithium-Ion Batteries",
    bin: "Hazardous (Red / E-Waste)",
    binColor: "bg-red-100 text-red-900 border-red-300",
    instruction: "Never dispose in regular bins due to fire hazard! Take to a designated municipal battery drop-off box.",
  },
  {
    item: "Coffee Grounds & Filters",
    bin: "Organic Compost (Green)",
    binColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    instruction: "100% compostable. Coffee grounds enrich municipal soil with nitrogen.",
  },
  {
    item: "Plastic Grocery Bags",
    bin: "Store Drop-off Only",
    binColor: "bg-amber-100 text-amber-900 border-amber-300",
    instruction: "Soft film plastic tangles automated sorting machinery. Return clean bags to supermarket drop-offs.",
  },
  {
    item: "Glass Jars & Bottles",
    bin: "Recyclable Glass",
    binColor: "bg-blue-100 text-blue-900 border-blue-300",
    instruction: "Rinse clean and remove metal lids (metal lids recycle separately in yellow/blue).",
  },
  {
    item: "Broken Ceramic Mugs",
    bin: "General Waste (Landfill)",
    binColor: "bg-slate-200 text-slate-900 border-slate-300",
    instruction: "Ceramics melt at higher temperatures than glass and will ruin a batch of recycled glass.",
  },
  {
    item: "Fluorescent & LED Lightbulbs",
    bin: "Hazardous (Red)",
    binColor: "bg-red-100 text-red-900 border-red-300",
    instruction: "Contains heavy metals & electronic circuitry. Drop off at household hazardous waste hubs.",
  },
];

const quizQuestions = [
  {
    question: "Can an oily takeout container be thrown in the blue paper recycling bin?",
    options: [
      "Yes, the recycling facility washes it out with water.",
      "No, food grease contaminates paper fibers and ruins the recycling batch.",
      "Only if it is made of white paperboard.",
    ],
    correct: 1,
    explanation: "Food grease binds to paper pulp fibers during reprocessing and cannot be filtered out, spoiling the entire slurry.",
  },
  {
    question: "What should you do before recycling empty peanut butter jars or milk cartons?",
    options: [
      "Soak in bleach for 24 hours.",
      "Give them a quick rinse to remove heavy residue.",
      "Nothing, food scraps are burned off anyway.",
    ],
    correct: 1,
    explanation: "A brief rinse prevents bacterial mold and prevents contamination at the sorting facility.",
  },
  {
    question: "Why should rechargeable lithium batteries never go in curbside waste bins?",
    options: [
      "They are too heavy for the collection truck.",
      "They can puncture under compaction and cause intense chemical truck fires.",
      "They stop other metals from sticking to magnets.",
    ],
    correct: 1,
    explanation: "Crushed lithium batteries are the #1 cause of collection truck and recycling facility fires.",
  },
];

const EducationHub = ({ setIsChatOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const filteredGuide = wasteGuideItems.filter((item) => {
    const matchesSearch =
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.instruction.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Organic" && item.bin.includes("Organic")) ||
      (selectedCategory === "Recyclable" && item.bin.includes("Recyclable")) ||
      (selectedCategory === "Hazardous" && item.bin.includes("Hazardous"));
    return matchesSearch && matchesCategory;
  });

  const handleOptionSelect = (index) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === quizQuestions[currentQuestionIndex].correct) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div data-testid={EDUCATION.container} className="space-y-8">
      {/* Hero Banner with Curated Media from Design Guidelines */}
      <div className="relative rounded-3xl overflow-hidden border border-[#2C3E50]/10 shadow-soft bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E5A44]/10 text-[#2E5A44] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Citizen Sustainability Academy</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C3E50] tracking-tight">
              Master the Art of Smart Waste Segregation
            </h2>

            <p className="text-sm sm:text-base text-[#2C3E50]/80 leading-relaxed">
              Correct bin sorting at the source increases municipal recycling efficiency by over 60% and directly lowers city carbon emissions. Use our interactive item directory below or test your eco-knowledge.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const element = document.getElementById("quiz-section");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="pill-btn-primary px-5 py-2.5 text-xs flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Take Recycling IQ Quiz</span>
              </button>

              <button
                onClick={() => setIsChatOpen(true)}
                className="pill-btn-secondary px-4 py-2.5 text-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Ask AI Waste Scanner</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 h-64 lg:h-full relative min-h-[220px]">
            <img
              src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwyfHxyZWN5Y2xpbmclMjBzZWdyZWdhdGlvbiUyMGJpbnN8ZW58MHx8fHwxNzg1ODI2MDQ1fDA&ixlib=rb-4.1.0&q=85"
              alt="Color-coded waste segregation bins"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Waste Directory & Interactive Lookup */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-xl text-[#2C3E50]">
              What Goes Where? Instant Waste Directory
            </h3>
            <p className="text-xs text-[#2C3E50]/60">
              Search any household item to find its correct disposal stream and instructions.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                data-testid={EDUCATION.searchGuide}
                type="text"
                placeholder="Search item (e.g. pizza box)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-white border border-[#2C3E50]/15 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/40"
              />
            </div>

            <select
              data-testid={EDUCATION.categoryFilter}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-full bg-white border border-[#2C3E50]/15 text-[#2C3E50] font-medium"
            >
              <option value="All">All Streams</option>
              <option value="Organic">Organic</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Hazardous">Hazardous</option>
            </select>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGuide.map((item, i) => (
            <div
              key={i}
              data-testid={EDUCATION.guideCard}
              className="clean-card p-5 space-y-3 border border-[#2C3E50]/10 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-sm text-[#2C3E50]">
                    {item.item}
                  </span>
                </div>

                <div className="inline-block">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.binColor}`}>
                    {item.bin}
                  </span>
                </div>

                <p className="text-xs text-[#2C3E50]/80 leading-relaxed pt-1">
                  {item.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Quiz Section */}
      <div
        id="quiz-section"
        data-testid={EDUCATION.quizSection}
        className="clean-card p-6 sm:p-8 border border-[#2E5A44]/20 bg-gradient-to-br from-white to-[#F1F8F4]/80 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#2E5A44] text-white flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#2C3E50]">
                Recycling IQ Challenge
              </h3>
              <p className="text-xs text-[#2C3E50]/60">
                Test your knowledge and earn citizen sustainability certification points
              </p>
            </div>
          </div>

          {!isQuizCompleted && (
            <span className="text-xs font-bold text-[#2E5A44] bg-[#2E5A44]/10 px-3 py-1 rounded-full">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
          )}
        </div>

        {isQuizCompleted ? (
          /* Quiz Results View */
          <div className="text-center py-8 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2E5A44] flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-extrabold text-2xl text-[#2C3E50]">
              Quiz Completed!
            </h4>
            <p className="text-sm text-[#2C3E50]/80">
              You scored <span className="font-bold text-[#2E5A44]">{quizScore}</span> out of{" "}
              <span className="font-bold">{quizQuestions.length}</span> correct!
            </p>
            <p className="text-xs text-slate-500">
              {quizScore === quizQuestions.length
                ? "🌟 Outstanding! You're a certified GreenRoute Master Recycler."
                : "Great effort! Review the waste segregation guide above to boost your score."}
            </p>
            <button
              onClick={handleResetQuiz}
              className="pill-btn-primary px-6 py-2.5 text-xs flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          </div>
        ) : (
          /* Question Form View */
          <div className="space-y-4 max-w-2xl">
            <h4 className="font-heading font-bold text-base text-[#2C3E50]">
              {quizQuestions[currentQuestionIndex].question}
            </h4>

            <div className="space-y-2.5">
              {quizQuestions[currentQuestionIndex].options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === quizQuestions[currentQuestionIndex].correct;

                let optionStyle = "border-slate-200 bg-white hover:bg-slate-50 text-[#2C3E50]";
                if (isAnswerSubmitted) {
                  if (isCorrect) optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                  else if (isSelected) optionStyle = "border-red-400 bg-red-50 text-red-900";
                } else if (isSelected) {
                  optionStyle = "border-[#2E5A44] bg-[#2E5A44]/5 text-[#2E5A44] font-semibold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswerSubmitted && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  Explanation:
                </p>
                <p>{quizQuestions[currentQuestionIndex].explanation}</p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="pill-btn-primary px-5 py-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="pill-btn-primary px-5 py-2 text-xs flex items-center gap-1.5"
                >
                  <span>
                    {currentQuestionIndex + 1 < quizQuestions.length ? "Next Question" : "See Final Score"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationHub;
