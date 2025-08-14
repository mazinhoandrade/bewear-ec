"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    name: z
      .string({ message: "Name is invalid" })
      .trim()
      .min(1, { message: "Name is required" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string("Confirm password is required")
      .min(8, "Password must be at least 8 characters"),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      error: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: FormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Crie uma conta para continuar.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="digite sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="digite sua senha novamente"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button type="submit">Criar conta</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignUp;
