import { prisma } from '$lib/server/prisma';

export async function getFavorisModel(userId: string, limit: number, offset: number) {
    return await prisma.favoris.findMany({
        where: { userId },
        include: {
            offre: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
    });
}

export async function findFavoriByUserIdAndOffreId(userId: string, offreId: string) {
    return await prisma.favoris.findUnique({
        where: {
            userId_offreId: {
                userId,
                offreId,
            },
        },
    });
}

export async function createFavoriModel(userId: string, offreId: string) {
    return await prisma.favoris.create({
        data: {
            userId,
            offreId,
        },
        include: {
            offre: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
}

export async function deleteFavoriModel(userId: string, offreId: string) {
    return await prisma.favoris.delete({
        where: {
            userId_offreId: {
                userId,
                offreId,
            },
        },
    });
}