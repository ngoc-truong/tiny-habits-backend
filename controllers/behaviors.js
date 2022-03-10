const router = require("express").Router();

const { Behavior, Aspiration } = require("../models");

router.get("/", async (req, res) => {
  const behaviors = await Behavior.findAll({
    include: {
      model: Aspiration,
    },
  });
  res.json(behaviors);
});

router.post("/", async (req, res) => {
  try {
    const aspiration = await Aspiration.findByPk(req.body.aspiration_id);
    // const aspiration = await Aspiration.findOne();
    const behavior = await Behavior.create({
      ...req.body,
      aspirationId: aspiration.id,
      date: new Date(),
    });
    res.json(behavior);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const behavior = await Behavior.findByPk(req.params.id);

  if (behavior) {
    res.json(behavior);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
