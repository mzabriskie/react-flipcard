// Checks to see if a parent element contains a child element
/* eslint no-param-reassign:0, no-cond-assign:0 */
module.exports = function contains(parent, child) {
  do {
    if (parent === child) {
      return true;
    }
  } while (child && (child = child.parentNode));
  return false;
};
