export const getCookie = (key) => {
  let cookies = document.cookie;
  let cookiesArr = cookies.split(';')
  for (let index = 0; index < cookiesArr.length; index++) {
    const cookie = cookiesArr[index].trim();
    const [cookie_key, value] = cookie.split('=');
    if (cookie_key === key) {
      return value;
    }
  }
  return "";
}