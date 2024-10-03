"use client";

import Heading from "@/components/Heading/Heading";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

enum ButtonsValues {
  periodStart = "periodStart",
  initialAccountBalances = "initialAccountBalances",
  cashFlowCategories = "cashFlowCategories",
  directionsList = "directionsList",
  profitLossCategories = "profitLossCategories",
  contractorList = "contractorList",
  autoSettings = "autoSettings",
  employeeList = "employeeList",
}

const BUTTONS = [
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

export default function ArticlesSettings() {
  const [activeButton, setActiveButton] = useState<ButtonsValues>(
    BUTTONS[0].value,
  );

  const handleButtonClick = (value: ButtonsValues) => {
    setActiveButton(value);
  };

  return (
    <div>
      <Heading text="Настройка статей" />
      <RadioGroup
        defaultValue={ButtonsValues.periodStart}
        onValueChange={handleButtonClick}
        className="flex flex-wrap items-center gap-2.5"
      >
        {BUTTONS.map((button) => (
          <div
            key={button.id}
            onClick={() => handleButtonClick(button.value)}
            className={`${activeButton === button.value ? "text-primary shadow-lg" : ""} flex cursor-pointer items-center space-x-2 rounded-3xl bg-white px-7 py-5`}
          >
            <RadioGroupItem
              value={button.value}
              id={button.value}
              checked={activeButton === button.value}
              className={activeButton === button.value ? "" : "hidden"}
            />
            <Label htmlFor={button.value} className="cursor-pointer">
              {button.buttonName}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="mt-12">
        {activeButton === ButtonsValues.periodStart && (
          <>
            <Heading text="-" headingLvl={3} />
            <p>periodStart</p>
          </>
        )}
        {activeButton === ButtonsValues.initialAccountBalances && (
          <>
            <Heading text="Начальные остатки на счетах" headingLvl={3} />
            <p>periodStart</p>
          </>
        )}
        {activeButton === ButtonsValues.cashFlowCategories && (
          <>
            <Heading text="Список категорий ДДС" headingLvl={3} />
            <p>periodStart</p>
          </>
        )}
        {activeButton === ButtonsValues.directionsList && (
          <>
            <Heading text="Настройка направлений" headingLvl={3} />
            <p>periodStart</p>
          </>
        )}
        {activeButton === ButtonsValues.profitLossCategories && (
          <>
            <Heading text="-" headingLvl={3} />
            <p>periodStart</p>
          </>
        )}
        {activeButton === ButtonsValues.contractorList && (
          <>
            <Heading text="Список контрагентов" headingLvl={3} />
            <p>periodStart</p>
          </>
        )}
        {activeButton === ButtonsValues.employeeList && (
          <>
            <Heading text="Список сотрудников" headingLvl={3} />
            <p>periodStart</p>
          </>
        )}
        {activeButton === ButtonsValues.autoSettings && (
          <>
            <Heading text="Автонастройки" headingLvl={3} />
            <p>periodStart</p>
          </>
        )}
      </div>
    </div>
  );
}
