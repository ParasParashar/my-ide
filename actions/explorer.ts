'use server'

import { db } from "@/lib/db";
import { createOrFindUser } from "./user";
import { revalidatePath } from "next/cache";

export async function createFileWithinFolder({ parentId, name }: { parentId: string, name: string }) {
    try {
        const user = await createOrFindUser();
        if (!user?.id || !user) {
            return 'User not found'
        }
        const file = await db.file.create({
            data: {
                name: name,
                folderId: parentId,
                userId: user?.id,
            }
        });
        return file.id
    } catch (error) {
        console.log('something went wrong in create file', error)
    }
}
export async function createSubFolderWithinFolder({ parentId, name }: { parentId: string, name: string }) {
    try {
        const user = await createOrFindUser();
        if (!user?.id || !user) {
            return 'User not found'
        }
        const folder = await db.folder.create({
            data: {
                name: name,
                parentId: parentId,
                userId: user?.id,
            }
        });
        return folder.id

    } catch (error) {
        console.log('something went wrong in create file', error)
    }
}