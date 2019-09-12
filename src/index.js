import {
    GraphQLServer
} from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
// Scalar types - String, Booolean, Int, Float, ID, []

// Demo user data


const comments = [{
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

const users = [{
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

const posts = [{
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

// Type definitions { schema  }

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        createPost(data: CreatePostInput!): Post!
        createComment(data: CreateCommentInput!): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

`

// Resolvers

const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }
            return posts.filter(
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
        comments(parent, args, ctx, info) {
            return comments
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user =>  user.email === args.data.email)
            if (emailTaken) {
                throw new Error('Email Taken')
            }


            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user)

            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            if (!userExists) {
                throw new Error('User not found')
            }
            const post = {
                id: uuidv4(),
                ...args.data
            }
            posts.push(post)

            return post

        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            const postExists = posts.some((post) => (post.id === args.data.post) && (post.published))
            console.log(userExists, postExists)

            if (!userExists) {
                throw new Error('User not found')
            } else if (!postExists) {
                throw new Error('Post not found or its not published yet')
            }
            const comment = {
                id: uuidv4(),
                ...args.data
            }
            
            comments.push(comment)
            return comment
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id === parent.author)
        },
        comments(parent, args, ctx, info) {
            // console.log('parent', JSON.stringify(parent, null, 2))
            // console.log('args', JSON.stringify(args, null, 2))
            // console.log('ctx', JSON.stringify(ctx, null, 2))
            return comments.filter(comment => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return (post.author === parent.id)
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter(comment => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => {
                return parent.author === user.id
            })
        },
        post(parent, args, ctx, info) {
            return posts.find(post => {
                return parent.post === post.id
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('the server is up')
})
