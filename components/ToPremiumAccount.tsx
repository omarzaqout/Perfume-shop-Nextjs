"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { premiumAccountFormSchema } from "@/schema";
import Spinner from "./spinner";
import { addPrimumAccountAction } from "@/actions/user.action";

const AddPremiumAccount = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [Isclose, setIsclose] = useState(false);

  const form = useForm({
    resolver: zodResolver(premiumAccountFormSchema),
    defaultValues: {
      storeName: "",
      description: "",
      Phone: undefined,
      address: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (
    values: z.infer<typeof premiumAccountFormSchema>
  ): Promise<void> => {
    setLoading(true);

    try {
      console.log("Submitting values:", values);
      const response = await addPrimumAccountAction({
        userId,
        storeName: values.storeName,
        description: values.description,
        phone: values.Phone,
        address: values.address,
      });

      if (!response.success) {
        alert(response.message);
        return;
      }

      alert(response.message);
      setIsclose(false);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إرسال الطلب.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={Isclose} onOpenChange={setIsclose}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center">
          <Plus className="mr-2" />
          Add Premium Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Add Product</DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto scroll-hide">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Store name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Numper</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        placeholder="Phone Number"
                        value={
                          field.value === undefined || field.value === null
                            ? ""
                            : String(field.value)
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? undefined : Number(val));
                        }}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
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

export default AddPremiumAccount;
