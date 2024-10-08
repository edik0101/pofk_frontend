export enum PagesPaths {
  "register" = "register",
  "login" = "login",
  "reset-password" = "reset-password",
  "about-us" = "about-us",
  "user-agreement" = "user-agreement",
  "privacy-policy" = "privacy-policy",
  "legal-information" = "legal-information",
  "public-offer" = "public-offer",
  "articles-settings" = "articles",
  "access-settings" = "access",
  "personal-settings" = "profile",
  "journal" = "journal",
  "cost" = "cost",
  "self-purchase" = "self-purchase",
  "WB-financial-reports" = "WB-financial-reports",
  "dds" = "dds",
  "opiu" = "opiu",
  "abc" = "abc",
  "balance" = "balance",
  "order-report" = "order-report",
  "comparison" = "comparison",
  "data-input" = "data-input",
  "reports" = "reports",
}

export const PAGES_CONTACT_CARD = [
  {
    name: "Пользовательское соглашение",
    path: PagesPaths["user-agreement"],
  },
  {
    name: "Политика конфиденциальности",
    path: PagesPaths["privacy-policy"],
  },
  {
    name: "Юридическая информация",
    path: PagesPaths["legal-information"],
  },
  {
    name: "Публичная оферта",
    path: PagesPaths["public-offer"],
  },
];

export const PAGES_SETTINGS = [
  {
    name: "Настройки статей",
    path: PagesPaths["articles-settings"],
  },
  {
    name: "Настройки прав доступа",
    path: PagesPaths["access-settings"],
  },
];

export const PAGES_PROFILE = [
  {
    name: "Профиль",
    path: PagesPaths["personal-settings"],
  },
];

export const PAGES_DATA_INPUT = [
  {
    name: "Журнал операций",
    path: PagesPaths["journal"],
  },
  {
    name: "Себестоимость",
    path: PagesPaths["cost"],
  },
  {
    name: "Самовыкупы",
    path: PagesPaths["self-purchase"],
  },
  {
    name: "Финансовый отчет ВБ",
    path: PagesPaths["WB-financial-reports"],
  },
];

export const PAGES_REPORTS = [
  {
    name: "ДДС",
    path: PagesPaths["dds"],
  },
  {
    name: "ОПиУ",
    path: PagesPaths["opiu"],
  },
  {
    name: "АВС",
    path: PagesPaths["abc"],
  },
  {
    name: "Остатки",
    path: PagesPaths["balance"],
  },
  {
    name: "Отчет по заказам",
    path: PagesPaths["order-report"],
  },
  {
    name: "Сверка",
    path: PagesPaths["comparison"],
  },
];

export const PAGES_KNOWLEDGE = [
  {
    name: "Внесение данных",
    path: PagesPaths["data-input"],
  },
  {
    name: "Отчеты",
    path: PagesPaths["reports"],
  },
];

export const PAGES_HEADER = [
  {
    name: "Регистрация",
    path: PagesPaths["register"],
  },
  {
    name: "Вход",
    path: PagesPaths["login"],
  },
  {
    name: "О нас",
    path: PagesPaths["about-us"],
  },
];
export const PAGE_RESET = {
  name: "Сбросить пароль",
  path: PagesPaths["reset-password"],
};
