import { CreateTable } from "../../src/domain/use-cases/create-table.use-case"
import { SaveFile } from "../../src/domain/use-cases/save-file.use-case"
import {ServerApp} from "../../src/presentation/server-app"

describe("Server-App",  () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: "test-destination",
        fileName: "test-filename"
    }

    test("Should create a ServerApp instance", () => {
        const serverApp = new ServerApp()
        expect(serverApp).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run).toBe("function")
    })

    test("Should run ServerApp with options", () => {

        // const logSpy = jest.spyOn(console, "log")
        // const createTableSpy = jest.spyOn(CreateTable.prototype, "execute")
        // const saveFileSpy = jest.spyOn(SaveFile.prototype, ("execute"))

        

        // ServerApp.run(options)

        // expect(logSpy).toHaveBeenCalledTimes(2)
        // expect(logSpy).toHaveBeenCalledWith("Server running...")
        // expect(logSpy).toHaveBeenCalledWith("File created")

        // expect(createTableSpy).toHaveBeenCalledTimes(1)
        // expect(createTableSpy).toHaveBeenCalledWith({base: options.base, limit: options.limit})

        // expect(saveFileSpy).toHaveBeenCalledTimes(1)
        // expect(saveFileSpy).toHaveBeenCalledWith({
        //     fileContent: expect.any(String),
        //     fileDestination: options.fileDestination,
        //     fileName: options.fileName
        // })
    })

    test("Should run with custom values mocked", () => {

        const logMock = jest.fn()
        const logErrorMock = jest.fn()
        const createTableMock = jest.fn().mockReturnValue("1 x 1 = 1")
        const saveFileMock = jest.fn().mockReturnValue(true)

        console.log = logMock
        console.error = logErrorMock
        CreateTable.prototype.execute = createTableMock
        SaveFile.prototype.execute = saveFileMock

        ServerApp.run(options)

        expect(logMock).toHaveBeenCalledWith("Server running...")
        expect(createTableMock).toHaveBeenCalledWith({"base": options.base, "limit": options.limit})
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: "1 x 1 = 1",
            fileDestination: options.fileDestination,
            fileName: options.fileName
        })
        expect(logMock).toHaveBeenCalledWith("File created")
        expect(logErrorMock).not.toHaveBeenCalled()
    })
})