"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { PagesPaths } from "@/data/pages";
import PhoneInput from "../PhoneInput/PhoneInput";
import { transformPhoneNumber } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { login } from "@/lib/login";

const formSchema = z
  .object({
    firstName: z.string().min(1, "Введите имя"),
    lastName: z.string().min(1, "Введите фамилию"),
    legalEntity: z.string().optional(),
    phone: z.string().min(14, { message: "Введите телефон" }),
    email: z.string().email("Адрес электронной почты введён некорректно"),
    password: z
      .string()
      .trim()
      .min(6, "Минимальная длина пароля 6 символов")
      .max(20, "Максимальная длина пароля 20 символов")
      .refine((value) => /[a-z]/.test(value), {
        message: "Пароль должен содержать хотя бы одну строчную букву",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      })
      .refine((value) => /\d/.test(value), {
        message: "Пароль должен содержать хотя бы одну цифру",
      })
      .refine((value) => /[!@#$%^&*()_+[\]{};':",.<>?\\\/]/.test(value), {
        message: "Пароль должен содержать хотя бы один спецсимвол",
      }),
    confirmPassword: z.string(),
    policy: z.literal<boolean>(true, {
      errorMap: () => ({
        message: "Вы должны согласиться с политикой конфиденциальности",
      }),
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword && confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
      });
    }
  });

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      legalEntity: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      policy: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/auth/registration", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          companyName: values.legalEntity,
          phoneNumber: transformPhoneNumber(values.phone),
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success) {
        const loginData = await login(values.email, values.password);
        if (!loginData.success) {
          throw new Error("Ошибка: ", data.message);
        }
        router.push("/profile");
        form.reset();
      } else {
        console.error("Ошибка регистрации: ", data.message);
        toast.error("Ошибка регистрации: ", { description: data.message });
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      toast.error("Ошибка логина");
    }
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
                  <FormLabel className="text-base">Телефон*</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
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
                <div className="flex items-center justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                  <FormLabel className="text-base">
                    Электронная почта для логина*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.ru"
                      required
                      type="email"
                      className="mt-0 h-full max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
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
              <FormItem>
                <div className="relative flex h-min items-center justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
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
                    className="absolute -top-1 right-0 h-full px-2 py-1.5 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="relative flex h-min items-center justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                  <FormLabel className="text-base">
                    Подтвердите пароль*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="*****"
                      required
                      className="mt-0 h-full max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                      style={{ marginTop: "0" }}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-1 right-0 h-full px-2 py-1.5 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="policy"
          render={({ field }) => (
            <FormItem>
              <div className="mb-5 flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    className="size-6 rounded-lg border border-gray-200"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label className="text-base font-light">
                  Согласен с{" "}
                  <Link
                    href={PagesPaths["privacy-policy"]}
                    className="text-primary"
                  >
                    Политикой конфиденциальности
                  </Link>{" "}
                  персональных данных
                </Label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-6">
          <Button
            type="submit"
            variant="secondary"
            disabled={!form.formState.isDirty || !form.formState.isValid}
            className="mt-6 h-14 rounded-3xl px-8 text-white"
          >
            {"Зарегистрироваться и войти"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
