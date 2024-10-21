import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup.string().required("O campo nome é obrigatório"),
    email: yup.string().email().required("O campo email é obrigatório"),
    password: yup
      .string()
      .required("O campo senha é obrigatório")
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
  })
  .required();

  export type RegisterSchemaType = yup.InferType<typeof registerSchema>;
