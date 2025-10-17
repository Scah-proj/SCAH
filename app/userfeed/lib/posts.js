import posts from '../data/posts.json';

export async function getPosts() {
    return posts
}

export async function getPostById(id) {
    return posts.find(post => post.id === id);
}