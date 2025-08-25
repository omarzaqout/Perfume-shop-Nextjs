// في ملف: components/AppBar/index.tsx

import { getTranslations } from "next-intl/server";
import { getUserRole } from "@/lib/useUserRole";
import AppBarClient from "./AppBarClient";

export default async function AppBar({locale }: {locale: string }) {

  const t = await getTranslations({ locale, namespace: "AppBar" });

  const { role } = await getUserRole();


  const translations = {
    storeName: t("storeName"),
    premium: t("premium"),
    seller: t("seller"),
    admin: t("admin"),
    signIn: t("signIn"),
    cart: t("cart"),
    sellerPanel: t("sellerPanel"),
    adminPanel: t("adminPanel"),
  };

  return <AppBarClient role={role} t={translations} />;
}