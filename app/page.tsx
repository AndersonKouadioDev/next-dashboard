import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { getInvoices } from "./query/getInvoice.action";
import prisma from "./lib/db";
export default async function Page() {
  
  // Server Action
  const invoices = await getInvoices();
  console.log(invoices);

  // API Route
  const otherInvoices = await fetch("http://localhost:3000/query", {
    method: "POST",
  }).then((res) => res.json());
  console.log(otherInvoices);

  // Récupéfration directe des données dans la base de données (SQl ou Prisma)
  const invoicesDb = await prisma.invoices.findMany({
    where: {
      amount: 500,
    },
    select: {
      customer: {
        select: {
          name: true,
        },
      },
      amount: true,
    },
  });

  console.log(invoicesDb);

  return (
    <main className={`flex min-h-screen flex-col p-6 bg-primary-50`}>
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 lg:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 lg:w-2/5 lg:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>

          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 lg:w-3/5 lg:px-28 lg:py-12">
          <Image
            src="/hero-desktop.png"
            width={2000}
            height={1520}
            className="hidden lg:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />

          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="lg:hidden"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </main>
  );
}
