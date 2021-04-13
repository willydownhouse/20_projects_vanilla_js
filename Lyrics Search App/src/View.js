export default class View {
  _parentElement = document.getElementById('results');
  _btnElement;

  addHandler(handler) {
    this._btnElement.addEventListener('click', function () {
      handler();
    });
  }
}
