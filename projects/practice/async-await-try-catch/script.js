const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Back-End Development', className: 'backend' }
};

// 1 minute  = 60,000 ms
// 1 hour    = 3,600,000 ms
// 1 day     = 86,400,000 ms

const timeAgo = date => {
  const givenTime = new Date(date).getTime();
  const currentTime = Date.now();

  const timeDiff = currentTime - givenTime;

  if (timeDiff >= 86400000) {
    return `${Math.trunc(timeDiff / 86400000)}d ago`;
  }
  if (timeDiff >= 3600000) {
    return `${Math.trunc(timeDiff / 3600000)}h ago`;
  }
  if (timeDiff >= 60000) {
    return `${Math.trunc(timeDiff / 60000)}m ago`;
  }
}

const viewCount = views => {
  if (views < 1000) {
    return views;
  }
  return `${Math.trunc(views / 1000)}k`;
}

const forumCategory = id => {
  const category = allCategories[id];

  return `<a href="${forumCategoryUrl + (category ? category.className : "general") + "/" + id}" class="category ${category ? category.className : "general"}">${category ? category.category : "General"}</a>`
}

const avatars = (posters, users) => {
  const result = posters.map(poster => {
    const user = users.find(user => user.id === poster.user_id);
    let url = user.avatar_template.replace("{size}", "30");
    if (url.startsWith("/")) {
      url = avatarUrl + url
    }

    return `<img src="${url}" alt="${user.name}">`
  });

  return result.join("");
}

const showLatestPosts = obj => {
  const {users, topic_list} = obj;

  const result = topic_list.topics.map(topic => {
    const {
      id,
      title,
      slug,
      posts_count,
      views,
      bumped_at,
      category_id,
      posters
    } = topic;

    const firstTd = `<td>
      <a class="post-title" href="${forumTopicUrl + slug + "/" + id}">${title}</a>
      ${forumCategory(category_id)}
    </td>`;
    const secondTd = `<td>
      <div class="avatar-container">
        ${avatars(posters, users)}
      </div>
    </td>`;
    const thirdTd = `<td>
      ${posts_count - 1}
    </td>`;
    const fourthTd = `<td>
      ${viewCount(views)}
    </td>`;
    const fifthTd = `<td>
      ${timeAgo(bumped_at)}
    </td>`;

    return `<tr>
      ${firstTd}
      ${secondTd}
      ${thirdTd}
      ${fourthTd}
      ${fifthTd}
    </tr>`;
  });

  document.getElementById("posts-container").innerHTML = result.join("");
}

const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
    showLatestPosts(data);
  } catch(error) {
    console.log(error)
  }
}

fetchData();