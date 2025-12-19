"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const ADMIN_EMAIL = "owner@studiomain.com";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    //  Login page ko open rehne do
    if (pathname === "/admin/login") return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //  Not logged in
      if (!user) {
        router.replace("/");
        return;
      }

      //  Logged in but not admin
      if (user.email !== ADMIN_EMAIL) {
        router.replace("/");
        return;
      }

      //  Admin allowed
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return <>{children}</>;
}
