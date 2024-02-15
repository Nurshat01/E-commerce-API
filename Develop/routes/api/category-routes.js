const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found with this id -> ResonCode > 1-00-1' });
      return;
    }

    res.json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [rowsAffected, [updatedCategoryData]] = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true, // To get the updated row
      }
    );

    if (rowsAffected === 0) {
      res.status(404).json({ message: 'Category not found with this id -> ResonCode > 1-00-1' });
      return;
    }

    res.json(updatedCategoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err+ '-> ResonCode > 1-00-2');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const rowsAffected = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsAffected === 0) {
      res.status(404).json({ message: 'Category not found with this id -> ResonCode > 1-00-1' });
      return;
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

module.exports = router;
