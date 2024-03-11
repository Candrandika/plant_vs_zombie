document.addEventListener("mousemove", (e) => {
  selectGrid(e);
});
document.addEventListener("click", (e) => {
  plantListOnClick();
  gridOnClick();
  clickedPlayer();
});
document.addEventListener("keydown", (e) => {});
