import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { PrismaService } from '..//prisma/prisma.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    item: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all items when no filters are provided', async () => {
    const mockItems = [{ id: 1, name: 'AK-47 | Redline', price: 180 }];
    mockPrismaService.item.findMany.mockResolvedValue(mockItems);

    const result = await service.getAllItems();
    expect(prismaService.item.findMany).toHaveBeenCalledWith();
    expect(result).toEqual(mockItems);
  });

  it('should return items with name filter', async () => {
    const mockItems = [{ id: 1, name: 'AK-47 | Redline', price: 180 }];
    mockPrismaService.item.findMany.mockResolvedValue(mockItems);

    const filters = { name: 'AK-47' };
    const result = await service.getAllItems(filters);

    expect(prismaService.item.findMany).toHaveBeenCalledWith({
      where: {
        AND: [
          { name: { contains: 'AK-47', mode: 'insensitive' } },
          {},
          {},
          {},
          {},
          {},
        ],
      },
    });
    expect(result).toEqual(mockItems);
  });

  it('should return items with price filters', async () => {
    const mockItems = [{ id: 2, name: 'AWP | Dragon Lore', price: 1200 }];
    mockPrismaService.item.findMany.mockResolvedValue(mockItems);

    const filters = { priceMin: '100', priceMax: '2000' };
    const result = await service.getAllItems(filters);

    expect(prismaService.item.findMany).toHaveBeenCalledWith({
      where: {
        AND: [
          {},
          {},
          {},
          { price: { gte: 100 } },
          { price: { lte: 2000 } },
          {},
        ],
      },
    });
    expect(result).toEqual(mockItems);
  });

  it('should return items with all filters', async () => {
    const mockItems = [{ id: 1, name: 'AK-47 | Redline', price: 180 }];
    mockPrismaService.item.findMany.mockResolvedValue(mockItems);

    const filters = {
      name: 'AK-47',
      floatMin: '0.1',
      floatMax: '0.9',
      priceMin: '100',
      priceMax: '200',
      category: 'Rifle',
    };
    const result = await service.getAllItems(filters);

    expect(prismaService.item.findMany).toHaveBeenCalledWith({
      where: {
        AND: [
          { name: { contains: 'AK-47', mode: 'insensitive' } },
          { float: { gte: 0.1 } },
          { float: { lte: 0.9 } },
          { price: { gte: 100 } },
          { price: { lte: 200 } },
          { category: { equals: 'Rifle', mode: 'insensitive' } },
        ],
      },
    });
    expect(result).toEqual(mockItems);
  });
});
