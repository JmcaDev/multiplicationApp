
import { ServerApp } from "../src/presentation/server-app"

describe("App", () => {
    test("Should call Server.run with values", async () => {
        const serverRunMock = jest.fn()
        ServerApp.run = serverRunMock
        process.argv= ["node", "app.ts", "-b", "10", "-l", "5", "-s", "-n", "test-file", "-d", "test-path"]
        await import("../src/app")

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            fileDestination: "test-path",
            fileName: "test-file",
            limit: 5,
            showTable: true,
        })

    })
})