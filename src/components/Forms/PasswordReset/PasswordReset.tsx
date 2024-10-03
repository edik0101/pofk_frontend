"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Адрес электронной почты введён некорректно"),
});

export default function PasswordReset() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 max-w-screen-sm rounded-3xl bg-white px-6 py-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="mb-6">Новый пароль будет отправлен на указанную почту</p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-baseline justify-between gap-6 rounded-2xl border p-[3px] pl-3.5">
                <FormLabel className="text-base">Почта</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="mt-0 max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-4 text-base text-gray-800"
                    placeholder="example@mail.ru"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={
            form.formState.isValidating ||
            form.formState.isSubmitting ||
            !form.formState.isValid
          }
          className="mt-5 rounded-3xl px-8 py-5 text-white"
        >
          Сбросить пароль
        </Button>
      </form>
    </Form>
  );
}
