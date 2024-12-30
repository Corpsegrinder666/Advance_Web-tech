import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockRecipeRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

describe('RecipeService', () => {
  let service: RecipeService;
  let repository: Repository<Recipe>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: mockRecipeRepository,
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    repository = module.get<Repository<Recipe>>(getRepositoryToken(Recipe));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRecipe', () => {
    it('should create a new recipe', async () => {
      const createRecipeDto = {
        name: 'Pasta',
        type: 'family',
        price: 15.5,
        offers: '10% off',
        details: 'Delicious homemade pasta.',
      };

      const mockRecipe = { id: 1, ...createRecipeDto };

      repository.create = jest.fn().mockReturnValue(mockRecipe);
      repository.save = jest.fn().mockResolvedValue(mockRecipe);

      const result = await service.createRecipe(createRecipeDto);

      expect(repository.create).toHaveBeenCalledWith(createRecipeDto);
      expect(repository.save).toHaveBeenCalledWith(mockRecipe);
      expect(result).toEqual(mockRecipe);
    });
  });

  describe('getAllRecipes', () => {
    it('should return all recipes', async () => {
      const mockRecipes = [
        { id: 1, name: 'Pasta', type: 'family', price: 15.5 },
        { id: 2, name: 'Salad', type: 'single', price: 5.0 },
      ];

      repository.find = jest.fn().mockResolvedValue(mockRecipes);

      const result = await service.getAllRecipes();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mockRecipes);
    });
  });

  describe('getRecipeById', () => {
    it('should return a recipe by ID', async () => {
      const mockRecipe = { id: 1, name: 'Pasta', type: 'family', price: 15.5 };

      repository.findOne = jest.fn().mockResolvedValue(mockRecipe);

      const result = await service.getRecipeById(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockRecipe);
    });

    it('should throw a NotFoundException if recipe is not found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.getRecipeById(99)).rejects.toThrow(
        'Recipe with ID 99 not found',
      );
    });
  });

  describe('updateRecipe', () => {
    it('should update a recipe', async () => {
      const mockRecipe = { id: 1, name: 'Pasta', type: 'family', price: 15.5 };
      const updateRecipeDto = { name: 'Spaghetti' };

      repository.findOne = jest.fn().mockResolvedValue(mockRecipe);
      repository.save = jest.fn().mockResolvedValue({
        ...mockRecipe,
        ...updateRecipeDto,
      });

      const result = await service.updateRecipe(1, updateRecipeDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith({
        ...mockRecipe,
        ...updateRecipeDto,
      });
      expect(result).toEqual({ ...mockRecipe, ...updateRecipeDto });
    });

    it('should throw a NotFoundException if recipe is not found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.updateRecipe(99, { name: 'Spaghetti' })).rejects.toThrow(
        'Recipe with ID 99 not found',
      );
    });
  });

  describe('deleteRecipe', () => {
    it('should delete a recipe', async () => {
      repository.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await service.deleteRecipe(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if recipe is not found', async () => {
      repository.delete = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(service.deleteRecipe(99)).rejects.toThrow(
        'Recipe with ID 99 not found',
      );
    });
  });
});
