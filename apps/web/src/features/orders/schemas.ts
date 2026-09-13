import { z } from "zod";

export const createOrderSchema = z.object({
  customer: z.object({
    name: z.string().min(1, "Customer name is required"),
    phone: z.string().min(1, "Phone number is required"),
  }),
  products: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        rate: z.number(),
        qty: z.number().positive("Quantity must be positive"),
      }),
    )
    .min(1, "At least one product is required"),
  totalAmount: z.number().positive("Total amount must be positive"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
