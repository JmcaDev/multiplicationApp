import fs from "fs"
import {SaveFile} from "../../src/domain/use-cases/save-file.use-case"

describe("save-file.use-case", () => {

    afterAll(() => {
        //clea up
        fs.rmSync("outputs", {recursive:true})
        fs.rmSync("custom-outputs", {recursive:true})
    })

    test("Should save file with default values", () => {
        const filePath = "outputs/table.txt"
        const saveFile = new SaveFile()
        const options = {
            fileContent: "test content"
        }

        const result = saveFile.execute(options)
        const checkFile = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, {encoding: "utf-8"})

        expect(result).toBe(true)
        expect(checkFile).toBe(true)
        expect(fileContent).toBe(options.fileContent)
    })

    test("Should save file with custom values", () => {
        const options ={
            fileContent: "custom content",
            fileDestination: "custom-outputs/file-destination",
            fileName: "custom-table-name"
        }
        const saveFile = new SaveFile()

        const path = `${options.fileDestination}/${options.fileName}.txt`

        const result = saveFile.execute(options)
        const checkFile = fs.existsSync(path)
        const fileContent = fs.readFileSync(path, {encoding: "utf-8"})

        expect(result).toBe(true)
        expect(checkFile).toBe(true)
        expect(fileContent).toBe(options.fileContent)
    })

    test("Should return false if directory could not be created", () => {

        const options = {
            fileContent: "test content"
        }

        const saveFile = new SaveFile()
        const mkdirMock = jest.spyOn(fs, "mkdirSync").mockImplementation( () => {throw new Error('This is a custom error message from testing from test "Should return false if directory could not be created"')})

        const result = saveFile.execute(options)
        expect(result).toBe(false)

        mkdirMock.mockRestore()
    })

    test("Should return false if file could not be created", () => {

        const options = {
            fileContent: "test content"
        }

        const saveFile = new SaveFile()
        const mkdirMock = jest.spyOn(fs, "writeFileSync").mockImplementation( () => {throw new Error('This is a custom error message from testing from test "Should return false if file could not be created"')})

        const result = saveFile.execute(options)
        expect(result).toBe(false)

        mkdirMock.mockRestore()
    })
})