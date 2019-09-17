let comments = [{
    id: '11',
    text: 'tumadre1',
    author: '1',
    post: '1'
}, {
    id: '22',
    text: 'tupadre14',
    author: '2',
    post: '2'
},{
    id: '33',
    text: 'tuabuelo55',
    author: '3',
    post: '2'
}, {
    id: "44",
    text: 'tu inmortal',
    author: '1',
    post: '3'
}]

let users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'peto',
    email: 'peto@exa.com',
    age: 24
}]

let posts = [{
    id: '1',
    title: 'post 1',
    body: 'no body nobody',
    published: false,
    author: '1'
}, {
    id: '2',
    title: 'post 2',
    body: 'no body nobody2',
    published: true,
    author: '2'

}, {
    id: '3',
    title: 'post 3',
    body: 'no body nobody3',
    published: false,
    author: '2'
}]

const db = {
    users,
    comments,
    posts
}

export { db as default }