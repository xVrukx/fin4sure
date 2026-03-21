export const LOAN_PRODUCTS = [
  {
    id: "home-loan",
    name: "Home Loan",
    description: "Affordable home loans with competitive interest rates.",
    longDescription:
      "Home loans help you purchase or construct your dream home with flexible repayment options and competitive interest rates.",

    overview: {
      intro:
        "Home loans are designed to help individuals purchase, construct, or renovate their dream home.",
      description:
        "With long repayment tenures, tax benefits, and competitive interest rates, home loans offer a reliable financing solution for property ownership.",
      points: [
        "Purchase a new home",
        "Construct or renovate property",
        "Enjoy tax benefits",
        "Flexible repayment options",
      ],
    },

    features: [
      "Low interest rates",
      "Long repayment tenure",
      "High loan amount eligibility",
      "Tax benefits under applicable laws",
    ],

    eligibility: [
      "Salaried or self-employed individuals",
      "Stable income source",
      "Good credit score (650+)",
      "Valid property documents",
    ],

    documents: [
      {
        title: "Identity Proof",
        items: ["PAN Card", "Aadhaar Card", "Passport", "Driving License"],
      },
      {
        title: "Address Proof",
        items: ["Electricity Bill", "Aadhaar Card", "Passport"],
      },
      {
        title: "Income Proof",
        items: ["Salary Slips", "Bank Statements", "ITR"],
      },
      {
        title: "Property Documents",
        items: ["Sale Agreement", "Property Papers"],
      },
    ],
  },

  {
    id: "loan-against-property",
    name: "Loan Against Property",
    description: "Unlock the value of your property for large funding needs.",
    longDescription:
      "Leverage your residential or commercial property to raise funds at lower interest rates.",

    overview: {
      intro:
        "Loan Against Property allows you to unlock the value of your owned property.",
      description:
        "It offers high loan amounts at lower interest rates compared to unsecured loans, making it ideal for large financial needs.",
      points: [
        "High loan value against property",
        "Lower interest rates",
        "Flexible usage of funds",
        "Long repayment tenure",
      ],
    },

    features: [
      "High loan amount",
      "Lower interest rates",
      "Long tenure",
      "Multi-purpose usage",
    ],

    eligibility: [
      "Property ownership",
      "Stable income",
      "Good repayment history",
    ],

    documents: [
      {
        title: "Identity Proof",
        items: ["PAN Card", "Aadhaar Card"],
      },
      {
        title: "Income Proof",
        items: ["Bank Statements", "ITR"],
      },
      {
        title: "Property Documents",
        items: ["Ownership Papers", "Registry Documents"],
      },
    ],
  },

  {
    id: "personal-loan",
    name: "Personal Loan",
    description: "Instant personal loans for your everyday needs.",
    longDescription:
      "Personal loans are unsecured loans designed for urgent financial needs.",

    overview: {
      intro:
        "Personal loans provide instant access to funds without any collateral.",
      description:
        "These loans are ideal for emergencies, travel, weddings, and other personal expenses with quick approval and minimal documentation.",
      points: [
        "Debt consolidation",
        "Medical emergencies",
        "Travel & lifestyle expenses",
        "Wedding and personal needs",
      ],
    },

    features: [
      "No collateral required",
      "Quick approval",
      "Flexible usage",
      "Minimal documentation",
    ],

    eligibility: [
      "Salaried or self-employed individuals",
      "Minimum income criteria",
      "Good credit score (650+)",
    ],

    documents: [
      {
        title: "Identity Proof",
        items: ["PAN Card", "Aadhaar Card", "Passport"],
      },
      {
        title: "Address Proof",
        items: ["Electricity Bill", "Aadhaar Card"],
      },
      {
        title: "Income Proof",
        items: ["Salary Slips", "Bank Statements"],
      },
      {
        title: "Employment Proof",
        items: ["Company ID", "Offer Letter"],
      },
    ],
  },

  {
    id: "business-loan",
    name: "Business Loan",
    description: "Fuel your business growth with flexible financing.",
    longDescription:
      "Business loans provide working capital and expansion funding.",

    overview: {
      intro:
        "Business loans help enterprises manage operations and expand efficiently.",
      description:
        "They provide funding for working capital, expansion, and inventory with flexible repayment options.",
      points: [
        "Expand business operations",
        "Manage working capital",
        "Purchase inventory",
        "Upgrade infrastructure",
      ],
    },

    features: [
      "Quick disbursal",
      "Flexible repayment",
      "High funding",
      "Minimal collateral",
    ],

    eligibility: [
      "Registered business",
      "Minimum 1-2 years operation",
      "Stable revenue",
    ],

    documents: [
      {
        title: "Business Proof",
        items: ["GST Certificate", "Business Registration"],
      },
      {
        title: "Income Proof",
        items: ["ITR", "Bank Statements"],
      },
      {
        title: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"],
      },
    ],
  },

  {
    id: "car-loan",
    name: "Car Loan",
    description: "Drive your dream car with easy EMI options.",
    longDescription:
      "Car loans help you purchase vehicles with affordable EMIs.",

    overview: {
      intro:
        "Car loans make it easy to own your dream vehicle without financial stress.",
      description:
        "With flexible EMI options and quick approvals, you can purchase new or used cars conveniently.",
      points: [
        "Buy new or used vehicles",
        "Affordable EMI options",
        "Quick loan approval",
        "Flexible repayment tenure",
      ],
    },

    features: [
      "Up to 100% funding",
      "Flexible tenure",
      "Quick approval",
      "Low processing fee",
    ],

    eligibility: [
      "Stable income",
      "Valid ID proof",
      "Good credit score",
    ],

    documents: [
      {
        title: "Identity Proof",
        items: ["PAN Card", "Aadhaar Card"],
      },
      {
        title: "Income Proof",
        items: ["Salary Slips", "Bank Statements"],
      },
      {
        title: "Vehicle Details",
        items: ["Dealer quotation"],
      },
    ],
  },

  {
    id: "education-loan",
    name: "Education Loan",
    description: "Invest in your future with education financing.",
    longDescription:
      "Education loans cover tuition fees and study-related costs.",

    overview: {
      intro:
        "Education loans support students in achieving their academic goals.",
      description:
        "They cover tuition fees, living expenses, and other academic costs for domestic and international education.",
      points: [
        "Fund higher education",
        "Cover tuition and living costs",
        "Moratorium period available",
        "Flexible repayment after course",
      ],
    },

    features: [
      "Low interest rates",
      "Moratorium period",
      "Covers abroad studies",
      "Flexible repayment",
    ],

    eligibility: [
      "Confirmed admission",
      "Co-applicant required",
      "Academic merit",
    ],

    documents: [
      {
        title: "Admission Proof",
        items: ["Offer Letter", "Admission Letter"],
      },
      {
        title: "Identity Proof",
        items: ["PAN Card", "Aadhaar Card"],
      },
      {
        title: "Income Proof",
        items: ["ITR", "Salary Slips"],
      },
    ],
  },

  {
    id: "gold-loan",
    name: "Gold Loan",
    description: "Quick funds using your gold as security.",
    longDescription:
      "Gold loans provide instant funds by pledging gold.",

    overview: {
      intro:
        "Gold loans offer quick access to funds by pledging gold ornaments.",
      description:
        "They are one of the fastest ways to get liquidity with minimal documentation.",
      points: [
        "Instant loan approval",
        "Low interest rates",
        "Minimal documentation",
        "Flexible repayment",
      ],
    },

    features: [
      "Fast disbursal",
      "Minimal documentation",
      "Low interest rates",
      "Flexible tenure",
    ],

    eligibility: [
      "Ownership of gold",
      "Valid ID proof",
    ],

    documents: [
      {
        title: "Identity Proof",
        items: ["PAN Card", "Aadhaar Card"],
      },
      {
        title: "Gold Ownership",
        items: ["Gold ornaments"],
      },
    ],
  },

  {
    id: "working-capital",
    name: "Working Capital Loans",
    description: "Maintain cash flow for smooth operations.",
    longDescription:
      "Helps businesses manage daily operational expenses.",

    overview: {
      intro:
        "Working capital loans help businesses maintain smooth operations.",
      description:
        "They are ideal for managing day-to-day expenses like salaries, inventory, and vendor payments.",
      points: [
        "Manage cash flow",
        "Pay salaries and vendors",
        "Maintain inventory",
        "Short-term funding",
      ],
    },

    features: [
      "Short-term funding",
      "Quick approval",
      "Flexible repayment",
    ],

    eligibility: [
      "Operational business",
      "Minimum turnover",
    ],

    documents: [
      {
        title: "Business Proof",
        items: ["GST", "Registration"],
      },
      {
        title: "Bank Statements",
        items: ["Last 6 months"],
      },
    ],
  },
];

export const BANK_RATES = [
  { name: "HDFC Bank", rate: 8.5 },
  { name: "SBI", rate: 8.25 },
  { name: "ICICI Bank", rate: 8.6 },
];