let errors = []
let warnings = []
let informations = []


document.querySelector('#load').addEventListener('click', async () => {
    if(errors.length > 0 || warnings.length > 0 || informations.length > 0) {
        errors = []
        warnings = []
        informations = []
    }
    let result = await window.FileDialogAPI.openFileDialog()

    if (result.filePaths.length > 0) {
        document.getElementById('filepath').value = result.filePaths[0]
        await FileReaderAPI.readFile(result.filePaths[0])
        .then((data) => {
            const lines = data.split('\n')
            for(const line of lines) {
                if(line.includes('Error')) {
                    errors.push(line.split(':           ')[1])
                } else if(line.includes('Warning')) {
                    warnings.push(line.split(':       ')[1])
                } else if(line.includes('Information')) {
                    informations.push(line.split(': ')[1])
                }
            }
            elementCreator(errors, 'errors')
            elementCreator(warnings, 'warnings')
            elementCreator(informations, 'informations')
        })
        .catch((error) => {
            console.log(error)
        })
    }
})


function elementCreator(array, id) {
    let elementContent = ''

    for(let i = 0; i < array.length; i++) {
        elementContent += array[i] + '<br>'
    }
    if(elementContent.length === 0) {
        document.getElementById(id).innerHTML = '-'
    } else {
        document.getElementById(id).innerHTML = elementContent
    }
}

