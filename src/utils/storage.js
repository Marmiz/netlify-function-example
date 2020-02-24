/**
 *
 * @param {string} key localStorage key to get
 */
export function checkStorage(key) {
  let item = localStorage.getItem(key);

  if(!item) return false;

  return true;
}

/**
 *
 * @param {string} key key to set
 * @param {any} val to set. It will be set an object with { data: val, time: new Date() }
 */
export function setStorageData(key, val) {
  localStorage.setItem(key, JSON.stringify({data: val, time: new Date() }))
}
