'use server'

import { db } from "@/lib/db";
import { createOrFindUser } from "./user";
import { revalidatePath } from "next/cache";
import { File, Folder } from "@prisma/client";



interface PopulatedFolder extends Folder {
    childFolders?: PopulatedFolder[];
    files?: File[];
}


async function getUserFolders(id: string) {
    try {
        const folder = await db.folder.findUnique({
            where: {
                id: id,
            },
            include: {
                files: true,
                childFolders: true,
            },
        });
        return folder
    } catch (error) {
        console.log('folder not found', error)
    }

}

export async function createFolder(name: string) {
    try {
        const user = await createOrFindUser();
        if (!user) return null;
        const folder = await db.folder.create({
            data: {
                userId: user?.id,
                name: name,
            }
        });
        return folder.id

    } catch (error) {
        console.log(error, 'user folder creation error')
    }

}
export async function editFolderName(id: string, newName: string) {
    try {
        const user = await createOrFindUser();
        if (!user) return null;
        const folder = await db.folder.update({
            where: {
                id: id,
                userId: user.id
            },
            data: {
                name: newName,
            }
        });
        return folder.id

    } catch (error) {
        console.log(error, 'user folder edit error')
    }

}
export async function editFileName(id: string, newName: string) {
    try {
        const user = await createOrFindUser();
        if (!user) return null;
        const folder = await db.file.update({
            where: {
                id: id,
                userId: user.id
            },
            data: {
                name: newName,
            }
        });
        return folder.id

    } catch (error) {
        console.log(error, 'user folder edit error')
    }

}

//delete folder
export async function deleteFolderAndSubFolder(id: string, path?: string) {
    try {
        const user = await createOrFindUser();
        if (!user) return null;
        const folders = await getUserFolders(id);
        if (folders?.childFolders && folders.childFolders.length > 0) {
            for (const childFolder of folders.childFolders) {
                await deleteFolderAndSubFolder(childFolder.id);
            }
        }
        await db.folder.delete({
            where: {
                id: id,
            },
        });
        revalidatePath(`${path}`)
    } catch (error) {
        console.log(error, 'user folder delete error')
    }

}
//deletefile
export async function deleteFile(id: string, path?: string) {
    try {
        await db.file.delete({
            where: {
                id: id,
            },
        });
        revalidatePath(`/${path}`)
    } catch (error) {
        console.log(error, 'user file delete error')
    }

}

// function to populate user folder
async function getFolderWithChildren(folderId: string): Promise<PopulatedFolder> {
    const folder = await getUserFolders(folderId);

    if (!folder) {
        throw new Error("Folder not found");
    }

    const { childFolders } = folder;

    if (childFolders) {
        folder.childFolders = await Promise.all(
            childFolders.map((childFolder) => getFolderWithChildren(childFolder.id))
        );
    }

    return folder as PopulatedFolder;
}

export async function getMainFolder(folderId: string): Promise<PopulatedFolder> {
    try {
        const folder = await getFolderWithChildren(folderId);
        return folder;
    } catch (error) {
        console.error(error, 'user folder edit error');
        throw error;
    }
}
