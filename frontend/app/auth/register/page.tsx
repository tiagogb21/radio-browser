'use client'

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "@/components/common/FormInput";
import { registerSchema, type RegisterSchemaType } from "@/libs/yup/schemas/registerSchema";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="register-form-name"
        label="Nome"
        placeholder="Digite seu nome..."
        register={{ ...register("name") }}
        errors={errors.name?.message}
      />

      <FormInput
        id="register-form-email"
        label="Email"
        type="email"
        placeholder="Digite seu email..."
        register={{ ...register("email") }}
        errors={errors.email?.message}
      />

      <FormInput
        id="register-form-password"
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
