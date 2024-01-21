'use server'

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export async function createOrFindUser() {
    try {
        const user = await currentUser();
        if (!user) return null;

        const existingUser = await db.user.findFirst({
            where: {
                authId: user?.id,
            },
        });
        if (!existingUser) {
            const newUser = await db.user.create({
                data: {
                    name: user.username || 'User',
                    email: user.emailAddresses[0].emailAddress,
                    authId: user.id,
                    image: user.imageUrl,
                },
            });
            return newUser
        };
        return existingUser;

    } catch (error) {
        console.log(error, 'user creation error')
    }
}

export async function getUserFolders() {
    try {
        const user = await createOrFindUser();
        const folders = await db.folder.findMany({
            where: {
                userId: user?.id
            },
        }
        );
        const data = folders.filter(item => item.parentId === null);

        return data;
    } catch (error) {
        console.log(error, 'user folder get error')

    }
}