import {z} from "zod";

export const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    message: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    message: 'Please select an invoice status.',
  }),
  date: z.string(),
});