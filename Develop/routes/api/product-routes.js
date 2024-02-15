const router = require('express').Router();
const { Product, Category, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'product_name', 'price', 'stock'],
      include: [
        {
          model: Category,
          attributes: ['category_name']
        }
      ]
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

// Get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['product_name', 'price', 'stock'],
      include: [
        {
          model: Category,
          attributes: ['category_name']
        }
      ]
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found with this id -> ResonCode > 1-00-1' });
      return;
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));

      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json(err+ '-> ResonCode > 1-00-2');
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({
        product_id: req.params.id,
        tag_id,
      }));

    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err+ '-> ResonCode > 1-00-3');
  }
});

// Delete one product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found with this id -> ResonCode > 1-00-1' });
      return;
    }

    res.json(deletedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err+ '-> ResonCode > 1-00-2');
  }
});

module.exports = router;
