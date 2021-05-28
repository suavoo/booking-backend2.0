const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        getArtists: [Artist]
        getArtist(artistId: ID!): Artist
        getVenues: [Venue]
        getVenue(venueId: ID!): Venue
        getProjects: [Project]
        getProject(projectId: ID!): Project
        getTasks: [Task]
        getTask(projectId: ID!, taskId: ID!): Task
        getBlueprints: [Blueprint]
        getBlueprint(blueprintId: ID!): Blueprint
    }
    type Artist {
        id: ID!
        name: String!
        userId: ID!
        createdAt: String!
        genre: String!
        technik: String!
        tel: String!
        email: String!
        page: String!
        iban: String!
        prozente: Int!
    }
    type Venue {
        id: ID!
        name: String!
        userId: ID!
        createdAt: String!
        adress: String!
        city: String!
        region: String!
        country: String!
        contactname: String!
        tel: String!
        email: String!
        technik: String!
        time: String!
        note: String!
    }
    type Project {
        id: ID!
        userId: ID!
        createdAt: String!
        artist: String!
        venue: String!
        date: String!
        time: String!
        projectType: String!
        result: String!
        note1: String!
        note2: String!
        gage: String!
        tasks: [Task]!
        taskCount: Int!
    }
    type Task {
        id: ID!
        name: String!
        projectId: String!
        createdAt: String!
        artist: String!
        venue: String!
        date: String!
        time: String!
        projectType: String!
        done: Boolean!
        duedate: String!
        note: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        createdAt: String!
    }
}
    type Blueprint {
        id: ID!
        access: {
            users: String!
            userId: ID
        }
        createdAt: String!
        projectType: String!
        title: String!
        input1: {
            input: String,
            collection: String
        }
        input2: {
            input: String,
            collection: String
        },
        input3: {
            input: String,
            collection: String
        }
        input4: {
            input: String,
            collection: String
        }
        input5: {
            input: String,
            collection: String
        }
        input6: {
            input: String,
            collection: String
        }
        input7: {
            input: String,
            collection: String
        }    
    input RegisterInput {
        email: String!
        password: String!
        confirmPassword: String!
    }
    input ArtistInput {
        name: String!
        genre: String
        technik: String
        tel: String
        email: String
        page: String 
        iban: String
        prozente: Int
    }
    input VenueInput {
        name: String!
        adress: String
        city: String
        region: String
        country: String
        contactname: String
        tel: String
        email: String
        technik: String
        time: String
        note: String
    }
    input ProjectInput {
        artist: String!
        venue: String!
        date: String!
        time: String
        projectType: String!
        result: String
        note1: String
        note2: String
        gage: String
    }
    input TaskInput {
        projectId: String!
        name: String!
        done: Boolean!
        duedate: String!
        note: String 
    }
    type Mutation {
        register(registerInput: RegisterInput) : User!
        login(email: String!, password: String!) : User!
        createArtist(artistInput: ArtistInput): Artist!
        deleteArtist(artistId: ID!): String!
        createVenue(venueInput: VenueInput) : Venue!
        deleteVenue(venueId: ID!): String!
        createProject(projectInput: ProjectInput): Project!
        deleteProject(projectId: ID!): String!
        createTask(taskInput: TaskInput): Project!
        deleteTask(projectId: ID!, taskId: ID!): Project!
        createBlueprint(blueprinInput: BlueprintInput): Blueprint!
        deleteBlueprint(blueprintId: ID!): String!
        createBlueprintTask(blueprintTaskInput: BlueprintTaskInput): BlueprintTask!
        deleteBlueprintTask(blueprintTaskId: ID!): String!
    }
`;