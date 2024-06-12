/**
 * get random string
 * @author mebtte<i@mebtte.com>
 */
function getRandomString() {
  return Math.random().toString(36).substring(2, 8);
}

export default getRandomString;
