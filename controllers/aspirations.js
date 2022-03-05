const router = require("express").Router();

const res = require("express/lib/response");
const { Aspiration, User } = require("../models");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      res.status(401).json({ error: "token invalid" });
    }
  } else {
    res.status(401).json({ error: "token missing" });
  }
  next();
};

const aspirationFinder = async (req, res, next) => {
  req.aspiration = await Aspiration.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const aspirations = await Aspiration.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
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
