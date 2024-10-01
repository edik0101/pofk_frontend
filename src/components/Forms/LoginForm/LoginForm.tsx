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
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Адрес электронной почты введён некорректно"),
  password: z.string(),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className="mt-2 flex flex-col items-center gap-[13px] rounded-3xl bg-white py-[68px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-baseline gap-6 rounded-2xl border p-[3px] pl-3.5">
                <FormLabel className="text-base">Почта</FormLabel>
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
            <FormItem className="relative flex items-baseline gap-6 rounded-2xl border p-[3px] pl-3.5">
              <FormLabel className="text-base">Пароль</FormLabel>
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
                className="absolute -top-1.5 right-0 h-full px-3 py-2 hover:bg-transparent"
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
