'use server';

import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { FormSchema} from "@/src/lib/schemas";

export async function createInvoice(data: typeof FormSchema) {
  const { customerId, amount, status, date } = data

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amount}, ${status}, ${date})
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
      details: error,
    }
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


export async function updateInvoice(data: typeof FormSchema) {
  const { customerId, amount, status, id } = data

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amount}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
      details: error,
    }
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
