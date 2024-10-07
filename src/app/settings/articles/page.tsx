"use client";

import Heading from "@/components/Heading/Heading";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import Section from "./Section/Section";
import { BUTTONS, ButtonsValues } from "./data/buttons";
import {
  initialAccountBalances,
  initialAccountBalancesColumns,
} from "./data/tempData";
import { Button } from "@/components/ui/button";
import DatePickerForm from "./DatePickerForm/DatePickerForm";

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
        defaultValue={ButtonsValues.initialAccountBalances}
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
        {activeButton === ButtonsValues.initialAccountBalances && (
          <Section
            title="Начальные остатки на счетах"
            data={initialAccountBalances}
            columnsHeaders={initialAccountBalancesColumns}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <DatePickerForm />
              <Button
                variant="outline"
                className="h-12 rounded-3xl border border-black bg-transparent px-8 text-base"
              >
                Добавить остатки
              </Button>
            </div>
          </Section>
        )}
        {activeButton === ButtonsValues.cashFlowCategories && (
          <Section title="Список категорий ДДС" data={[]} />
        )}
        {activeButton === ButtonsValues.directionsList && (
          <Section title="Настройка направлений" data={[]} />
        )}
        {activeButton === ButtonsValues.profitLossCategories && (
          <Section title="-" data={[]} />
        )}
        {activeButton === ButtonsValues.contractorList && (
          <Section title="Список контрагентов" data={[]} />
        )}
        {activeButton === ButtonsValues.autoSettings && (
          <Section title="Автонастройки" data={[]} />
        )}
      </div>
    </div>
  );
}
