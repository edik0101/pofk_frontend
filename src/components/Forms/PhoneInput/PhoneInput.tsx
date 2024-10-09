"use client";

import { forwardRef } from "react";
import MaskedInput from "react-text-mask";

const PhoneInput = forwardRef<HTMLInputElement>(({ ...props }, ref) => {
  return (
    <MaskedInput
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ]}
      placeholder="(000) 000-00-00"
      ref={ref as React.LegacyRef<MaskedInput> | undefined}
      className="mt-0 w-full max-w-80 rounded-2xl border-none bg-gray-100 px-5 py-1 text-base text-gray-800"
      {...props}
    />
  );
});
PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
