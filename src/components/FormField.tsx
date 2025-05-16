import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  FormField as FormFieldComponent,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormFieldProps = {
  name: string;
  label: string;
  placeholder: string;
};

export const FormField = ({ name, label, placeholder }: FormFieldProps) => {
  const form = useFormContext();

  return (
    <FormFieldComponent
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Input placeholder={placeholder} {...field} className="w-96" />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
