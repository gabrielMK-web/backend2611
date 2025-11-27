const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ erro: "Token não enviado." });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, "segredo_super_seguro");

    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido." });
  }
}

module.exports = auth;
