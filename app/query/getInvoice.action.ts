"use server";


import prisma from '../lib/db';


export async function getInvoices() {
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

        return invoices;
    } catch (error) {
        console.log(error);
    }

}
