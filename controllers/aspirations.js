const router = require("express").Router();

const { Aspiration } = require("../models");

const aspirationFinder = async (req, res, next) => {
  req.aspiration = await Aspiration.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const aspirations = await Aspiration.findAll();
  res.json(aspirations);
});

router.post("/", async (req, res) => {
  try {
    const aspiration = await Aspiration.create(req.body);
    res.json(aspiration);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", aspirationFinder, async (req, res) => {
  if (req.aspiration) {
    res.json(req.aspiration);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", aspirationFinder, async (req, res) => {
  if (req.aspiration) {
    await req.aspiration.destroy();
  }
  res.status(204).end();
});

router.put("/:id", aspirationFinder, async (req, res) => {
  if (req.aspiration) {
    req.aspiration.content = req.body.content;
    await req.aspiration.save();
    res.json(req.aspiration);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
