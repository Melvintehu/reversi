class Node {
  constructor(object) {
    this.neighbors = [];
    for(let attribute in object) {
      this[attribute] = object[attribute];
    }
  }

  measureDistances(area_range_obj, rooms_range_obj) {
    var rooms_range = rooms_range_obj.max - rooms_range_obj.min;
    var area_range = area_range_obj.max - area_range_obj.min;

    for(let i in this.neighbors) {
      var neighbor = this.neighbors[i];

      var delta_rooms = neighbor.rooms - this.rooms;
      delta_rooms = ( delta_rooms ) / rooms_range;

      var delta_area = neighbor.area - this.area;
      delta_area = ( delta_area ) / area_range;

      neighbor.distance = Math.sqrt(delta_rooms * delta_rooms + delta_area*delta_area);
    }

  }

  sortByDistance() {
    this.neighbors.sort((a, b) => {
      return a.distance - b.distance;
    });
  }

  guessType(k) {
    var types = {};

    for (let i in this.neighbors.slice(0, k))
    {
      let neighbor = this.neighbors[i];

      if ( ! types[neighbor.type]) {
        types[neighbor.type] = 0;
      }
      types[neighbor.type] += 1;
    }

    let guess = { type: false, count: 0 };

    for (let type in types ) {
      if(guess.count < types[type]) {
        guess.type = type;
        guess.count = types[type];
      }
    }

    this.guess = guess;
    return types;
  }

}

export default Node;