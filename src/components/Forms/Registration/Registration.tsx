"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { PagesPaths } from "@/data/pages";

const baseSchema = {
  firstName: z.string().min(1, "Введите имя"),
  lastName: z.string().min(1, "Введите фамилию"),
  legalEntity: z.string().optional(),
  phone: z.string().optional(),
  APIkey: z.string().optional(),
  email: z.string().email("Адрес электронной почты введён некорректно"),
};

// const formSchemaProfile = z.object({
//   clientID: z.string().optional(),
//   ...baseSchema,
// });

const formSchema = z.object({
  ...baseSchema,
  password: z.string(),
  confirmPassword: z.string(),
});

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      legalEntity: "",
      phone: "",
      APIkey: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 max-w-screen-lg rounded-3xl bg-white px-6 py-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="mb-8">* – обязательные поля для заполнения</p>
        <div className="grid-row-[auto] mx-auto grid w-full auto-rows-auto grid-cols-1 gap-6 md:grid-flow-col-dense md:grid-cols-2 md:grid-rows-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                  <FormLabel className="text-base">Имя*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Иван"
                      required
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
                  <FormLabel className="text-base">Фамилия*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Иванов"
                      required
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
                      required
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
                      required
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
            name="APIkey"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                  <FormLabel className="text-base">
                    API-ключ статический
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000000000000000000"
                      required
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                  <FormLabel className="text-base">
                    Электронная почта для логина*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.ru"
                      required
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
            name="password"
            render={({ field }) => (
              <FormItem className="relative flex h-min items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                <FormLabel className="text-base">Пароль*</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="*****"
                    required
                    className="mt-0 max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                    style={{ marginTop: "0" }}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -top-1/4 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative flex h-min items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                <FormLabel className="text-base">Подтвердите пароль*</FormLabel>
                <FormControl>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="*****"
                    required
                    className="mt-0 max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                    style={{ marginTop: "0" }}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -top-1/4 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-5 flex items-center space-x-2">
          <Checkbox
            id="terms"
            className="size-6 rounded-lg border border-gray-200"
          />
          <label htmlFor="terms" className="text-base font-light">
            Согласен с{" "}
            <Link href={PagesPaths["privacy-policy"]} className="text-primary">
              Политикой конфиденциальности
            </Link>{" "}
            персональных данных
          </label>
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
            {"Зарегистрироваться и войти"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
