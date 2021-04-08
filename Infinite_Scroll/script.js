'use strict';

//https://jsonplaceholder.typicode.com/posts?_limit=5&_page=2

const list = document.getElementById('list');
const footer = document.querySelector('.footer');
const input = document.getElementById('input-filter');
const spinner = document.querySelector('.spinner');
const spinIcon = document.getElementById('spin-icon');

let posts = 5;
let page = 1;
const postsArray = [];

const getPosts = async function (posts, page) {
  try {
    spinner.classList.remove('hidden');

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${posts}&_page=${page}`
    );

    const data = await res.json();

    postsArray.push(...data);
    renderPosts(data);
  } catch (err) {
    console.log(err);
  }
};

const renderPosts = function (arr) {
  spinner.classList.add('hidden');

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
  rootMargin: '0px',
});

observer.observe(footer);

/* event listeners */

input.addEventListener('input', function (e) {
  observer.unobserve(footer);

  list.innerHTML = '';

  const arr = postsArray.filter(
    post =>
      post.title.includes(e.target.value) || post.body.includes(e.target.value)
  );
  renderPosts(arr);
});

input.addEventListener('blur', function (e) {
  observer.observe(footer);
});
