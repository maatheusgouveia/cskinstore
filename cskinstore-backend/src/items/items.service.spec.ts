import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ItemsService } from './items.service';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return items with name filter', async () => {
    const filters = {
      name: 'AK-47',
      floatMin: null,
      floatMax: null,
      priceMin: null,
      priceMax: null,
      category: null,
      orderBy: 'asc',
    };

    const mockResponse = [{ id: 1, name: 'AK-47 | Redline', price: 180 }];
    mockPrismaService.item.findMany.mockResolvedValue(mockResponse);

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
      orderBy: { price: 'asc' },
    });
    expect(result).toEqual(mockResponse);
  });

  it('should return items with price filters', async () => {
    const filters = {
      name: null,
      floatMin: null,
      floatMax: null,
      priceMin: 100,
      priceMax: 200,
      category: null,
      orderBy: 'desc',
    };

    const mockResponse = [{ id: 1, name: 'AK-47 | Redline', price: 180 }];
    mockPrismaService.item.findMany.mockResolvedValue(mockResponse);

    const result = await service.getAllItems(filters);

    expect(prismaService.item.findMany).toHaveBeenCalledWith({
      where: {
        AND: [{}, {}, {}, { price: { gte: 100 } }, { price: { lte: 200 } }, {}],
      },
      orderBy: { price: 'desc' },
    });
    expect(result).toEqual(mockResponse);
  });

  it('should return items with all filters', async () => {
    const filters = {
      name: 'AK-47',
      floatMin: 0.1,
      floatMax: 0.9,
      priceMin: 100,
      priceMax: 200,
      category: 'Rifle',
      orderBy: 'asc',
    };

    const mockResponse = [{ id: 1, name: 'AK-47 | Redline', price: 180 }];
    mockPrismaService.item.findMany.mockResolvedValue(mockResponse);

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
      orderBy: { price: 'asc' },
    });
    expect(result).toEqual(mockResponse);
  });
});
