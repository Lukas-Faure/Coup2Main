import { prisma } from '$lib/server/prisma';
import type { Prisma } from '@prisma/client';
import type { CreateOffre, UpdateOffre } from '$lib/schemas/offre.schema'; 


const includeUserSelect = {
	user: {
		select: {
			id: true,
			name: true,
			image: true
		}
	}
};

export class OffreServiceServer {
	static async getOffres(
		page = 1,
		limit = 10,
		filters?: {
			type?: string;
			category?: string;
			search?: string;
			userId?: string;
		}
	) {
		const skip = (page - 1) * limit;
		const where: Prisma.OffreWhereInput = {};

		if (filters?.type && filters.type !== 'all') where.type = filters.type;
		if (filters?.category) where.category = filters.category;
		if (filters?.userId) where.userId = filters.userId;

		if (filters?.search) {
			where.OR = [{ title: { contains: filters.search } }, { description: { contains: filters.search } }];
		}

		const [offres, total] = await Promise.all([
			prisma.offre.findMany({
				where,
				include: includeUserSelect,
				orderBy: { createdAt: 'desc' },
				skip,
				take: limit
			}),
			prisma.offre.count({ where })
		]);

		return {
			offres,
			total,
			pages: Math.ceil(total / limit),
			currentPage: page
		};
	}

	static async createOffre(data: CreateOffre & { userId: string }) {
		return await prisma.offre.create({
			data,
			include: includeUserSelect
		});
	}

	static async getOffreById(offreId: string) {
		return await prisma.offre.findUnique({
			where: { id: offreId },
			include: {
				...includeUserSelect,
				messages: {
					select: {
						id: true,
						fromUserId: true,
						toUserId: true,
						createdAt: true
					}
				},
				rendezVous: {
					select: {
						id: true,
						date: true,
						statut: true
					}
				}
			}
		});
	}

	static async updateOffre(offreId: string, userId: string, data: UpdateOffre) {
		const existingOffre = await prisma.offre.findUnique({
			where: { id: offreId }
		});

		if (!existingOffre || existingOffre.userId !== userId) {
			throw new Error('Offre non trouvée ou non autorisée');
		}

		const dataToUpdate = {
			type: data.type,
			title: data.title,
			description: data.description,
			category: data.category,
			location: data.location
		};

		return await prisma.offre.update({
			where: { id: offreId },
			data: dataToUpdate,
			include: includeUserSelect
		});
	}

	static async deleteOffre(offreId: string, userId: string) {
		const existingOffre = await prisma.offre.findUnique({
			where: { id: offreId }
		});

		if (!existingOffre || existingOffre.userId !== userId) {
			throw new Error('Offre non trouvée ou non autorisée');
		}

		await prisma.offre.delete({ where: { id: offreId } });
		return { success: true };
	}
} 