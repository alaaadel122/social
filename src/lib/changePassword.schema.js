import * as z from "zod";
export const ChangePasswordSchema = z.object({    
     password: z.string().nonempty('This Feield is required'),
     newPassword: z.string().nonempty('This Feield is requored').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Password Is invalid') ,
})