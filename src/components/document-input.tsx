/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import { Input, InputProps } from "./ui/input";
import { useEffect, useState } from "react";
import { applyDocumentMask } from "@/helpers/applyDocumentMask";

type TextInputProps = InputProps & {
  control: Control<any, any>;
  initialValue: string;
};

export function DocumentInput({
  initialValue,
  control,
  ...props
}: TextInputProps) {
  const [value, setValue] = useState<string>(applyDocumentMask(initialValue));

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    onChangeFn: (data: unknown) => void
  ) {
    const inputValue = e.target.value;
    const maskedValue = applyDocumentMask(inputValue);
    if (maskedValue.length <= 18) {
      setValue(maskedValue);
      onChangeFn(maskedValue.replace(/\D/g, ""));
    }
  }
  useEffect(() => {
    setValue(applyDocumentMask(initialValue));
  }, [initialValue]);

  return (
    <Controller
      control={control}
      name={props.name ?? ""}
      render={({ field }) => {
        return (
          <Input
            {...props}
            type="text"
            {...field}

            onBlur={(e) => {
              field.onBlur();
              if(props.onBlur) props.onBlur(e)
            }}
            onChange={(ev) => {
              handleChange(ev, field.onChange);
            }}
            value={value}
          />
        );
      }}
    />
  );
}
