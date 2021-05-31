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
        getUserTemplates: [Template]
        getTemplates: [Template]
        getTemplate(templateId: ID!): Template 
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
    type Template {
        id: ID!
        userId: ID
        createdAt: String!
        title: String!
        input1Type: String!
        input1Collection: String!
        input2Type: String
        input2Collection: String
        input3Type: String
        input3Collection: String
        input4Type: String
        input4Collection: String
        input5Type: String
        input5Collection: String
        input6Type: String
        input6Collection: String
        input7Type: String
        input8Collection: String
        tasks: [TemplateTask]
    }
    type TemplateTask {
        id: ID!
        templateId: ID!
        name: String!
        createdAt: String!
        days: String
        from: String
        beforeOrAfter: String
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
    input TemplateInput {
        title: String!
        input1Type: String!
        input1Collection: String!
        input2Type: String
        input2Collection: String
        input3Type: String
        input3Collection: String
        input4Type: String
        input4Collection: String
        input5Type: String
        input5Collection: String
        input6Type: String
        input6Collection: String
        input7Type: String
        input7Collection: String
    }
    input TemplateTaskInput {
        templateId: ID!
        name: String!
        days: String
        from: String
        beforeOrAfter: String
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
        createTemplate(templateInput: TemplateInput): Template!
        deleteTemplate(templateId: ID!): String!
        createTemplateTask(templateTaskInput: TemplateTaskInput): Template!
        deleteTemplateTask(templateId: ID!, templateTaskId: ID!): String!
    }
`;