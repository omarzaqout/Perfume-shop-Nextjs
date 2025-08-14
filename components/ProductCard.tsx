

"use client";

import { cn } from "@/lib/utils";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import { Link } from "lucide-react";
// import { FaShoppingCart } from "react-icons/fa";
// import Image from "next/image";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
 import Image from "next/image";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

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
  priority?: boolean;
  animationDelay?: number;
}

export default function ProductCard({ product, priority=false, animationDelay=0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.brand.name}
        </h3>
        
        <h2 className="mt-1 text-sm font-semibold text-foreground line-clamp-2 h-8">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h2>
        
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 h-8">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <p className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add to cart"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300",
              "opacity-100 md:opacity-0 md:group-hover:opacity-100"
            )}
          >
            <FaShoppingCart size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}



// "use client";

// import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
// type Product = {
//   brand: {
//     name: string;
//   };
// } & {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   quantity: number;
//   createdAt: Date;
//   updatedAt: Date;
//   categoryId: string;
//   brandId: string;
// };

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   return (
//     <Card className="w-[100%]   border-2 border-bg-primary rounded-2xl shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300">
//       <Image
//         alt={product.name}
//         src={product.imageUrl}
//         className="rounded-2xl w-full h-[150px] sm:h-[200px] md:h-[200px] object-cover"
//       />

//       <CardBody className="pt-3 px-3 flex flex-col justify-between ">
//         <h4 className="text-sm font-medium text-left text-gray-600">
//           {product.brand.name}
//         </h4>

//         <h3 className="text-lg font-semibold text-left">{product.name}</h3>

//         <p className="text-center-left text-primary font-bold text-xl">
//           {product.price}
//         </p>

//         <Button
//           onClick={() => alert("Added to cart!")}
//           className="bg-primary text-white rounded-md px-4 py-2 hover:bg-primary-dark transition"
//         >
//           Add to Cart
//         </Button>
//       </CardBody>
//     </Card>
//   );
// }