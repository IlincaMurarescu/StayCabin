const fs = require("fs");
const path = require("path");

const cabinsFile = path.join(__dirname, "..", "data", "cabins.json");

class Cabin {
  static loadCabins() {
    return JSON.parse(fs.readFileSync(cabinsFile, "utf8"));
  }

  static saveCabins(cabins) {
    fs.writeFileSync(cabinsFile, JSON.stringify(cabins, null, 2));
  }

  static getAll() {
    return this.loadCabins();
  }

  static getById(id) {
    const cabins = this.loadCabins();
    return cabins.find((cabin) => cabin.id === id);
  }

  static getByOwnerId(ownerId) {
    const cabins = this.loadCabins();
    return cabins.filter((cabin) => cabin.owner_id === ownerId);
  }

  static create(newCabin) {
    const cabins = this.loadCabins();
    newCabin.id = cabins.length > 0 ? cabins[cabins.length - 1].id + 1 : 1;
    cabins.push(newCabin);
    this.saveCabins(cabins);
    return newCabin;
  }

  static update(id, updatedData) {
    const cabins = this.loadCabins();
    const index = cabins.findIndex((cabin) => cabin.id === id);
    if (index === -1) return null;

    cabins[index] = { ...cabins[index], ...updatedData };
    this.saveCabins(cabins);
    return cabins[index];
  }

  static delete(id) {
    let cabins = this.loadCabins();
    const initialLength = cabins.length;
    cabins = cabins.filter((cabin) => cabin.id !== id);

    if (cabins.length === initialLength) return false;

    this.saveCabins(cabins);
    return true;
  }
}

module.exports = Cabin;
