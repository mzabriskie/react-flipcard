module.exports = function classSet(classNames) {
  let result = null;
  if (typeof classNames === 'object') {
    result = Object.keys(classNames).filter((className) => {
      return classNames[className];
    }).join(' ');
  } else {
    result = Array.prototype.join.call(arguments, ' ');
  }
  return result;
};
