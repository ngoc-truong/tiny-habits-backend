const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { tokenExtractor } = require("../util/middleware");
const { Aspiration, User, Behavior, UserAspirations } = require("../models");
const { SECRET } = require("../util/config");

router.get("/", async (req, res) => {
  const aspirations = await Aspiration.findAll({
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Behavior,
        attributes: ["id", "content"],
      },
    ],
  });
  res.json(aspirations);
});

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const aspiration = await Aspiration.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(aspiration);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

const aspirationFinder = async (req, res, next) => {
  req.aspiration = await Aspiration.findByPk(req.params.id);
  next();
};

router.get("/:id", aspirationFinder, async (req, res) => {
  if (req.aspiration) {
    res.json(req.aspiration);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", aspirationFinder, async (req, res) => {
  if (req.aspiration) {
    const user = await User.findByPk(req.aspiration.dataValues.userId);
    const aspiration = await Aspiration.findByPk(req.aspiration.id);

    await UserAspirations.destroy({
      where: {
        userId: user.id,
        aspirationId: req.aspiration.id,
      },
    });

    await aspiration.destroy();
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
