import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.createRecipe(createRecipeDto);
  }

  @Get()
  getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }

  @Get(':id')
  getRecipeById(@Param('id') id: number) {
    return this.recipeService.getRecipeById(id);
  }

  @Put(':id')
  updateRecipe(
    @Param('id') id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipeService.updateRecipe(id, updateRecipeDto);
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: number) {
    return this.recipeService.deleteRecipe(id);
  }
}
