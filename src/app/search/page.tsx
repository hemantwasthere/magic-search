import { sql } from "drizzle-orm";
import { NextPage } from "next";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { productsTable } from "@/db/schema";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const query = searchParams.q;

  if (Array.isArray(query) || !query) return redirect("/");

  let products = await db
    .select()
    .from(productsTable)
    .where(
      sql`to_tsvector('simple', lower(${productsTable.name} || ' ' || ${
        productsTable.description
      })) @@ to_tsquery('simple', lower(${query
        .trim()
        .split(" ")
        .join(" & ")}))`
    )
    .limit(3);

  return <pre>{JSON.stringify(products)}</pre>;
};

export default Page;
