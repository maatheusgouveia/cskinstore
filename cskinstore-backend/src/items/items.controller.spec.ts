import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  const mockItemsService = {
    getAllItems: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: mockItemsService,
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAllItems with no filters', async () => {
    const filters = {
      name: null,
      floatMin: null,
      floatMax: null,
      priceMin: null,
      priceMax: null,
      category: null,
      orderBy: null, // Adiciona o orderBy nos filtros
    };

    const mockResponse = [{ id: 1, name: 'AK-47 | Redline', price: 180 }];
    mockItemsService.getAllItems.mockResolvedValue(mockResponse);

    const result = await controller.getItems(
      null,
      null,
      null,
      null,
      null,
      null,
      null, // Passa o valor do orderBy como null
    );

    expect(service.getAllItems).toHaveBeenCalledWith(filters);
    expect(result).toEqual(mockResponse);
  });

  it('should call getAllItems with name filter', async () => {
    const filters = {
      name: 'AK-47',
      floatMin: null,
      floatMax: null,
      priceMin: null,
      priceMax: null,
      category: null,
      orderBy: null, // Adiciona o orderBy nos filtros
    };

    const mockResponse = [{ id: 1, name: 'AK-47 | Redline', price: 180 }];
    mockItemsService.getAllItems.mockResolvedValue(mockResponse);

    const result = await controller.getItems(
      'AK-47',
      null,
      null,
      null,
      null,
      null,
      null, // Passa o valor do orderBy como null
    );

    expect(service.getAllItems).toHaveBeenCalledWith(filters);
    expect(result).toEqual(mockResponse);
  });

  it('should call getAllItems with price range filter', async () => {
    const filters = {
      name: null,
      floatMin: null,
      floatMax: null,
      priceMin: '100',
      priceMax: '200',
      category: null,
      orderBy: null, // Adiciona o orderBy nos filtros
    };

    const mockResponse = [{ id: 1, name: 'AK-47 | Redline', price: 180 }];
    mockItemsService.getAllItems.mockResolvedValue(mockResponse);

    const result = await controller.getItems(
      null,
      null,
      null,
      '100',
      '200',
      null,
      null, // Passa o valor do orderBy como null
    );

    expect(service.getAllItems).toHaveBeenCalledWith(filters);
    expect(result).toEqual(mockResponse);
  });

  it('should call getAllItems with all filters', async () => {
    const filters = {
      name: 'AK-47',
      floatMin: '0.1',
      floatMax: '0.9',
      priceMin: '100',
      priceMax: '200',
      category: 'Rifle',
      orderBy: 'asc',
    };

    const mockResponse = [{ id: 1, name: 'AK-47 | Redline', price: 180 }];
    mockItemsService.getAllItems.mockResolvedValue(mockResponse);

    const result = await controller.getItems(
      'AK-47',
      '0.1',
      '0.9',
      '100',
      '200',
      'Rifle',
      'asc',
    );

    expect(service.getAllItems).toHaveBeenCalledWith(filters);
    expect(result).toEqual(mockResponse);
  });
});
