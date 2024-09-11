import { Controller, Get, Query } from '@nestjs/common';

import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async getItems(
    @Query('name') name: string,
    @Query('floatMin') floatMin: string,
    @Query('floatMax') floatMax: string,
    @Query('priceMin') priceMin: string,
    @Query('priceMax') priceMax: string,
    @Query('category') category: string,
  ) {
    const filters = { name, floatMin, floatMax, priceMin, priceMax, category };

    return this.itemsService.getAllItems(filters);
  }
}
