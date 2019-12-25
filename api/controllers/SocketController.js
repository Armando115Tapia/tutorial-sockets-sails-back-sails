module.exports = {
  subscribe: async function(req, res) {
    // NOMBRE DE LA SALA
    let nombreSala = req.param("nombreSala") || null;
    if (nombreSala == null) {
      return res
        .status(400)
        .send({ socketMsm: "No se ingreso un nombre de sala" });
    }
    if (!req.isSocket) {
      return res
        .status(400)
        .send({ socketMsm: "EL reques no es válido, habilitar sockets." });
    }
    // SI NO EXITE EL ROOM, ESTE ES CREADO
    sails.sockets.join(req, nombreSala, error => {
      if (error) {
        return res.status(500).send({
          socketMsm: `Ha ocurrido un error al unirse a la sala: ${nombreSala}`
        });
      }
      return res.status(200).send({
        socketMsm: `Se ha suscrito a la sala : ${nombreSala}`
      });
    });
  }
};
