"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Check, AlertTriangle, AlertCircle, HelpCircle, Calendar, Mail, Loader2, ChevronDown } from "lucide-react"
import Link from "next/link"
import { captureAssessmentLead } from "@/actions/lead-capture-actions"

type Answer = "yes" | "no" | "not-applicable" | "do-not-know" | null

interface Question {
  id: string
  text: string
  severity: "high" | "medium"
  category: string
  glossaryTerms?: string[]
  riskOn: "yes" | "no"
}

const questions: Question[] = [
  // Governance and Board Oversight
  {
    id: "gov-1",
    text: "Do you have a threshold above which management is required to obtain board approval for transactions?",
    severity: "high",
    category: "Governance and Board Oversight",
    riskOn: "no",
  },
  {
    id: "gov-2",
    text: "Are significant related party transactions authorized by the board?",
    severity: "high",
    category: "Governance and Board Oversight",
    riskOn: "no",
  },
  {
    id: "gov-3",
    text: "Do you have a process in place to manage conflicts of interest?",
    severity: "high",
    category: "Governance and Board Oversight",
    riskOn: "no",
  },
  {
    id: "gov-4",
    text: "Has your executive team entered into indemnification agreements with the company without board approval?",
    severity: "high",
    category: "Governance and Board Oversight",
    riskOn: "yes",
  },
  {
    id: "gov-5",
    text: "Have you incurred losses from a cybersecurity incident that were not disclosed to the board and investors?",
    severity: "high",
    category: "Governance and Board Oversight",
    riskOn: "yes",
  },
  {
    id: "gov-6",
    text: "Have you had any known corrected or uncorrected material misstatements in your financials that the board is not aware of?",
    severity: "high",
    category: "Governance and Board Oversight",
    riskOn: "yes",
  },
  {
    id: "gov-7",
    text: "Do you have independent directors on your board?",
    severity: "medium",
    category: "Governance and Board Oversight",
    riskOn: "no",
  },

  // Financial Controls and Disbursement Authority
  {
    id: "fin-1",
    text: "Do you have a process to ensure payments match contracted terms and do not exceed agreed amounts?",
    severity: "high",
    category: "Financial Controls and Disbursement Authority",
    riskOn: "no",
  },
  {
    id: "fin-2",
    text: "Can your CEO or CFO unilaterally authorize and approve payments that exceed 5% of the company's assets?",
    severity: "high",
    category: "Financial Controls and Disbursement Authority",
    riskOn: "yes",
  },
  {
    id: "fin-3",
    text: "Do you have advisory arrangements involving significant equity or cash payments for which you do not receive verifiable documentation detailing the scope and extent of work performed?",
    severity: "high",
    category: "Financial Controls and Disbursement Authority",
    riskOn: "yes",
  },
  {
    id: "fin-4",
    text: "Can the CEO or CFO independently prepare and send a payment to an external party without a second-person approval?",
    severity: "high",
    category: "Financial Controls and Disbursement Authority",
    riskOn: "yes",
  },
  {
    id: "fin-5",
    text: "Do you maintain a single register of all approved wallets to which funds may be transferred?",
    severity: "medium",
    category: "Financial Controls and Disbursement Authority",
    riskOn: "no",
  },
  {
    id: "fin-6",
    text: "Do you have a written, accountable plan in place?",
    severity: "medium",
    category: "Financial Controls and Disbursement Authority",
    riskOn: "no",
  },
  {
    id: "fin-7",
    text: "Do you maintain supporting documentation for customer incentives and rebate payments?",
    severity: "medium",
    category: "Financial Controls and Disbursement Authority",
    riskOn: "no",
  },
  {
    id: "fin-8",
    text: "Do you have controls over marketing spending that ensure only agreed charges and justifiable expenses are paid?",
    severity: "medium",
    category: "Financial Controls and Disbursement Authority",
    riskOn: "no",
  },

  // HR and Compensation
  {
    id: "hr-1",
    text: "Do you make mid-term salary increases not tied to company performance?",
    severity: "medium",
    category: "HR and Compensation",
    riskOn: "yes",
  },
  {
    id: "hr-2",
    text: "Have you ever made one-time payments to executive team members holding more than 1% of company stock without formal board review and approval?",
    severity: "high",
    category: "HR and Compensation",
    riskOn: "yes",
  },
  {
    id: "hr-3",
    text: "Were payments to terminated employees documented and justifiable relative to market norms?",
    severity: "medium",
    category: "HR and Compensation",
    riskOn: "no",
  },

  // Capitalization and Investor Relations
  {
    id: "cap-1",
    text: "Is your capitalization table complete, accurate, and up to date?",
    severity: "high",
    category: "Capitalization and Investor Relations",
    riskOn: "no",
  },
  {
    id: "cap-2",
    text: "Have you made distributions or compensatory payments to only a portion of investors within the same class?",
    severity: "high",
    category: "Capitalization and Investor Relations",
    riskOn: "yes",
  },
  {
    id: "cap-3",
    text: "Do you invest company funds directly in equity of other startups without a professional asset manager?",
    severity: "medium",
    category: "Treasury and Investments",
    riskOn: "yes",
  },

  // Crypto and Token Operations
  {
    id: "crypto-1",
    text: "Do you distribute tokens to external addresses without KYC documentation?",
    severity: "high",
    category: "Crypto and Token Operations",
    riskOn: "yes",
  },
  {
    id: "crypto-2",
    text: "Do you hold custody of funds belonging to customers or other third parties, including initial token allocations for the ecosystem?",
    severity: "high",
    category: "Crypto and Token Operations",
    riskOn: "yes",
  },

  // Tax Compliance
  {
    id: "tax-1",
    text: "Do you understand the concept of a significant uncertain tax position, and do you have fewer than three such positions outstanding?",
    severity: "medium",
    category: "Tax Compliance",
    riskOn: "no",
  },
  {
    id: "tax-2",
    text: "Do you have a process for withholding taxes on token-based compensation distributed to employees?",
    severity: "high",
    category: "Crypto and Token Operations",
    riskOn: "no",
  },
]

const glossary: Record<string, string> = {
  "Related Party Transaction":
    "A business deal between two parties who have a pre-existing relationship, such as between a company and its executives.",
  "Revenue Recognition":
    "The accounting principle that determines when revenue should be recorded in financial statements.",
  GAAP: "Generally Accepted Accounting Principles - the standard accounting framework used in the United States.",
  IFRS: "International Financial Reporting Standards - the global accounting framework used in many countries outside the US.",
  "Segregation of Duties":
    "An internal control that distributes critical functions among different employees to reduce risk of error or fraud.",
}

interface RiskAssessmentProps {
  onClose?: () => void
}

export function RiskAssessment({ onClose }: RiskAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [showResults, setShowResults] = useState(false)
  const [showGlossary, setShowGlossary] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [phone, setPhone] = useState("")
  const [acceptCommunications, setAcceptCommunications] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const isComplete = currentQuestionIndex >= questions.length - 1 && answers[currentQuestion?.id]

  const handleAnswer = (answer: Answer) => {
    if (!currentQuestion) return

    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1)
      }, 300)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmittingEmail(true)

    const result = await captureAssessmentLead({
      email,
      full_name: fullName || undefined,
      company_name: companyName || undefined,
      phone: phone || undefined,
      source: "Interactive Audit Readiness Assessment",
    })

    if (!result.success) {
      console.error("[v0] Failed to capture lead:", result.error)
    }

    setIsSubmittingEmail(false)
    setEmailSubmitted(true)
    setShowResults(true)
  }

  const calculateRiskScore = () => {
    let riskPoints = 0
    let totalPoints = 0

    questions.forEach((q) => {
      const answer = answers[q.id]
      const points = q.severity === "high" ? 10 : 5
      totalPoints += points

      if (answer === "do-not-know") {
        riskPoints += points * 0.5
      } else if (q.riskOn === "yes" && answer === "yes") {
        riskPoints += points
      } else if (q.riskOn === "no" && answer === "no") {
        riskPoints += points
      } else if (answer === "not-applicable") {
        totalPoints -= points
      }
    })

    if (totalPoints === 0) return 0
    return Math.round((1 - riskPoints / totalPoints) * 100)
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: "Low", color: "text-green-400", bg: "bg-green-400/20" }
    if (score >= 60) return { level: "Moderate", color: "text-yellow-400", bg: "bg-yellow-400/20" }
    if (score >= 40) return { level: "Elevated", color: "text-orange-400", bg: "bg-orange-400/20" }
    return { level: "High", color: "text-red-400", bg: "bg-red-400/20" }
  }

  const getCategories = () => {
    const categories: Record<string, { total: number; risk: number }> = {}

    questions.forEach((q) => {
      if (!categories[q.category]) {
        categories[q.category] = { total: 0, risk: 0 }
      }
      categories[q.category].total++

      const answer = answers[q.id]
      if (answer === "do-not-know") {
        categories[q.category].risk += 0.5
      } else if (q.riskOn === "yes" && answer === "yes") {
        categories[q.category].risk++
      } else if (q.riskOn === "no" && answer === "no") {
        categories[q.category].risk++
      }
    })

    return categories
  }

  const isRiskyAnswer = (question: Question, answer: Answer): boolean => {
    if (answer === "do-not-know") return true
    if (question.riskOn === "yes" && answer === "yes") return true
    if (question.riskOn === "no" && answer === "no") return true
    return false
  }

  const getCategoryQuestions = (category: string) => {
    return questions.filter((q) => q.category === category)
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  // Email capture screen
  if (isComplete && !emailSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">Assessment Complete</h2>
          <p className="text-white/60 mb-8">
            Enter your details to receive your personalized risk assessment results and recommendations.
          </p>
          <form onSubmit={handleEmailSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-sm text-white/60 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corporation"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
              />
            </div>
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="acceptCommunications"
                checked={acceptCommunications}
                onChange={(e) => setAcceptCommunications(e.target.checked)}
                required
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-white focus:ring-white/30"
              />
              <label htmlFor="acceptCommunications" className="text-sm text-white/60">
                I agree to receive communications about services and updates from TechAccountingPro{" "}
                <span className="text-red-400">*</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmittingEmail || !email || !acceptCommunications}
              className="w-full px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isSubmittingEmail ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "View My Results"
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Results screen
  if (showResults) {
    const score = calculateRiskScore()
    const risk = getRiskLevel(score)
    const categories = getCategories()

    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">Assessment Complete</h2>
          </div>

          <div className={cn("rounded-2xl p-8 mb-6", risk.bg)}>
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-2">{score}%</div>
              <div className={cn("text-xl font-medium", risk.color)}>{risk.level} Risk Level</div>
            </div>
          </div>

          <div className="text-center mb-8">
            <Link
              href="https://cal.com/andrew-belonogov/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Book a Meeting to Discuss Results
            </Link>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-medium text-white">Risk by Category</h3>
            {Object.entries(categories)
              .filter(([_, data]) => {
                const categoryRiskPercent = Math.round((data.risk / data.total) * 100)
                return categoryRiskPercent > 0
              })
              .map(([category, data]) => {
                const categoryScore = Math.round((1 - data.risk / data.total) * 100)
                const categoryRiskPercent = Math.round((data.risk / data.total) * 100)
                const isHighRisk = categoryRiskPercent > 50
                const isMediumRisk = categoryRiskPercent > 25 && categoryRiskPercent <= 50
                const categoryQuestions = getCategoryQuestions(category)
                const isExpanded = expandedCategories[category]

                return (
                  <div key={category} className="bg-white/5 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/80 text-left">{category}</span>
                          <div className="flex items-center gap-2">
                            <span
                              className={
                                isHighRisk ? "text-red-400" : isMediumRisk ? "text-orange-400" : "text-green-400"
                              }
                            >
                              {categoryRiskPercent}% risk
                            </span>
                            <ChevronDown
                              className={cn("w-5 h-5 text-white/60 transition-transform", isExpanded && "rotate-180")}
                            />
                          </div>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              isHighRisk ? "bg-red-400" : isMediumRisk ? "bg-orange-400" : "bg-green-400",
                            )}
                            style={{ width: `${categoryRiskPercent}%` }}
                          />
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-white/10">
                        <div className="pt-4 space-y-3">
                          {categoryQuestions.map((q) => {
                            const answer = answers[q.id]
                            const isRisky = isRiskyAnswer(q, answer)
                            const answerLabel =
                              answer === "yes"
                                ? "Yes"
                                : answer === "no"
                                  ? "No"
                                  : answer === "not-applicable"
                                    ? "N/A"
                                    : answer === "do-not-know"
                                      ? "Don't Know"
                                      : "Not answered"

                            return (
                              <div
                                key={q.id}
                                className={cn(
                                  "p-3 rounded-lg border-l-4",
                                  isRisky ? "bg-red-400/10 border-red-400" : "bg-green-400/10 border-green-400",
                                )}
                              >
                                <div className="flex justify-between items-start gap-4">
                                  <p className="text-white/70 text-sm flex-1">{q.text}</p>
                                  <span
                                    className={cn(
                                      "text-sm font-medium whitespace-nowrap",
                                      isRisky ? "text-red-400" : "text-green-400",
                                    )}
                                  >
                                    {answerLabel}
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-medium text-white mb-4">Recommendations</h3>
            <ul className="space-y-3 text-white/70">
              {score < 80 && (
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Consider implementing stronger internal controls and governance policies.</span>
                </li>
              )}
              {score < 60 && (
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Review your financial controls and disbursement authority processes.</span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Schedule a consultation with our team for a detailed assessment and action plan.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Close Assessment
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Questions screen
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Category */}
        <div className="text-white/40 text-sm mb-4">{currentQuestion?.category}</div>

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">{currentQuestion?.text}</h2>

          {/* Glossary terms */}
          {currentQuestion?.glossaryTerms && (
            <div className="flex flex-wrap gap-2 mb-8">
              {currentQuestion.glossaryTerms.map((term) => (
                <button
                  key={term}
                  onClick={() => setShowGlossary(showGlossary === term ? null : term)}
                  className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  {term}
                </button>
              ))}
            </div>
          )}

          {/* Glossary popup */}
          {showGlossary && glossary[showGlossary] && (
            <div className="bg-white/10 rounded-xl p-4 mb-8">
              <div className="font-medium text-white mb-2">{showGlossary}</div>
              <div className="text-white/70 text-sm">{glossary[showGlossary]}</div>
            </div>
          )}

          {/* Answer buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "yes", label: "Yes", icon: Check },
              { value: "no", label: "No", icon: AlertTriangle },
              { value: "not-applicable", label: "N/A", icon: null },
              { value: "do-not-know", label: "Don't Know", icon: HelpCircle },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleAnswer(value as Answer)}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2",
                  answers[currentQuestion?.id] === value
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20",
                )}
              >
                {Icon && <Icon className="w-5 h-5" />}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {isComplete && (
            <button
              onClick={() => setEmailSubmitted(false)}
              className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              View Results
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
