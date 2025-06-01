import fs from "fs"
import {SaveFile} from "../../src/domain/use-cases/save-file.use-case"

describe("save-file.use-case", () => {

    afterEach(() => {
        //clea up
        fs.rmSync("outputs", {recursive:true})
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
})