'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { createInvoice, updateInvoice} from "@/src/lib/database-actions";
import {FormSchema} from "@/src/lib/schemas";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const SaveInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });


export async function saveInvoice(prevState: State, formData: FormData) {
  const validatedFields = SaveInvoice.safeParse(Object.fromEntries(formData.entries()));
  const id = formData.get('id')

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: `Missing Fields. Failed to ${id ? 'Update' : 'Create'} Invoice.`,
    };
  }

  validatedFields.data.amount *= 100;

  if (id) {
    return updateInvoice({...validatedFields.data, id})
  } else {
    const date = new Date().toISOString().split('T')[0];
    return createInvoice({...validatedFields.data, date})
  }
}


export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
      details: error,
    }
  }
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
