'use strict';

//https://jsonplaceholder.typicode.com/posts?_limit=5&_page=2

const list = document.getElementById('list');
const footer = document.querySelector('.footer');

let posts = 5;
let page = 1;

const getPosts = async function (posts, page) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${posts}&_page=${page}`
    );

    const data = await res.json();
    renderPosts(data);
  } catch (err) {
    console.log(err);
  }
};

const renderPosts = function (arr) {
  const html = arr
    .map(post => {
      return `
      <li id="${post.id}">
        <div class="post">
            <h2 class="title">
                ${post.title}
            </h2>
            <p class="text">
                ${post.body}
            </p>
            <div class="id">${post.id}</div>
        </div>
      </li> `;
    })
    .join('');

  list.insertAdjacentHTML('beforeend', html);
};

const getNewSetPosts = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  getPosts(posts, page);

  page++;
};

const observer = new IntersectionObserver(getNewSetPosts, {
  root: null,
  rootMargin: '100px',
});

observer.observe(footer);

/* list.addEventListener('click', function (e) {
  console.log(e.target.closest('li').id);
}); */
