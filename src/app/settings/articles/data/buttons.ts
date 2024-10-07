export enum ButtonsValues {
  initialAccountBalances = "initialAccountBalances",
  cashFlowCategories = "cashFlowCategories",
  directionsList = "directionsList",
  profitLossCategories = "profitLossCategories",
  contractorList = "contractorList",
  autoSettings = "autoSettings",
}

export const BUTTONS = [
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
];
