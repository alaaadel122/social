import * as z from "zod";
export const LoginSchema = z.object({    
     email: z.string().nonempty('This Field is required').email('Not Valid Email'),
     password: z.string().nonempty('This Feield is requored').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Password Is invalid'),
})