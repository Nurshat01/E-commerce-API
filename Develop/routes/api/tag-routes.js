const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name'],
        },
      ],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

// Get one tag
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock'],
        },
      ],
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag is link with this id -> ResonCode > 1-00-1' });
      return;
    }

    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

// Update a tag's name
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updatedTag[0] === 0) {
      res.status(404).json({ message: 'No tag is link with this id -> ResonCode > 1-00-1' });
      return;
    }

    res.json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

// Delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'No tag is link with this id -> ResonCode > 1-00-1' });
      return;
    }

    res.json(deletedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err + '-> ResonCode > 1-00-2');
  }
});

module.exports = router;
