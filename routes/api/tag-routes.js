const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagPoint = await Tag.findAll({ include: [Product], through: ProductTag });
    res.json(tagPoint);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const { id } = req.params;
    const tagPoint = await Tag.findOne({
      where: { id },
      include: [{ model: Product, through: ProductTag }],
    });
    if (tagPoint) {
      res.status(200).json(tagPoint);
    }
    }
  catch(error)  {
    res.status(500).json({error});
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tagPoint) => {
    res.status(200).json(tagPoint);
  })
  .catch((error) => {
    res.status(500).json(error);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{ 
    where: { id: req.params.id,}
    })
    .then((tagPoint) => {
      res.status(200).json(tagPoint);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    { where: { id: req.params.id }}
  )
  .then((deleteTagPoint) => {
    res.status(200).json(deleteTagPoint)
  })
  .catch((error) => {
    res.status(500).json(error);
})
});

module.exports = router;
