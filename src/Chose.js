// une chose
export class Chose {
  constructor(libelle, fait = false) {
    this._libelle = libelle;
    this._fait = fait;
    this._id = Date.now() + Math.floor(Math.random() * 10); // génération d'un id
  }
  // ---- getters
  get libelle() {
    return this._libelle;
  }
  get id() {
    return this._id;
  }
  get fait() {
    return this._fait;
  }
  // ---- setters
  faire() {
    this._fait = !this._fait; // modifier fait / pas fait
  }
  // modifier le libelle
  set libelle(libelle) {
    this._libelle = libelle;
  }
  // -- toString
  toString() {
    return `--> ${this._libelle} (${this._fait ? "fait" : "à faire"})`;
  }
}
