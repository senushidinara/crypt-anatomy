import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skull, CheckCircle, XCircle, Trophy, Ghost } from "lucide-react";
import { toast } from "sonner";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  spookyFeedback: {
    correct: string;
    incorrect: string;
  };
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which bone, dear mortal, is the longest in the human body?",
    options: ["Humerus", "Femur", "Tibia", "Radius"],
    correctAnswer: 1,
    spookyFeedback: {
      correct: "*Ghostly applause echoes through the crypt* Excellent! The femur, stretching from hip to knee, is indeed the mightiest of bones. Many such bones I've examined in my time...",
      incorrect: "*Disappointed rattling of chains* Alas, the correct answer is the femur. Perhaps you need more time among the specimens..."
    }
  },
  {
    id: 2,
    question: "How many chambers reside within the cursed heart?",
    options: ["Two", "Three", "Four", "Five"],
    correctAnswer: 2,
    spookyFeedback: {
      correct: "*A spectral smile appears* Yes! Four chambers—two atria and two ventricles—work in eternal rhythm. Mine stopped long ago, yet yours beats on...",
      incorrect: "*Cold wind blows* Four chambers, dear student. The heart's architecture is more complex than you realize."
    }
  },
  {
    id: 3,
    question: "Which system, mortal, carries electrical messages throughout your living form?",
    options: ["Circulatory", "Respiratory", "Nervous", "Digestive"],
    correctAnswer: 2,
    spookyFeedback: {
      correct: "*Lightning flashes* Indeed! The nervous system—that supernatural network of electrical impulses! It fascinates me still, even in death...",
      incorrect: "*Thunder rumbles* The nervous system, my dear pupil. These electrical messages are what separate the living from those of us who have passed..."
    }
  },
  {
    id: 4,
    question: "What percentage of the body is composed of that vital fluid... water?",
    options: ["30-40%", "50-60%", "60-70%", "80-90%"],
    correctAnswer: 2,
    spookyFeedback: {
      correct: "*Specimen jars glow brighter* Marvelous! 60-70% water—we are but fluid beings in solid form. How I miss the sensation of hydration...",
      incorrect: "*Dusty anatomical charts rustle* The answer floats between 60-70%. Water—that which sustains life and escapes in death."
    }
  }
];

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    setIsAnswered(true);
    const isCorrect = selectedAnswer === question.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct!", {
        description: question.spookyFeedback.correct,
      });
    } else {
      toast.error("Incorrect...", {
        description: question.spookyFeedback.incorrect,
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = (score / quizQuestions.length) * 100;
    const passed = percentage >= 75;

    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto p-8 bg-card/50 backdrop-blur-sm border-toxic-green/30 shadow-[0_0_30px_rgba(42,157,143,0.2)] animate-scale-in text-center">
          <div className="mb-6">
            {passed ? (
              <Trophy className="w-20 h-20 text-toxic-green mx-auto animate-glow-pulse" />
            ) : (
              <Ghost className="w-20 h-20 text-blood-red mx-auto animate-ghost-float" />
            )}
          </div>

          <h2 className="text-4xl font-gothic font-bold text-foreground mb-4">
            {passed ? "You've Escaped!" : "Forever Trapped..."}
          </h2>

          <p className="text-xl text-muted-foreground font-serif mb-6">
            {passed 
              ? "*The laboratory doors creak open...* Impressive, mortal! You've proven your knowledge worthy."
              : "*Ghostly laughter echoes...* Not quite sufficient, dear student. You'll need more study in the crypt..."
            }
          </p>

          <div className="bg-muted/30 p-6 rounded-lg mb-6">
            <p className="text-5xl font-gothic font-bold text-toxic-green mb-2">
              {score} / {quizQuestions.length}
            </p>
            <p className="text-muted-foreground font-serif">
              {percentage}% Correct
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              variant="haunted" 
              size="lg" 
              onClick={resetQuiz}
              className="w-full font-gothic"
            >
              <Skull className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <p className="text-xs text-muted-foreground font-serif italic">
              *Dr. Cadaverson awaits your return...*
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-gothic font-bold text-toxic-green text-toxic">
              Tombstone Trials
            </h2>
            <div className="flex items-center gap-2">
              <Skull className="w-5 h-5 text-blood-red" />
              <span className="text-lg font-gothic font-bold text-foreground">
                {score} / {currentQuestion}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground font-serif mt-2">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur-sm border-toxic-green/30 shadow-[0_0_30px_rgba(42,157,143,0.2)] animate-scale-in">
          <div className="mb-8">
            <h3 className="text-2xl font-gothic font-bold text-foreground mb-4 leading-relaxed">
              {question.question}
            </h3>
            <p className="text-sm text-muted-foreground font-serif italic">
              *Select your answer, if you dare...*
            </p>
          </div>

          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            disabled={isAnswered}
            className="space-y-4"
          >
            {question.options.map((option, index) => {
              const isCorrect = index === question.correctAnswer;
              const isSelected = selectedAnswer === index;
              
              let borderColor = "border-border/50";
              if (isAnswered) {
                if (isCorrect) borderColor = "border-toxic-green";
                else if (isSelected) borderColor = "border-blood-red";
              }

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 ${borderColor} bg-muted/30 hover:bg-muted/50 transition-all duration-300 ${
                    !isAnswered ? 'cursor-pointer haunted-hover' : ''
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer font-serif text-base"
                  >
                    {option}
                  </Label>
                  {isAnswered && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-toxic-green animate-glow-pulse" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-blood-red animate-heartbeat" />
                  )}
                </div>
              );
            })}
          </RadioGroup>

          <div className="mt-8 flex justify-end">
            {!isAnswered ? (
              <Button
                variant="haunted"
                size="lg"
                onClick={handleAnswer}
                disabled={selectedAnswer === null}
                className="font-gothic"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                variant="ghostly"
                size="lg"
                onClick={handleNext}
                className="font-gothic"
              >
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
              </Button>
            )}
          </div>
        </Card>

        <Card className="mt-6 p-4 bg-card/30 backdrop-blur-sm border-blood-red/20 animate-fade-in">
          <p className="text-sm text-muted-foreground font-serif italic text-center">
            <Ghost className="w-4 h-4 inline mr-2 text-toxic-green" />
            Answer correctly to escape Dr. Cadaverson's eternal lessons...
          </p>
        </Card>
      </div>
    </div>
  );
};

export default QuizSection;
