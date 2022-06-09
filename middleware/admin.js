const autenticationUser = (req, res, next) => {
  req.user = {
    Name: "User",
    isAdmin: true,
  };
  next();
};
const authorizeUser = (req, res, next) => {
  if (req.user.isAdmin) next();
  else
    res
      .status(403)
      .send({
        error: 403,
        descripcion: "USTED NO POSEE LOS PERMISOS NECESARIOS",
      });
};

module.exports = {autenticationUser , authorizeUser}