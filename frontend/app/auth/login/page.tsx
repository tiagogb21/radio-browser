'use client'

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, type LoginSchemaType } from "@/libs/yup/schemas/loginSchema";
import { FormInput } from "@/components/common/FormInput";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="login-form-email"
        label="Email"
        type="email"
        placeholder="Digite seu email..."
        register={{ ...register("email") }}
        errors={errors.email?.message}
      />

      <FormInput
        id="login-form-password"
        label="Senha"
        type="password"
        placeholder="Digite sua senha..."
        register={{ ...register("password") }}
        errors={errors.password?.message}
      />

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Entrar
      </button>
    </form>
  );
}
