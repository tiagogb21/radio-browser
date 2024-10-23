import React, { InputHTMLAttributes } from "react";

interface FormInputProp extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    errors?: string;
    register: object;
}

export const FormInput = ({
    id,
    label,
    type = "text",
    errors,
    register,
}: FormInputProp) => {
    return (
        <div className="flex flex-col">
            <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                type={type}
                className="border-gray-300 text-sm rounded-lg block p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                id={id}
                {...register}
            />
            <p className="text-xs text-red-400 mt-2">
                {errors as string}
            </p>
        </div>
    );
};
