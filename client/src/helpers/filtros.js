export const tipos = (type, array) => {
    
    if (array.length) return array.filter((p) => p.type.includes(type));
    return [];
  };
  
  export const ordered = (order, array) => {
    let names = array.map((o) => o.name);
    let attack = array.map((o) => o.attack);
    let orde = [];
  
    switch (order) {
      case "a-z":
        names = names.sort();
        names.forEach((p) => {
          array.forEach((po) => {
            if (p === po.name) orde.push(po);
          });
        });
        return orde;
      case "z-a":
        names = names.sort().reverse();
        names.forEach((p) => {
          array.forEach((po) => {
            if (p === po.name) orde.push(po);
          });
        });
        return orde;
      case "fuerza+":
        attack = attack.sort((a, b) => b - a);
        attack.forEach((f) => {
          array.forEach((p) => {
            if (p.attack === f) orde.push(p);
          });
        });
        orde = orde.filter((e, i) => orde.indexOf(e) === i);
        return orde;
      case "fuerza-":
        attack = attack.sort((a, b) => a - b);
        attack.forEach((f) => {
          array.forEach((p) => {
            if (p.attack === f) orde.push(p);
          });
        });
        orde = orde.filter((e, i) => orde.indexOf(e) === i);
        return orde;
      default:
        return array;
    }
  };
  export const creado = (filters, array) => {
    let id = array.map((o) => o.id);

    let cre = [];
  
    switch (filters) {

      case "1":
        id = id.sort();
        id.forEach((p) => {
          array.forEach((po) => {
            if (id.length < 10) cre.push(po);
          });
        });
        return cre;
      case "2":
        id = id.sort((a, b) => a - b);
        id.forEach((f) => {
          array.forEach((p) => {
            if (p.attack === f) cre.push(p);
          });
        });
        cre = cre.filter((e, i) => cre.indexOf(e) === i);
        return cre;
      default:
        return array;
    }
  };