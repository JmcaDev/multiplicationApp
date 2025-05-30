import fs from "node:fs"
import { yarg } from "../src/config/plugins/args.plugin"

const { b:base, l:limit, s:showTable} = yarg

let outputMessage = ""
const headerMessage = `
===========================
    Tabla del ${base}
===========================\n
`

for (let index = 1; index <= limit; index++) {
    outputMessage += `${base} X ${index} = ${base * index}\n`
}
outputMessage = headerMessage + outputMessage

if( showTable ) console.log(outputMessage)

const outputPath = `outputs/`

fs.mkdirSync(outputPath, {recursive: true})
fs.writeFile(`${outputPath}/tabla-${base}.txt`, outputMessage, (error) => {
    if(error){
        console.log(error)
    }
})
console.log("File created")