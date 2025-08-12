"use client";

import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
type Product = {
  brand: {
    name: string;
  };
} & {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  brandId: string;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-[100%]   border-2 border-bg-primary rounded-2xl shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300">
      <Image
        alt={product.name}
        src={product.imageUrl}
        className="rounded-2xl w-full h-[150px] sm:h-[200px] md:h-[200px] object-cover"
      />

      <CardBody className="pt-3 px-3 flex flex-col justify-between ">
        <h4 className="text-sm font-medium text-left text-gray-600">
          {product.brand.name}
        </h4>

        <h3 className="text-lg font-semibold text-left">{product.name}</h3>

        <p className="text-center-left text-primary font-bold text-xl">
          {product.price}
        </p>

        <Button
          onClick={() => alert("Added to cart!")}
          className="bg-primary text-white rounded-md px-4 py-2 hover:bg-primary-dark transition"
        >
          Add to Cart
        </Button>
      </CardBody>
    </Card>
  );
}
