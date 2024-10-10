"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { login } from "@/lib/login";

const formSchema = z.object({
  email: z.string().trim().email("Адрес электронной почты введён некорректно"),
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
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await login(values.email, values.password);
      if (data.success) {
        router.push("/settings/profile");
        form.reset();
      } else {
        console.error("Login failed: ", data.message);
        toast.error("Ошибка логина: ", { description: data.message });
      }
    } catch (error: unknown) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      toast.error("Ошибка логина");
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col items-center gap-[13px] rounded-3xl bg-white py-[68px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-80 items-baseline gap-6 rounded-2xl border p-[3px] max-sm:flex-wrap">
                <FormLabel className="pl-3.5 text-base">Почта</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@mail.ru"
                    required
                    className="mt-0 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
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
              <div className="relative flex w-80 items-baseline gap-6 rounded-2xl border p-[3px] max-sm:flex-wrap">
                <FormLabel className="pl-3.5 text-base">Пароль</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="*****"
                    required
                    className="mt-0 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                    style={{ marginTop: "0" }}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-6 h-full px-2 py-1.5 hover:bg-transparent sm:-top-0.5"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-6 w-6 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-6 w-6 text-gray-500" />
                  )}
                </Button>
              </div>
              <FormMessage className="max-w-80 text-wrap" />
            </FormItem>
          )}
        />
        <div className="mb-5 flex items-center space-x-2">
          <Checkbox
            id="terms"
            className="size-6 rounded-lg border border-gray-200"
          />
          <label htmlFor="terms" className="text-base font-light">
            Запомнить меня
          </label>
        </div>
        <div className="flex gap-6">
          <Button
            type="submit"
            variant="secondary"
            disabled={
              !!(form.formState.errors.email || form.formState.errors.password)
            }
            className="rounded-3xl px-8 py-5 text-white"
          >
            Войти
          </Button>
          <Link
            href="/reset-password"
            className="group flex items-center gap-2"
            prefetch={false}
          >
            <Image
              src="/icons/key_icon.svg"
              alt="key icon"
              width={30}
              height={30}
              className="size-[30px] group-hover:opacity-80"
            />
            <span className="inline-block max-w-24 text-sm leading-none group-hover:underline">
              Восстановить логин/пароль
            </span>
          </Link>
        </div>
      </form>
    </Form>
  );
}
