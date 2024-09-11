import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async getAllItems(filters: any = {}) {
    const { name, floatMin, floatMax, priceMin, priceMax, category } = filters;

    // Verifica se há algum filtro ativo
    const hasFilters =
      name || floatMin || floatMax || priceMin || priceMax || category;

    if (!hasFilters) {
      return this.prisma.item.findMany();
    }

    // Caso contrário, aplique os filtros
    return this.prisma.item.findMany({
      where: {
        AND: [
          name ? { name: { contains: name, mode: 'insensitive' } } : {},
          floatMin ? { float: { gte: parseFloat(floatMin) } } : {},
          floatMax ? { float: { lte: parseFloat(floatMax) } } : {},
          priceMin ? { price: { gte: parseFloat(priceMin) } } : {},
          priceMax ? { price: { lte: parseFloat(priceMax) } } : {},
          category
            ? { category: { equals: category, mode: 'insensitive' } }
            : {},
        ],
      },
    });
  }
}
