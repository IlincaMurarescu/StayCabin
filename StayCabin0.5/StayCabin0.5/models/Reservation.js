const reservationsFile = path.join(__dirname, "data", "reservations.json");

class Reservation {
  static loadReservations() {
    return JSON.parse(fs.readFileSync(reservationsFile, "utf8"));
  }

  static saveReservations(reservations) {
    fs.writeFileSync(reservationsFile, JSON.stringify(reservations, null, 2));
  }

  static getAll() {
    return this.loadReservations();
  }

  static getById(id) {
    const reservations = this.loadReservations();
    return reservations.find((reservation) => reservation.id === id);
  }

  static getByUserId(userId) {
    const reservations = this.loadReservations();
    return reservations.filter((reservation) => reservation.user_id === userId);
  }

  static create(newReservation) {
    const reservations = this.loadReservations();
    newReservation.id =
      reservations.length > 0
        ? reservations[reservations.length - 1].id + 1
        : 1;
    reservations.push(newReservation);
    this.saveReservations(reservations);
    return newReservation;
  }

  static updateStatus(id, status) {
    const reservations = this.loadReservations();
    const index = reservations.findIndex(
      (reservation) => reservation.id === id
    );
    if (index === -1) return null;

    reservations[index].status = status;
    this.saveReservations(reservations);
    return reservations[index];
  }
}

module.exports = Reservation;
