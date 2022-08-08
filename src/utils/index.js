const isProduction = () => {
  return !window.location.href.match("localhost");
};

export default isProduction() ? "https://sell-my-stuff-456852.herokuapp.com" : "http://localhost:8080";
