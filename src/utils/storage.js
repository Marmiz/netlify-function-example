/**
 *
 * @param {string} key localStorage key to get
 */
export function checkStorage(key) {
  let item = localStorage.getItem(key);

  if(!item) return false;

  // we force check after 20m have passed
  const { time } = JSON.parse(item);
  const then = new Date(time);
  const now = new Date();

  const diffInMinutes = ( now.getTime() - then.getTime() ) / (1000 * 60);

  return (diffInMinutes < 20);
}

/**
 *
 * @param {string} key key to set
 * @param {any} val to set. It will be set an object with { data: val, time: new Date() }
 */
export function setStorageData(key, val) {
  localStorage.setItem(key, JSON.stringify({data: val, time: new Date() }))
}
