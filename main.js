const elUserList = document.querySelector(".users");
const elPostList = document.querySelector(".posts");
const elCommentList = document.querySelector(".comments");
const elTemplate = document.querySelector(".template").content;
const elPostsTemplate = document.querySelector(".post-template").content;
const elCommentsTemplate = document.querySelector(".comment-template").content;
// const elPostBtn = document.querySelector(".posts");
const elCommentBtn = document.querySelector(".commentsbtn");
console.log(elCommentBtn);
const newFragment = document.createDocumentFragment();

// users render fn
async function usersList() {
    elUserList.innerHTML = "";
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        // console.log(data);
        data.forEach(element => {
            
            let clonedTemplate = elTemplate.cloneNode(true);
            clonedTemplate.querySelector(".posts").dataset.id = element.id

            clonedTemplate.querySelector(".username").textContent = element.username;
            clonedTemplate.querySelector(".fullname").textContent = element.name;
            clonedTemplate.querySelector(".userid").textContent = element.id;
            
            let geolocation = Object.values(element.address.geo)
            clonedTemplate.querySelector(".location").href = `https://www.google.com/maps/place/${geolocation}`;
            clonedTemplate.querySelector(".street").textContent = element.address.street;
            clonedTemplate.querySelector(".home-nuber").textContent = element.address.suite;
            clonedTemplate.querySelector(".city").textContent = element.address.city;
            clonedTemplate.querySelector(".postal").textContent = element.address.zipcode;
            
            clonedTemplate.querySelector(".company-name").textContent = element.company.name;
            clonedTemplate.querySelector(".company-catch").textContent = element.company.catchPhrase;
            clonedTemplate.querySelector(".company-bs").textContent = element.company.bs;
            
            clonedTemplate.querySelector(".phone").textContent = element.phone;
            clonedTemplate.querySelector(".phone").href = `tel:+${element.phone}`;
            
            clonedTemplate.querySelector(".site").textContent = element.website;
            clonedTemplate.querySelector(".site").href = element.website;
            
            clonedTemplate.querySelector(".email").textContent = element.email;
            clonedTemplate.querySelector(".email").href = `mailto:${element.email}`;
            
            
            newFragment.appendChild(clonedTemplate)
        });
        elUserList.appendChild(newFragment)
        
    } catch (error) {
        console.log(error);
    }
}

usersList()

// posts
async function showPosts(param) {
    elPostList.innerHTML = "";
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${param}`)
        const data = await res.json();
        data.forEach(item => {
            let clonedPostTemplate = elPostsTemplate.cloneNode(true);
            clonedPostTemplate.querySelector(".post-item").dataset.id = item.id;
            clonedPostTemplate.querySelector(".post-name").textContent = item.title;
            clonedPostTemplate.querySelector(".post-id").textContent = item.id;
            clonedPostTemplate.querySelector(".post-body").textContent = item.body;
            clonedPostTemplate.querySelector(".commentsbtn").dataset.id = item.id;

            newFragment.appendChild(clonedPostTemplate);
        })
        elPostList.appendChild(newFragment)
        
    } catch (error) {
        console.log(error);
    }
}

elUserList.addEventListener("click", function (evt) {
    elCommentList.innerHTML = "";
    if (evt.target.matches(".posts")) {
        let userId = evt.target.dataset.id;
        showPosts(userId)
    }
})


// comments
async function showComments(num) {
    elCommentList.innerHTML = "";
    try {
        elCommentList.innerHTML = "";
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${num}`)

        const data = await res.json();

        data.forEach(item => {
            let clonedCommentTemplate = elCommentsTemplate.cloneNode(true);
            // clonedCommentTemplate.querySelector(".comments-item").dataset.id = item.userId;
            
            clonedCommentTemplate.querySelector(".comments-name").textContent = item.title;
            clonedCommentTemplate.querySelector(".comments-email").textContent = item.email;
            clonedCommentTemplate.querySelector(".comments-email").href = `mailto:${item.email}`;

            clonedCommentTemplate.querySelector(".comments-id").textContent = item.id;
            clonedCommentTemplate.querySelector(".comments-body").textContent = item.body;
            
            newFragment.appendChild(clonedCommentTemplate);
        })
        elCommentList.appendChild(newFragment) 
    } catch (error) {
        console.log(error);
    }
}

elPostList.addEventListener("click", function (evt) {
  if (evt.target.matches(".commentsbtn")) {
    let postId = evt.target.dataset.id;
    showComments(postId)
  }
})

