/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import { Input, InputProps } from "./ui/input";
import { useEffect, useState } from "react";

type TextInputProps = InputProps & {
  control: Control<any, any>;
  initialValue: number;
};

export function NumberInput({
  initialValue,
  control,
  ...props
}: TextInputProps) {
  const [value, setValue] = useState<string>(`${initialValue}`);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    onChangeFn: (data: unknown) => void
  ) {
    const inputValue = e.target.value?.replace(".", ",");
    const regex = /^\d*,?\d{0,2}$/;
    if (regex.test(inputValue)) {
      setValue(inputValue);
      onChangeFn(Number(inputValue));
    }
  }

  useEffect(() => {
    setValue(`${initialValue}`);
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
              if (props.onBlur) {
                props.onBlur(e);
              }
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
