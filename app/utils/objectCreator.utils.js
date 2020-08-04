
exports.createObject = (objectKey) => {
    let keys = Object.keys(objectKey);
    let data = [];
    for (let k in keys) {
      var keyName = keys[k];
      data.push(objectKey[keyName]);
    }
    return data; 
  };