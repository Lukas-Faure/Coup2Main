import { prisma } from '$lib/server/prisma';
import type { Prisma } from '@prisma/client';

const userSelect = {
    id: true,
    name: true,
    email: true,
    image: true,
};

const offreSelect = {
    id: true,
    title: true,
    description: true,
    category: true,
    location: true,
    userId: true,
    type: true,
    user: {
        select: userSelect
    }
};

export async function getRendezVousByUserIdModel(userId: string) {
    const whereClause: Prisma.RendezVousWhereInput = {
        OR: [
            { userId },
            { offre: { userId } }
        ]
    };

    const [rendezVous, total] = await prisma.$transaction([
        prisma.rendezVous.findMany({
            where: whereClause,
            include: {
                user: { select: userSelect },
                offre: { select: offreSelect }
            },
            orderBy: {
                date: 'asc'
            }
        }),
        prisma.rendezVous.count({ where: whereClause })
    ]);

    return { rendezVous, total };
}

export async function getRendezVousByIdModel(id: string) {
    return await prisma.rendezVous.findUnique({
        where: { id },
        include: {
            user: { select: userSelect },
            offre: { select: offreSelect }
        }
    });
}

export async function createRendezVousModel(data: { offreId: string; userId: string; date: Date; message?: string }) {
    const { offreId, userId, date, message } = data; 

    const rendezVous = await prisma.rendezVous.create({
        data: {
            offreId,
            userId,
            date,
            statut: 'propose',
            lastModifiedBy: userId,
            demandeurAccepte: false,
            offreurAccepte: false,
            message: message || null 
        },
        include: {
            user: { select: userSelect },
            offre: { select: offreSelect }
        }
    });
    return rendezVous;
}

export async function updateRendezVousModel(id: string, data: Prisma.RendezVousUpdateInput) {
    return await prisma.rendezVous.update({
        where: { id },
        data,
        include: {
            user: { select: userSelect },
            offre: { select: offreSelect }
        }
    });
}

export async function deleteRendezVousModel(id: string) {
    return await prisma.rendezVous.delete({
        where: { id }
    });
}

export async function accepterRendezVousModel(id: string, updateData: Prisma.RendezVousUpdateInput) {
    return await prisma.rendezVous.update({
        where: { id },
        data: updateData,
        include: {
            user: { select: userSelect },
            offre: { select: offreSelect }
        }
    });
}

export async function getRendezVousByOffreIdModel(offreId: string) {
    const whereClause: Prisma.RendezVousWhereInput = { offreId };
    const [rendezVous, total] = await prisma.$transaction([
        prisma.rendezVous.findMany({
            where: whereClause,
            include: {
                user: { select: userSelect },
                offre: { select: offreSelect }
            },
            orderBy: {
                date: 'asc'
            }
        }),
        prisma.rendezVous.count({ where: whereClause })
    ]);
    return { rendezVous, total };
}

export async function getRendezVousStatsModel(where: Prisma.RendezVousWhereInput) {
    const [total, proposes, acceptes, refuses, termines] = await Promise.all([
        prisma.rendezVous.count({ where }),
        prisma.rendezVous.count({ where: { ...where, statut: 'propose' } }),
        prisma.rendezVous.count({ where: { ...where, statut: 'accepte' } }),
        prisma.rendezVous.count({ where: { ...where, statut: 'refuse' } }),
        prisma.rendezVous.count({ where: { ...where, statut: 'termine' } })
    ]);

    return {
        total,
        proposes,
        acceptes,
        refuses,
        termines
    };
}

export async function getProchainRendezVousModel(userId: string, limit: number) {
    const whereClause: Prisma.RendezVousWhereInput = {
        OR: [
            { userId },
            { offre: { userId } }
        ],
        statut: { in: ['propose', 'accepte', 'confirme', 'termine', 'refuse'] }, 
        date: {
            gte: new Date() 
        }
    };

    const [rendezVous, total] = await prisma.$transaction([
        prisma.rendezVous.findMany({
            where: whereClause,
            include: {
                user: { select: userSelect },
                offre: { select: offreSelect }
            },
            orderBy: {
                date: 'asc'
            },
            take: limit
        }),
        prisma.rendezVous.count({ where: whereClause })
    ]);

    return { rendezVous, total };
}
export async function findOffreById(offreId: string) {
    return await prisma.offre.findUnique({
        where: { id: offreId }
    });
}