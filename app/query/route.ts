import postgres from 'postgres';
import prisma from '../lib/db';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 500;
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}


export async function POST() {

  try {
    const invoices = await prisma.invoices.findMany({
      where: {
        amount: 500
      },
      select: {
        customer: {
          select: {
            name: true,
          }
        },
        amount: true,
      }
    });

    return Response.json(invoices);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
