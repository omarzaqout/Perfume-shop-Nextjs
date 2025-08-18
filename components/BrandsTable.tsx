"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

interface BrandData {
  brandName: string;
  brandLogo: string | null;
  ownerName: string;
  ownerEmail: string;
  productCount: number;
}

interface Props {
  brands: BrandData[];
}

export default function BrandsTable({ brands }: Props) {
  return (
    <div className="w-full max-w-full p-4 overflow-x-auto rounded-lg shadow-md">
      <Table aria-label="Brands Table" className="min-w-[700px]">
        <TableHeader>
          <TableColumn className="p-4 text-left text-sm font-semibold text-gray-600 uppercase ">
            Brand Name
          </TableColumn>
          <TableColumn className="p-4 text-left text-sm font-semibold text-gray-600 uppercase ">
            Logo
          </TableColumn>
          <TableColumn className="p-4 text-left text-sm font-semibold text-gray-600 uppercase ">
            Owner Name
          </TableColumn>
          <TableColumn className="p-4 text-left text-sm font-semibold text-gray-600 uppercase ">
            Owner Email
          </TableColumn>
          <TableColumn className="p-4 text-left text-sm font-semibold text-gray-600 uppercase ">
            Products
          </TableColumn>
        </TableHeader>

        <TableBody
          emptyContent={
            brands.length === 0 ? "No brands to display." : undefined
          }
        >
          {brands.map((brand, index) => (
            <TableRow key={brand.brandName}>
              <TableCell className="p-4 align-middle max-w-[150px] truncate">
                {brand.brandName}
              </TableCell>

              <TableCell className="p-4 align-middle">
                {brand.brandLogo ? (
                  <img
                    src={brand.brandLogo}
                    alt={`${brand.brandName} logo`}
                    width={50}
                    height={50}
                    className="object-contain rounded-md"
                  />
                ) : (
                  <div className="flex items-center justify-center w-[50px] h-[50px] text-xs text-gray-500 rounded-md">
                    No Logo
                  </div>
                )}
              </TableCell>

              <TableCell className="p-4 align-middle max-w-[150px] truncate">
                {brand.ownerName}
              </TableCell>

              <TableCell className="p-4 align-middle max-w-[200px] truncate">
                {brand.ownerEmail}
              </TableCell>

              <TableCell className="p-4 align-middle font-medium text-center">
                {brand.productCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
