import "./app.css"
import Button from "./lib/Button.svelte";
import MyListButton from "./lib/MyListButton.svelte"

const myList = document.querySelector("div[data-testid=drawerMyList]");

if (myList) {
  const element = document.createElement("div");
  myList.appendChild(element);

  new MyListButton({
    target: element,
  });
}

const test = document.querySelector(".locaties-test");

if (test) {
  new Button({
    target: test,
  });
}