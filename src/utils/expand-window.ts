const expandWindow = () => {
  if (!window.Telegram.WebApp.isExpanded) {
    window.Telegram.WebApp.expand();
  }
};

export default expandWindow;
