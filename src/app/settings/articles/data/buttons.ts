export enum ButtonsValues {
  periodStart = "periodStart",
  initialAccountBalances = "initialAccountBalances",
  cashFlowCategories = "cashFlowCategories",
  directionsList = "directionsList",
  profitLossCategories = "profitLossCategories",
  contractorList = "contractorList",
  autoSettings = "autoSettings",
  employeeList = "employeeList",
}

export const BUTTONS = [
  {
    id: 1,
    value: ButtonsValues.periodStart,
    buttonName: "Начало периода",
  },
  {
    id: 2,
    value: ButtonsValues.initialAccountBalances,
    buttonName: "Начальные остатки на счетах",
  },
  {
    id: 3,
    value: ButtonsValues.cashFlowCategories,
    buttonName: "Список категорий ДДС",
  },
  {
    id: 4,
    value: ButtonsValues.directionsList,
    buttonName: "Список направлений",
  },
  {
    id: 5,
    value: ButtonsValues.profitLossCategories,
    buttonName: "Список категорий ОПиУ",
  },
  {
    id: 6,
    value: ButtonsValues.contractorList,
    buttonName: "Список контрагентов",
  },
  {
    id: 7,
    value: ButtonsValues.autoSettings,
    buttonName: "Автонастройки",
  },
  {
    id: 8,
    value: ButtonsValues.employeeList,
    buttonName: "Список сотрудников",
  },
];
