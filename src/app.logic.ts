import fs from "node:fs"

let outputMessage = ""
const numeroTabla =10
const headerMessage = `
===========================
    Tabla del ${numeroTabla}
===========================\n
`

for (let index = 1; index <= 10; index++) {
    outputMessage += `${numeroTabla} X ${index} = ${numeroTabla * index}\n`
}
outputMessage = headerMessage + outputMessage
console.log(outputMessage)

const outputPath = `outputs/`

fs.mkdirSync(outputPath, {recursive: true})
fs.writeFile(`${outputPath}/tabla-${numeroTabla}.txt`, outputMessage, (error) => {
    if(error){
        console.log(error)
    }
})