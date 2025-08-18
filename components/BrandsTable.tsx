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
    <div className="w-full max-w-full p-4">
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-md">
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
            {brands.map((brand) => (
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

      <div className="grid gap-4 md:hidden">
        {brands.length === 0 ? (
          <p className="text-gray-500 text-center">No brands to display.</p>
        ) : (
          brands.map((brand) => (
            <div key={brand.brandName} className="p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-2">
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
                <h2 className="font-semibold text-lg">{brand.brandName}</h2>
              </div>

              <p className="text-sm text-gray-700">
                <span className="font-medium">Owner:</span> {brand.ownerName}
              </p>
              <p className="text-sm text-gray-700 truncate">
                <span className="font-medium">Email:</span> {brand.ownerEmail}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Products:</span>{" "}
                {brand.productCount}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
