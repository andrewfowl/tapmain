export type Sub = { id: string; title: string; items: string[] }
export type Group = { id: string; num: string; title: string; blurb: string; subs: Sub[] }
export type Reminder = { h: string; d: string }

export const DOMAINS = [
  "Revenue recognition", "Cost capitalization", "Financing", "Treasury",
  "Financial reporting", "Blockchain data integrity", "Tax",
  "Digital asset custody", "Internal controls",
]

export const REMINDERS: Reminder[] = [
  { h: "Responsibility", d: "Management is ultimately responsible for the financial statements and must ensure accuracy and completeness." },
  { h: "Alternative services", d: "Consider whether a full audit is necessary at your stage — a review, compilation, or agreed-upon procedures may suffice." },
  { h: "Culture", d: "Avoid \"opinion shopping.\" Maintain integrity, transparency, and realistic expectations over a \"fake it till you make it\" culture." },
  { h: "Auditor selection", d: "Engage firms with a proven track record. Beware firms whose past clients were later required to undergo re-audits." },
  { h: "Processes", d: "Define key processes, including fraud-risk procedures. Your team must understand the frameworks to oversee service providers." },
  { h: "Internal controls", d: "Run a monthly Budget vs. Actual process and understand complementary user-entity controls for your service organizations." },
  { h: "Team size", d: "A dedicated accounting team is essential — ideally three+ people in payment processes for proper segregation of duties." },
]

export const GROUPS: Group[] = [
  {
    id: "income", num: "01", title: "Income",
    blurb: "Revenue recognition under ASC 606 and receivables hygiene.",
    subs: [
      {
        id: "revenue", title: "Revenue Recognition",
        items: [
          "Does the company have documentation of its accounting treatment of all significant revenue streams, including how the 5-step ASC 606 model applies in each case?",
          "Does the company use separate accounts to hold and operate assets custodied on behalf of third parties?",
          "Does the company appropriately classify funding received from community grants as revenue, liabilities, or debt instruments as applicable?",
          "Does the company have a memo explaining the accounting treatment of revenue amounts paid to other parties (e.g. for staking revenue: community taxes withheld, validator commission for delegators, or delegator rewards for validators)?",
          "Does the company accrue its staking rewards earned but unpaid at month-end? If not, is there a memo explaining how this treatment is consistent with US GAAP?",
          "Does the company consider whether any amounts paid to customers are properly classified as expenses or a reduction in revenues?",
          "If following US GAAP, has management determined the fair value measurement date for noncash consideration as the contract inception date (not the asset receipt date)?",
          "Does the company have a process for accounting for revenue from milestone-based arrangements?",
          "Does the company have a process for prospective and cumulative catch-up adjustments to account for contract modifications?",
          "Does the entity maintain supporting documentation for customer incentives and rebate payments?",
        ],
      },
      {
        id: "ar", title: "Accounts Receivable",
        items: [
          "Does the organization have an accounts receivable open-item management process in place?",
          "Does the organization assess the credit loss allowance on its financial assets at the end of each reporting period?",
          "Does the organization have a process to ensure appropriate offsetting of customer receivables and amounts due to customers when required (e.g. AR and prepayments for the same contract / performance obligation)?",
          "Does the organization have a process for recognizing embedded derivatives related to receivables/payables denominated in digital assets, accounted for as indefinite-lived intangibles or cryptoassets?",
        ],
      },
    ],
  },
  {
    id: "expenses", num: "02", title: "Expenses",
    blurb: "Capitalization, payables, compensation, and tax processes.",
    subs: [
      {
        id: "capitalized", title: "Capitalized Costs",
        items: [
          "Does the organization capitalize software development costs when required by US GAAP?",
          "Does the organization appropriately consider guidance on recognition of research & development (R&D) costs when applicable?",
          "Does the organization have a monthly process for calculating and recording periodic amortization expense?",
          "Does the organization review impairment indicators for long-lived assets, goodwill, and intangibles (including capitalized software costs)?",
          "Does the organization prepare monthly schedules of additions & disposals of assets created through capitalization of costs?",
        ],
      },
      {
        id: "ap", title: "Accounts Payable",
        items: [
          "Does the organization have a process for identifying and measuring expenses as incurred (rather than billed or paid), and recognizing unbilled amounts as accrued expenses?",
          "Does the organization have a process for cut-off analysis of expenses and revenue near period-end to ensure recording in the appropriate reporting periods?",
        ],
      },
      {
        id: "prepaid", title: "Prepaid Expenses",
        items: [
          "Does your organization have a process to ensure prepaid expenses are appropriately deferred?",
          "Do you have a process to ensure deferred prepaid expenses are amortized appropriately?",
          "Do you have a process to ensure deferred prepaid expenses are removed from the schedule in a timely manner once fully expensed?",
        ],
      },
      {
        id: "compensation", title: "Compensation",
        items: [
          "Does the organization have a process to recognize the costs of accrued time-off (vacation) in accordance with company policy?",
          "If an unlimited vacation policy was introduced, did it consider state and foreign law provisions (e.g. accrued time off in California cannot be forfeited and must remain a liability until paid)?",
        ],
      },
      {
        id: "stockcomp", title: "Stock Compensation",
        items: [
          "Does the company allocate stock-based compensation costs by business department and other features used to classify the cash portion of compensation for the same employees?",
          "Do you review secondary-market transactions in the company's stock to ensure excess consideration over fair value is accounted for as compensation cost unless clearly unrelated to services?",
          "Does the organization appropriately record stock awards, with income-tax withholdings made as required by law?",
          "Does the company account for stock award forfeitures as they occur or via estimates as allowed by ASC 718-10-35-3?",
          "If awards were modified, did the entity accelerate expense recognition for the previous award where required?",
          "Does the company have a documented position on the establishment of award dates for financial reporting?",
          "Does the company recognize the full expense for all vested awards when the vesting date precedes the end of tranche amortization?",
          "Does the company use the appropriate valuation methodology to measure stock awards?",
          "Did the company develop the volatility assumption using the appropriate peer group and time horizon?",
        ],
      },
      {
        id: "tokencomp", title: "Token Compensation",
        items: [
          "Does the company measure the fair value of token compensation liabilities considering legal/technological restrictions in effect on the measurement date (only those characterizing the unit of account)?",
          "Does the company recognize the embedded derivatives on token compensation liabilities?",
          "Does the company recognize expenses related to each tranche of the award in appropriate time periods?",
          "Does the company have a process to withhold and remit taxes due on payments to employees under token compensation plans?",
        ],
      },
      {
        id: "taxes", title: "Taxes",
        items: [
          "Does the organization have a process for identifying and tracking temporary tax differences by jurisdiction and source?",
          "Does the organization have a process to track changes in tax law?",
          "Does your organization have a process for establishing and settling sales-tax obligations in all relevant jurisdictions?",
          "Does your organization have a process to identify uncertain tax positions and assess associated reserve requirements?",
          "Does the organization have a process for withholding income tax on token distributions made to employees and others (when applicable)?",
          "Does the organization have robust support documentation for R&D tax credits (when claimed)?",
          "Does the organization have transfer pricing documentation for relevant transactions?",
          "Does the entity have a written accountable plan in place?",
        ],
      },
    ],
  },
  {
    id: "controls", num: "03", title: "Internal Controls",
    blurb: "Budgeting, segregation of duties, key management, and SOC reports.",
    subs: [
      {
        id: "controls-sub", title: "Internal Controls",
        items: [
          "Does your organization have a budgeting process (cash-flow forecasts, annual budgets, 2-3 year medium-term budgets, budget vs. actual variance analysis, going-concern evaluations)?",
          "Does the company update its valuation at least annually?",
          "Does your organization have a periodic risk-assessment process with formal documentation of identified risks and responses?",
          "Does your team understand that materiality may change in each reporting period?",
          "Does the organization have a list of standard monitoring activities consistently executed each period?",
          "Does the organization have appropriate segregation of duties and effective mitigating controls where sufficient segregation does not exist?",
          "How do you ensure information produced by the entity and used in control operations is complete and accurate?",
          "Does your organization have controls to support the completeness and accuracy of blockchain data used for accounting purposes?",
          "Are accounting policies in place for all relevant process areas?",
          "Does your team consistently account for similar events and objects (e.g. a reference list of pricing data sources for routinely operated assets)?",
          "Does the organization maintain a list of peer companies and periodically evaluate its performance against them?",
          "Does your team have a formal list of non-GAAP accounting policy conventions, with an annual assessment of each item?",
          "Has the company created formal process documentation, including narratives and risk control matrices, for all processes relevant to financial reporting?",
          "Does the company have a centralized library and unified document retrieval system covering all accounting-related documentation?",
          "Does the company's personnel follow a \"document everything\" mindset?",
          "Does the entity have a transaction-value threshold requiring Board pre-approval?",
          "Do policies require the Board to authorize significant related-party transactions?",
          "Does the organization have a conflicts-of-interest policy?",
          "Has your executive team entered into indemnification agreements with the company without board approval?",
          "Have there been corrected or uncorrected material misstatements the board is not aware of?",
          "Have you incurred losses from a cybersecurity incident not disclosed to the board and investors?",
          "Can your CEO or CFO unilaterally authorize payments exceeding 5% of company assets?",
          "Can the CEO or CFO independently send a payment to an external party without second-person approval?",
          "Has the organization granted mid-term salary increases not tied to company performance?",
          "Have you made one-time payments to executive team members holding more than 1% of company stock without formal board review and approval?",
          "Have you made distributions or compensatory payments to only a portion of investors within the same class?",
          "Does the entity invest its funds directly in equity of other startups without a professional asset manager?",
          "Do you distribute tokens to external addresses without KYC documentation?",
          "Do you hold custody of funds belonging to customers or third parties, including initial token allocations for the ecosystem?",
          "Do you have advisory arrangements involving significant equity or cash payments without verifiable documentation of the work performed?",
          "Were payments to terminated employees documented and consistent with market norms? Is your cap table complete, accurate, and up to date?",
          "Do you have a process to ensure payments match contracted terms and do not exceed agreed amounts?",
          "Do you maintain a single register of all approved wallets to which funds may be transferred?",
          "Do you have a process for withholding taxes on token-based compensation distributed to employees?",
          "Do you have controls over marketing spending that ensure only agreed and justifiable expenses are paid?",
          "Are formal communication channels established for litigation/claims/assessments, known or alleged financial-reporting fraud or asset misappropriations, and suspected noncompliance with laws and regulations?",
          "Does the organization have a private-key generation ceremony and controls providing reasonable assurance the key was not revealed to unauthorized parties?",
          "Does the organization have controls to prevent keys from being lost or erased?",
          "Does the organization obtain and read SOC reports for service organizations, ensuring complementary end-user entity controls are implemented and tested, deficiencies are addressed, and subservice organizations are covered?",
          "Does your organization document how information flows across all relevant systems (crypto subledger, blockchain extraction tools, ERP, CRM, HRMS, consolidation/reporting, and internal/external integrations)?",
          "Does the organization have a robust process for extracting, transforming, and loading blockchain data for financial reporting?",
        ],
      },
    ],
  },
  {
    id: "financing", num: "04", title: "Financing",
    blurb: "Equity, debt, leases under ASC 842, and token issuance.",
    subs: [
      {
        id: "equity", title: "Equity",
        items: [
          "Did the organization determine the appropriate classification of preferred stock issued (debt vs. equity)?",
          "Did the organization repurchase any of its own stock, and if so, were the shares cancelled or retained in treasury stock?",
          "Did the organization evaluate the impact of repurchasing activity on the liability vs. equity classification of stock-based compensation?",
          "Does the organization have any outstanding stock warrants?",
          "Did the organization evaluate the classification of amounts associated with issued SAFEs (Simple Agreements for Future Equity)?",
        ],
      },
      {
        id: "debt", title: "Debt",
        items: [
          "Does the organization have a process to regularly update balances of current portions of long-term debt and other liabilities?",
          "Does the organization have a clear policy on the accounting treatment of crypto borrowings (if applicable)?",
          "Does the organization appropriately classify and present its convertible debt outstanding?",
          "Did the organization evaluate whether any issued instruments must be presented as temporary equity (applies to public companies only)?",
        ],
      },
      {
        id: "leases", title: "Leases",
        items: [
          "Does your organization have a complete lease inventory to ensure all leases are classified and recognized under ASC 842?",
          "Does your organization have a process for identifying and assessing embedded leases?",
          "Does your organization prepare and reconcile a lease roll-forward schedule at least quarterly?",
        ],
      },
      {
        id: "token-issuance", title: "Token Issuance",
        items: [
          "Does the organization expense all token development costs for internally created indefinite-lived intangibles as required by FASB ASC 350-30-25-3?",
          "Does management have a legal opinion on the nature of tokens, rights conveyed, and whether such tokens are considered securities?",
          "Did management document which entity is the legal issuer of tokens and whether that entity is an affiliate of the reporting entity?",
          "Does management use different wallets for staking rewards on delegated token allocations to separately track zero-cost-basis tokens vs. tokens with a cost basis from contract-inception fair value?",
        ],
      },
    ],
  },
  {
    id: "treasury", num: "05", title: "Treasury",
    blurb: "Digital asset custody, cash, investments, and M&A.",
    subs: [
      {
        id: "digital-assets", title: "Digital Assets",
        items: [
          "Has the organization implemented a cost-basis tracking methodology compliant with US GAAP (historical cost for cryptoassets under ASC 350-60 vs. impaired historical cost for indefinite-lived intangibles)?",
          "Does the organization have any plug activity items in the digital asset roll-forward? If so, how does management validate the related amount?",
          "Does the organization have custody of third-party funds? If so, did management consider whether such assets and obligations to return them are recognized on the balance sheet?",
          "Are any third-party (including customer-owned) funds commingled with the company's funds?",
          "Does the organization's policy determine the fair value of tokens, including adjustments to principal market prices when necessary?",
          "Does the organization conduct a full inventory of its digital assets at least annually, or have a compensating process (e.g. perpetual counts)?",
        ],
      },
      {
        id: "cash", title: "Cash & Cash Equivalents",
        items: [
          "Does your organization have a formal process for monthly bank statement reconciliation with a set due date?",
          "Has the organization defined a policy for instruments classified as cash equivalents?",
        ],
      },
      {
        id: "investments", title: "Investments",
        items: [
          "Are there Variable Interest Entities (VIEs) involved, and if so, have you evaluated whether consolidation is required?",
          "For transactions with consolidated subsidiaries, VIEs, or equity-method investees, do you have a process to eliminate unrealized intercompany profit/(loss)?",
          "Does the company have a process for requesting updated financial results and valuations from all investees at least annually?",
          "Does the organization have a process for accounting of equity securities, including investees without readily determinable fair value?",
          "Does the company ensure all investees meeting the definition of an affiliate are included in the related-parties list?",
          "Does the organization track open positions in liquidity pools and account for impairment when applicable?",
          "Does the organization have a process to account for investments in token warrant agreements?",
          "Does the organization have a process for SAFTs (Simple Agreements for Future Tokens) to ensure embedded derivatives are accounted for after listing?",
        ],
      },
      {
        id: "ma", title: "M&A",
        items: [
          "Does the acquired entity use accrual or cash accounting? If cash, new accrual processes will likely be needed.",
          "Does the acquired entity follow the policies of the parent entity?",
          "Is the level of detail of the acquiree's trial balance sufficient for the parent's reporting purposes?",
          "Has management created a mapping between the subsidiary's chart of accounts and the consolidated financial statement line items?",
        ],
      },
    ],
  },
  {
    id: "reporting", num: "06", title: "Reporting",
    blurb: "Presentation policy and the final review / tie-out process.",
    subs: [
      {
        id: "presentation", title: "Presentation",
        items: [
          "Does the organization have a process to periodically re-evaluate the functional currency, as required by US GAAP?",
          "Does the organization have a process to periodically evaluate its going-concern assumption?",
          "Does the entity present digital assets due from exchanges as part of digital assets or as digital asset receivables?",
          "Does the entity have a policy on classifying digital assets and cryptoassets as current vs. noncurrent on its balance sheet?",
          "Is there a defined cash-flow statement presentation of proceeds from sales and purchases of cryptoassets?",
        ],
      },
      {
        id: "review-sub", title: "Review",
        items: [
          "Does your organization have a formal tie-out process in place for financial statements?",
          "Do you conduct benchmark analysis of financial statements and performance against peer companies?",
          "Does your organization complete the disclosure checklist for each set of financial statements prior to issuance?",
        ],
      },
    ],
  },
]
