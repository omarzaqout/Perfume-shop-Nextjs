import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.heroSlide.createMany({
    data: [
      {
        title: "خصم الصيف الكبير",
        subtitle: "خصم يصل إلى 50% على المجموعة الصيفية",
        imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=404&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        buttonText: "تسوق الآن",
        href: "/summer-collection",
        isActive: true,
        order: 1
      },
      {
        title: "مجموعة جديدة",
        subtitle: "اكتشف أحدث منتجاتنا لهذا الموسم",
        imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        buttonText: "استكشف",
        href: "/new-arrivals",
        isActive: true,
        order: 2
      },
      {
        title: "عروض خاصة",
        subtitle: "صفقات حصرية لمدة محدودة",
        imageUrl: "https://images.unsplash.com/photo-1593487568720-92097fb460fb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        buttonText: "استفد الآن",
        href: "/special-offers",
        isActive: true,
        order: 3
      },
      {
        title: "المجموعة الشتوية",
        subtitle: "استعد للشتاء مع أفضل المنتجات",
        imageUrl: "https://example.com/winter-collection.jpg",
        buttonText: "تسوق المجموعة",
        href: "/winter-collection",
        isActive: false, // غير نشط حاليًا
        order: 4
      }
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

