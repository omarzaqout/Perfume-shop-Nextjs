// lib/useUserRole.ts

import { createUserAction, getUserByIdAction } from "@/actions/user.action";
import { auth, clerkClient } from "@clerk/nextjs/server";


export type UserRoleResult = {
    userId: string;
    role: "CLIENT" | "ADMIN" | string;
};

export async function getUserRole(): Promise<UserRoleResult> {
    const { userId } = await auth();
    if (!userId) return { userId: "", role: "CLIENT" };

    const user = await (await clerkClient()).users.getUser(userId);

    await createUserAction({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        name: user.firstName ?? "New User",
    });

    const userInfo = await getUserByIdAction(user.id);
    const role = userInfo?.role ?? "CLIENT";

    return { userId: user.id, role };
}
