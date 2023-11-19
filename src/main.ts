import './app.css'
import MyListButton from './MyListButton.svelte'

const myList = document.querySelector('div[data-testid=drawerMyList]');

if (myList) {
  const element = document.createElement('div');
  myList.appendChild(element);

  new MyListButton({
    target: element,
  });
}
