import { prisma } from '$lib/server/prisma';
import type { Prisma } from '@prisma/client';

export async function getOffres(limit: number, offset: number, filters: any) {
    const where: Prisma.OffreWhereInput = {};

    if (filters.category && filters.category !== 'all') {
        where.category = filters.category;
    }
    if (filters.type && filters.type !== 'all') {
        where.type = filters.type;
    }
    if (filters.location) {
        where.location = { contains: filters.location };
    }
    if (filters.search) {
        where.OR = [
            { title: { contains: filters.search } },
            { description: { contains: filters.search } }
        ];
    }
    if (filters.userId) {
        where.userId = filters.userId;
    }

    const [offres, total] = await prisma.$transaction([
        prisma.offre.findMany({
            where,
            take: limit,
            skip: offset,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { id: true, name: true, image: true } } }
        }),
        prisma.offre.count({ where })
    ]);

    return { offres, total };
}

export async function createOffre(data: Prisma.OffreCreateInput) {
    return await prisma.offre.create({
        data,
        include: { user: { select: { id: true, name: true, image: true } } }
    });
}

export async function getOffreById(id: string) {
    return await prisma.offre.findUnique({
        where: { id },
        include: {
            user: { select: { id: true, name: true, image: true } },
            rendezVous: {
                include: { user: { select: { id: true, name: true, image: true } } },
                orderBy: { date: 'desc' }
            }
        }
    });
}

export async function updateOffre(id: string, data: Prisma.OffreUpdateInput) {
    const existingOffre = await prisma.offre.findUnique({
        where: { id },
        select: { userId: true }
    });

    if (!existingOffre) {
        throw new Error('Offre non trouvée');
    }

    const dataToUpdate: Prisma.OffreUpdateInput = { ...data };
    
    if ('id' in dataToUpdate) delete (dataToUpdate as any).id;
    if ('userId' in dataToUpdate) delete (dataToUpdate as any).userId;
    if ('user' in dataToUpdate) delete (dataToUpdate as any).user;
    if ('rendezVous' in dataToUpdate) delete (dataToUpdate as any).rendezVous;
    if ('favoris' in dataToUpdate) delete (dataToUpdate as any).favoris;
    if ('messages' in dataToUpdate) delete (dataToUpdate as any).messages;
    if ('createdAt' in dataToUpdate) delete (dataToUpdate as any).createdAt;
    if ('updatedAt' in dataToUpdate) delete (dataToUpdate as any).updatedAt;


    return await prisma.offre.update({
        where: { id },
        data: dataToUpdate,
        include: { user: { select: { id: true, name: true, image: true } } }
    });
}

export async function deleteOffre(offreId: string) {
    const existingOffre = await prisma.offre.findUnique({
        where: { id: offreId },
        select: { userId: true }
    });

    if (!existingOffre) {
        throw new Error('Offre non trouvée');
    }

    await prisma.offre.delete({ where: { id: offreId } });
}

export async function getOffreStatsModel(userId: string) {
    const total = await prisma.offre.count({
        where: { userId }
    });
    return { total };
} 