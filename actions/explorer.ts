'use server'

import { db } from "@/lib/db";
import { createOrFindUser } from "./user";
import { revalidatePath } from "next/cache";
import { FileEdit } from "lucide-react";
import { error } from "console";

const getFolderById = async (id: string) => {
    const folder = await db.folder.findUnique({
        where: {
            id: id,
        }
    })
    if (folder) return folder?.id;
}
const getFileById = async (id: string) => {
    const file = await db.file.findUnique({
        where: {
            id: id,
        }
    });
    if (file) return file;
}


async function copyFolder({ copiedFolderId, pasteFolderId }: { copiedFolderId: string, pasteFolderId: string }) {
    try {
        const originalFolder = await db.folder.findUnique({
            where: {
                id: copiedFolderId,
            }, include: {
                childFolders: true,
                files: true,
            }
        });
        if (!originalFolder) {
            throw new Error('Original folder is not found')
        }
        const copiedFolder = await db.folder.create({
            data: {
                name: originalFolder.name + 'copy',
                userId: originalFolder.userId,
                parentId: pasteFolderId,
                files: {
                    create: originalFolder.files.map((file) => ({
                        name: file.name,
                        content: file.content,
                        userId: file.userId,
                    })),
                },
                childFolders: {
                    create: originalFolder.childFolders.map((childFolder) => ({
                        name: childFolder.name,
                        userId: childFolder.userId,
                    })),
                },
            },
        });

        //using recursion to copy all the folder.
        if (copiedFolderId !== pasteFolderId) {
            await Promise.all(
                originalFolder.childFolders.map(async (subfolder) =>
                    copyFolder({ copiedFolderId: subfolder.id, pasteFolderId: copiedFolder.id })
                )
            );
        }
        return copiedFolder;
    } catch (error) {
        console.error('Error copying folder', error);
        throw error;
    }
}


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
};

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


export async function pasteCutFolderAndFile({ copiedFolderId, pasteFolderId }: { copiedFolderId: string, pasteFolderId: string }) {
    try {
        const isFolder = await getFolderById(copiedFolderId);
        const isFile = await getFileById(copiedFolderId);
        if (!isFolder && !isFile) {
            return 'Something went wrong'
        }
        if (isFolder) {
            await db.folder.update({
                where: {
                    id: isFolder
                }
                ,
                data: {
                    parentId: pasteFolderId
                }
            });
            return
        };
        if (isFile) {
            await db.file.update({
                where: {
                    id: isFile
                },
                data: {
                    folderId: pasteFolderId
                }
            });
            return
        };
        throw new Error('Unexpected behavior');
    } catch (error) {
        console.log('something went wrong in cut foler', error)
        throw error;
    }
}

export async function pasteCopyFile({ copiedFolderId, pasteFolderId }: { copiedFolderId: string, pasteFolderId: string }) {
    try {
        const isFolder = await getFolderById(copiedFolderId);
        const isFile = await getFileById(copiedFolderId);
        if (!isFolder && !isFile) {
            return 'Something went wrong'
        }
        if (isFolder) {
            const copiedFolder = await copyFolder({
                copiedFolderId: copiedFolderId,
                pasteFolderId: pasteFolderId
            })
            return copiedFolder.id
        }
        if (isFile) {
            const copiedFile = await db.file.create({
                data: {
                    name: isFile.name,
                    content: isFile.content,
                    userId: isFile.userId,
                    folderId: pasteFolderId
                }
            });
            return copiedFile;
        };
    } catch (error) {
        console.log('something went wrong in copy folder and file', error)
        throw error;
    }
}



