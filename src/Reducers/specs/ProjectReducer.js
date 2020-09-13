import ProjectReducer from "../ProjectReducer"

import {
    LOADING_PROJECT, ERROR_PROJECT, CREATE_SUCCESS_PROJECT, DELETE_SUCCESS_PROJECT,
    UPDATE_SUCCESS_PROJECT, APPEND_SUCCESS_CURRENT_PROJECT, APPEND_SUCCESS_PROJECTS,
    SET_CURRENT_PROJECT
} from "../../Actions/ProjectActions"

const initialCurrentProject = {
    _id: "test id",
    name: "test project name",
    key: "test key",
    lead: "testUserId",
    members: ["testUserId"],
    image: "",
    issues: [],
    default_assignee: "Project Lead",
    start_date: ""
}
const initialState = {
    loading: false,
    authenticated: false,
    projects: [],
    errorMessage: "",
    currentProject: initialCurrentProject
}
const project = {
    "_id": "test id",
    name: "test project name"
}

describe.skip('Project Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(ProjectReducer(undefined, {})).toEqual(initialState)
    })

    it.skip('should handle LOADING_PROJECT', () => {
        const updatedState = { ...initialState, loading: true, authenticated: false }
        expect(
            ProjectReducer(undefined, { type: LOADING_PROJECT })
        ).toEqual(updatedState)
    })

    it('should handle SET_CURRENT_PROJECT', () => {
        const updatedState = { ...initialState, loading: false, authenticated: true, projects: [], currentProject: project }
        expect(
            ProjectReducer(undefined, { type: SET_CURRENT_PROJECT, data: project })
        ).toEqual(updatedState)
    })

    it('should handle CREATE_SUCCESS_PROJECT', () => {
        const updatedState = { ...initialState, loading: false, authenticated: true, projects: [project] }
        expect(
            ProjectReducer(undefined, { type: CREATE_SUCCESS_PROJECT, data: project })
        ).toEqual(updatedState)
    })

    describe('should handle DELETE_SUCCESS_PROJECT', () => {

        it('should handle clear the current project if the project to be delete is the current project', () => {
            const updatedState = { ...initialState, loading: true, authenticated: false, projects: [project], currentProject:initialCurrentProject }
            expect(
                ProjectReducer(updatedState, { type: DELETE_SUCCESS_PROJECT, id: project._id })
            ).toEqual({ ...initialState, loading: false, authenticated: true, currentProject: {} })
        })

        it('should just delete the project if the project to be delete is not the current project', () => {
            const updatedState = { ...initialState, loading: true, authenticated: false, projects: [project] }
            expect(
                ProjectReducer(updatedState, { type: DELETE_SUCCESS_PROJECT, id: project._id })
            ).toEqual({ ...initialState, loading: false, authenticated: true, })
        })
    })

    it('should handle APPEND_SUCCESS_PROJECTS', () => {
        const updatedState = { ...initialState, loading: false, authenticated: true, projects: [project] }
        expect(
            ProjectReducer(undefined, { type: APPEND_SUCCESS_PROJECTS, data: [project] })
        ).toEqual(updatedState)
    })

    describe('should handle UPDATE_SUCCESS_PROJECT', () => {
        it('should handle clear the current project if the project to be delete is the current project', () => {
            const anotherProject = { "_id": "2", "name": "test name 2" }
            const updatedProject = { ...initialCurrentProject, name: "name updated" }
            const beforeState = { ...initialState, loading: false, authenticated: true, projects: [updatedProject,anotherProject ] }
            const afterState = { ...initialState, loading: false, authenticated: true, projects: [updatedProject], currentProject:project }
            expect(
                ProjectReducer(beforeState, { type: UPDATE_SUCCESS_PROJECT, data: anotherProject._id})
            ).toEqual(afterState)
        })




    })


    describe('should handle ERROR_PROJECT', () => {
        it('should handle clear the current project if the project to be delete is the current project', () => {
            const updatedState = { ...initialState, loading: false, authenticated: false, errorMessage: "err" }
            expect(
                ProjectReducer(undefined, { type: ERROR_PROJECT, data: "err" })
            ).toEqual(updatedState)
        })


        ERROR_PROJECT

    })
})