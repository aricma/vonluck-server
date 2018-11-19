const checkObjctForKey = (object, key) => {
  return new Promise((resolve, reject) => {
    if (!object[key]) {
      const ObjectHasNoKey = Error(`The Object "${object}" has no Key "${key}"`)
      // console.error(ObjectHasNoKey);
      return reject(ObjectHasNoKey)
    } else return resolve(true)
  })
}

const checkKeyType = (key, type) => {
  return new Promise((resolve, reject) => {
    if (!(typeof key === type)) {
      const KeyHasTheWrongType = Error(`The Key "${key}" is not of type "${type}"`)
      // console.error(ObjectHasNoKey);
      return reject(KeyHasTheWrongType)
    } else return resolve(true)
  })
}

const checkObejctForStructure = (object, structure) => {
  /*
  STRUCTURE OF STRUCTURE
    [
      {
        key: '',
        type: '',
      },
      ...
    ]
  */
  return new Promise((resolve, reject) => {
    structure.forEach(({key, type},i) => {
      checkObjctForKey(object, key)
        .then((res) => {
          checkKeyType(key, type)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
    })
  })
}

module.exports = {
  checkObjctForKey,
  checkKeyType,
  checkObejctForStructure,
};
