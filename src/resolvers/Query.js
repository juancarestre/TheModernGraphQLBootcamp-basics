const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users
        }
        return db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
    },
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts
        }
        return db.posts.filter(
            post => (
                post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                post.body.toLowerCase().includes(args.query.toLowerCase())
            ))
    },
    me() {
        return {
            id: '123213',
            name: 'Mike',
            email: 'ja@sdas.com'
        }
    },
    post() {
        return {
            id: '12311111',
            title: 'testing',
            body: 'i love u',
            published: true
        }
    },
    comments(parent, args, { db }, info) {
        return db.comments
    }
}

export { Query as default }