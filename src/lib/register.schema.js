import * as z from "zod";
export const RegisterSchema = z.object({
     name: z.string().nonempty('This Faild id required').min(2, 'Min length is 2 char').max(10, 'Max length is 10 chars'),
     email: z.string().nonempty('This Field is required').email('Not Valid Email'),
     password: z.string().nonempty('This Feield is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
     rePassword: z.string().nonempty('This Feield is required'),
     gender: z.enum(['female', 'male']),
     dateOfBirth: z.coerce.string().nonempty('Date of birth is required'),
}).superRefine((data, ctx) => {
     if (data.password && data.rePassword && data.password !== data.rePassword) {
          ctx.addIssue({
               path: ["rePassword"],
               message: "Passwords do not match",
          });
     }
}
)  