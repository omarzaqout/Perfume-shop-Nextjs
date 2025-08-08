"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ICategory } from "@/interfaces";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { brandFormSchema, productFormSchema } from "@/schema";
import Spinner from "./spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createProductActions } from "@/actions/product.action";
import { createBrandActions } from "@/actions/brand.action";

const AddBrandForm = ({ userId }: { userId: string | "" }) => {
  const [loading, setLoading] = useState(false);
  const [Isclose, setIsclose] = useState(false);

  console.log("User ID:", userId);

  const form = useForm({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: "",
      logoUrl: undefined,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof brandFormSchema>
  ): Promise<void> => {
    console.log("Form submitted", values);
    setLoading(true);

    try {
      await createBrandActions({
        name: values.name,
        logoUrl: values.logoUrl,
        ownerId: userId,
      });

      console.log("Form submitted successfully");
      setIsclose(false);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const nn = () => {
    console.log("nn called");
  };

  return (
    <Dialog open={Isclose} onOpenChange={setIsclose}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center">
          <Plus className="mr-2" />
          Add Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Brand</DialogTitle>
          <DialogDescription>Add Brand</DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto scroll-hide">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/logo.png"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner /> Saving...
                  </>
                ) : (
                  "Save ✅"
                )}
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBrandForm;
