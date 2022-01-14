class Transformation { 
  constructor(_transformation) {
    this._transformation = _transformation || [];
  }

  and(transformation) {
    if(transformation instanceof Transformation) {
      return new Transformation([...this._transformation, ...transformation.getTransformation()]);
    }
    throw new Error("Argument Should Be Instance of Transformation");
  }

  getTransformation() {
    return this._transformation;
  }
}

export default Transformation;