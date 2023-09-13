"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Enter a valid email.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
  password: z.string(),
});

export function RegisterUser() {
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();

    console.log("Success:", values);
    const { email, password } = values;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: "admin",
        }),
      });

      console.log("API response:", res);
      if (res.status === 201) {
        toast({
          title: "New User Registered Sucessfully",
        });
      }

      if (res.status === 500) {
        toast({
          title: res.statusText,
          variant: "destructive",
        });
      }

      // res.status === 201 &&
      // 	router.push('/dashboard/login?success=Account has been created');
    } catch (err) {
      // setError(err);
      console.log(err);
      toast({
        title: "Error",
        variant: "destructive",
      });
    }
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <Input placeholder="user@missglobal.com" {...field} />
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
              <FormLabel className="text-base">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="default" size={"full"} type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}
