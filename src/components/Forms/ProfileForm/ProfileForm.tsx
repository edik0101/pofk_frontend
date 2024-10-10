"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InfoIcon } from "lucide-react";
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
import PhoneInput from "../PhoneInput/PhoneInput";
import { User } from "@/types/types";

const schema = z.object({
  firstName: z.string().min(1, "Введите имя").optional(),
  lastName: z.string().min(1, "Введите фамилию").optional(),
  legalEntity: z.string().optional(),
  phone: z
    .string()
    .refine(
      (value) => !value.includes("_"),
      "Номер телефона введён некорректно. Пожалуйста, заполните все цифры.",
    )
    .optional(),
});

export default function ProfileForm() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth/user");
        const data: { data: User; success: boolean } = await res.json();
        if (data.success) {
          form.setValue("firstName", data.data.FirstName || "");
          form.setValue("lastName", data.data.LastName || "");
          form.setValue("legalEntity", data.data.CompanyName || "");
          form.setValue("phone", data.data.PhoneNumber?.toString() || "");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      legalEntity: "",
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
    // form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 max-w-screen-lg rounded-3xl bg-white px-6 py-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid-row-[auto] mx-auto grid w-full auto-rows-auto grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2">
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
                    <PhoneInput {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-6">
          <Button
            type="submit"
            variant="secondary"
            disabled={!form.formState.isDirty || !form.formState.isValid}
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
