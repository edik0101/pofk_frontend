"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InfoIcon, X } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(1, "Введите имя").optional(),
  lastName: z.string().min(1, "Введите фамилию").optional(),
  legalEntity: z.string().optional(),
  phone: z.string().optional(),
  apiData: z
    .array(
      z.object({
        apiKey: z.string().min(1, "API-ключ обязателен"),
        clientID: z.string().optional(),
      }),
    )
    .optional(),
});

export default function ProfileForm() {
  const [apiData, setApiData] = useState([{ apiKey: "", clientID: "" }]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      legalEntity: "",
      phone: "",
      apiData: [{ apiKey: "", clientID: "" }],
    },
  });

  const handleAddApiData = () => {
    setApiData([...apiData, { apiKey: "", clientID: "" }]);
  };

  const handleRemoveApiData = (index: number) => {
    const updatedApiData = apiData.filter((_, i) => i !== index);
    setApiData(updatedApiData);
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 max-w-screen-lg rounded-3xl bg-white px-6 py-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid-row-[auto] mx-auto grid w-full auto-rows-auto grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                  <FormLabel className="text-base">Имя</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Иван"
                      className="mt-0 max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                      style={{ marginTop: "0" }}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                  <FormLabel className="text-base">Фамилия</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Иванов"
                      className="mt-0 max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                      style={{ marginTop: "0" }}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="legalEntity"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                  <FormLabel className="text-base">Юр.лицо</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ИП Иванов И.И."
                      className="mt-0 max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                      style={{ marginTop: "0" }}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                  <FormLabel className="text-base">Телефон</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+7 (000) 000-00-00"
                      className="mt-0 max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                      style={{ marginTop: "0" }}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {apiData.map((data, index) => (
            <div
              key={index}
              className="col-span-2 flex items-center justify-between gap-4"
            >
              <FormField
                control={form.control}
                name={`apiData.${index}.apiKey`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                      <FormLabel className="text-base">
                        API-ключ статический {index + 1}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="000000000000000000"
                          className="mt-0 max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                          style={{ marginTop: "0" }}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`apiData.${index}.clientID`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                      <FormLabel className="text-base">
                        ID клиента (опционально)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ID клиента"
                          className="mt-0 max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                          style={{ marginTop: "0" }}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                onClick={() => handleRemoveApiData(index)}
                className="h-10 w-max"
              >
                <X className="" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={handleAddApiData}
            className="h-10"
          >
            Добавить новый API-ключ
          </Button>
        </div>

        <div className="flex gap-6">
          <Button
            type="submit"
            variant="secondary"
            disabled={
              form.formState.isValidating ||
              form.formState.isSubmitting ||
              !form.formState.isValid
            }
            className="mt-6 h-14 rounded-3xl px-8 text-white"
          >
            {"Сохранить изменения"}
          </Button>
        </div>
        <div className="mt-3 flex items-center gap-3.5">
          <div className="flex h-[53px] items-center justify-center rounded-3xl bg-gray-100 px-[15px]">
            <InfoIcon fill="#287EFF" className="text-gray-100" />
          </div>
          <div>
            Для смены логина/пароля обратитесь в тех. поддержку{" "}
            <a
              href="mailto:pf1@werthebest.ru"
              className="font-bold text-primary underline"
            >
              pf1@werthebest.ru
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
}
