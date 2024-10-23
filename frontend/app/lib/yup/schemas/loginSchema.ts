import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup.string().email().required("O campo email é obrigatório"),
    password: yup
      .string()
      .required("O campo senha é obrigatório")
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
  })
  .required();

export type LoginSchemaType = yup.InferType<typeof loginSchema>;
