const controller = require('./controller')

describe("test controller methods", () => {

    test("validate post should return false when I pass a client_id of string data type", () => {
        const validatePost = controller.validatePost
        expect(validatePost("123","test description","test city", "test country")).toBe(false)
    })

    test("validate post should return false when I pass a incident_desc of number data type", () => {
    const validatePost = controller.validatePost
        expect(validatePost(123,1234,"test city", "test country")).toBe(false)
    })

     test("validate post should return false when I pass a city of number data type", () => {
         const validatePost = controller.validatePost
         expect(validatePost(123,"test description",1234, "test country")).toBe(false)
    })

    
     test("validate post should return false when I pass a country of number data type", () => {
         const validatePost = controller.validatePost
         expect(validatePost(123,"test description","city", 1234)).toBe(false)
    })

    test("validate post should return true when I pass all the correct datatypes for the parameters", () => {
        const validatePost = controller.validatePost
        expect(validatePost(123,"test description","test city", "test country")).toBe(true)
    })

})