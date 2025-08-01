export interface CompanySearch {
  currency: string
  exchangeFullName: string
  name: string
  stockExchange: string
  symbol: string
}

export interface CompanyProfile {
  symbol: string
  price: number
  beta: number
  volAvg: number
  mktCap: number
  lastDiv: number
  range: string
  changes: number
  companyName: string
  currency: string
  cik: string
  isin: string
  exchange: string
  exchangeShortName: string
  industry: string
  website: string
  description: string
  ceo: string
  sector: string
  counter: string
  fullTimeEmployees: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  dcfDiff: number
  dcf: number
  image: string
  ipoDate: string
  defaultImage: boolean
  isEtf: boolean
  isActivelyTrading: boolean
  isAdr: boolean
  isFund: boolean
}

export interface CompanyKeyRatios {
  dividendYielTTM: number
  dividendYielPercentageTTM: number
  peRatioTTM: number
  pegRatioTTM: number
  payoutRatioTTM: number
  currentRatioTTM: number
  quickRatioTTM: number
  cashRatioTTM: number
  daysOfSalesOutstandingTTM: number
  daysOfInventoryOutstandingTTM: number
  operatingCycleTTM: number
  daysOfPayablesOutstandingTTM: number
  cashConversionCycleTTM: number
  grossProfitMarginTTM: number
  operatingProfitMarginTTM: number
  pretaxProfitMarginTTM: number
  netProfitMarginTTM: number
  effectiveTaxRateTTM: number
  returnOnAssetsTTM: number
  returnOnEquityTTM: number
  returnOnCapitalEmployedTTM: number
  netIncomePerEBTTTM: number
  ebtPerEbitTTM: number
  ebitPerRevenueTTM: number
  debtRatioTTM: number
  debtEquityRatioTTM: number
  longTermDebtToCapitalizationTTM: number
  totalDebtToCapitalizationTTM: number
  interestCoverageTTM: number
  cashFlowToDebtRatioTTM: number
  companyEquityMultiplierTTM: number
  receivablesTurnoverTTM: number
  payablesTurnoverTTM: number
  inventoryTurnoverTTM: number
  fixedAssetTurnoverTTM: number
  assetTurnoverTTM: number
  operatingCashFlowPerShareTTM: number
  freeCashFlowPerShareTTM: number
  cashPerShareTTM: number
  operatingCashFlowSalesRatioTTM: number
  freeCashFlowOperatingCashFlowRatioTTM: number
  cashFlowCoverageRatiosTTM: number
  shortTermCoverageRatiosTTM: number
  capitalExpenditureCoverageRatioTTM: number
  dividendPaidAndCapexCoverageRatioTTM: number
  priceBookValueRatioTTM: number
  priceToBookRatioTTM: number
  priceToSalesRatioTTM: number
  priceEarningsRatioTTM: number
  priceToFreeCashFlowsRatioTTM: number
  priceToOperatingCashFlowsRatioTTM: number
  priceCashFlowRatioTTM: number
  priceEarningsToGrowthRatioTTM: number
  priceSalesRatioTTM: number
  dividendYieldTTM: number
  enterpriseValueMultipleTTM: number
  priceFairValueTTM: number
  dividendPerShareTTM: number
}

export interface CompanyIncomeStatement {
  date: string
  symbol: string
  reportedCurrency: string
  cik: string
  fillingDate: string
  acceptedDate: string
  calendarYear: string
  period: string
  revenue: number
  costOfRevenue: number
  grossProfit: number
  grossProfitRatio: number
  researchAndDevelopmentExpenses: number
  generalAndAdministrativeExpenses: number
  sellingAndMarketingExpenses: number
  sellingGeneralAndAdministrativeExpenses: number
  otherExpenses: number
  operatingExpenses: number
  costAndExpenses: number
  interestIncome: number
  interestExpense: number
  depreciationAndAmortization: number
  ebitda: number
  ebitdaratio: number
  operatingIncome: number
  operatingIncomeRatio: number
  totalOtherIncomeExpensesNet: number
  incomeBeforeTax: number
  incomeBeforeTaxRatio: number
  incomeTaxExpense: number
  netIncome: number
  netIncomeRatio: number
  eps: number
  epsdiluted: number
  weightedAverageShsOut: number
  weightedAverageShsOutDil: number
  link: string
  finalLink: string
}

export interface CompanyBalanceSheet {
  date: string
  symbol: string
  reportedCurrency: string
  cik: string
  fillingDate: string
  acceptedDate: string
  calendarYear: string
  period: string
  cashAndCashEquivalents: number
  shortTermInvestments: number
  cashAndShortTermInvestments: number
  netReceivables: number
  inventory: number
  otherCurrentAssets: number
  totalCurrentAssets: number
  propertyPlantEquipmentNet: number
  goodwill: number
  intangibleAssets: number
  goodwillAndIntangibleAssets: number
  longTermInvestments: number
  taxAssets: number
  otherNonCurrentAssets: number
  totalNonCurrentAssets: number
  otherAssets: number
  totalAssets: number
  accountPayables: number
  shortTermDebt: number
  taxPayables: number
  deferredRevenue: number
  otherCurrentLiabilities: number
  totalCurrentLiabilities: number
  longTermDebt: number
  deferredRevenueNonCurrent: number
  deferredTaxLiabilitiesNonCurrent: number
  otherNonCurrentLiabilities: number
  totalNonCurrentLiabilities: number
  otherLiabilities: number
  capitalLeaseObligations: number
  totalLiabilities: number
  preferredStock: number
  commonStock: number
  retainedEarnings: number
  accumulatedOtherComprehensiveIncomeLoss: number
  othertotalStockholdersEquity: number
  totalStockholdersEquity: number
  totalEquity: number
  totalLiabilitiesAndStockholdersEquity: number
  minorityInterest: number
  totalLiabilitiesAndTotalEquity: number
  totalInvestments: number
  totalDebt: number
  netDebt: number
  link: string
  finalLink: string
}

export interface CompanyCashFlow {
  date: string
  symbol: string
  reportedCurrency: string
  cik: string
  fillingDate: string
  acceptedDate: string
  calendarYear: string
  period: string
  netIncome: number
  depreciationAndAmortization: number
  deferredIncomeTax: number
  stockBasedCompensation: number
  changeInWorkingCapital: number
  accountsReceivables: number
  inventory: number
  accountsPayables: number
  otherWorkingCapital: number
  otherNonCashItems: number
  netCashProvidedByOperatingActivities: number
  investmentsInPropertyPlantAndEquipment: number
  acquisitionsNet: number
  purchasesOfInvestments: number
  salesMaturitiesOfInvestments: number
  otherInvestingActivites: number
  netCashUsedForInvestingActivites: number
  debtRepayment: number
  commonStockIssued: number
  commonStockRepurchased: number
  dividendsPaid: number
  otherFinancingActivites: number
  netCashUsedProvidedByFinancingActivities: number
  effectOfForexChangesOnCash: number
  netChangeInCash: number
  cashAtEndOfPeriod: number
  cashAtBeginningOfPeriod: number
  operatingCashFlow: number
  capitalExpenditure: number
  freeCashFlow: number
  link: string
  finalLink: string
}
