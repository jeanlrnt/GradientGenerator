const colorLabels = [...document.querySelectorAll(".input-group label")]
const colorPickerInputs = [...document.querySelectorAll("input[type='color']")]
const rangeLabelValue = document.querySelector(".orientation-value")

const gradientData = {
    orientation: "90",
    colors: ["#FF5F6D", "#FFC371"]
}

function populateUI() {
    colorLabels[0].textContent = gradientData.colors[0]
    colorLabels[1].textContent = gradientData.colors[1]

    colorPickerInputs[0].value = gradientData.colors[0]
    colorPickerInputs[1].value = gradientData.colors[1]

    colorLabels[0].style.background = gradientData.colors[0]
    colorLabels[1].style.background = gradientData.colors[1]

    document.body.style.background = `linear-gradient(${gradientData.orientation}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`

    rangeLabelValue.textContent = `${gradientData.orientation}°`

    colorLabels.forEach((label, index) => {
        label.style.color = getInputColor(gradientData.colors[index])
    })
}

function getInputColor(hexColor) {
    const red = parseInt(hexColor.substring(1, 3), 16)
    const green = parseInt(hexColor.substring(3, 5), 16)
    const blue = parseInt(hexColor.substring(5, 7), 16)
    // calculate the relative luminance (yiq)
    if ((red*0.299 + green*0.587 + blue*0.114) > 128) {
        return "#000000"
    }
    return  "#ffffff"
}

const rangeInput = document.querySelector("input[type='range']")

rangeInput.addEventListener("input", handleOrientation)

function handleOrientation() {
    gradientData.orientation = rangeInput.value
    populateUI()
}

colorPickerInputs.forEach((input, index) => {
    input.addEventListener("input", handleColorChange)
})

function handleColorChange(e) {
    const currentIndex = colorPickerInputs.indexOf(e.target)

    gradientData.colors[currentIndex] = e.target.value.toUpperCase()
    populateUI()
}

const copyButton = document.querySelector(".copy-btn")
copyButton.addEventListener("click", handleCopy)

let lock = false
function handleCopy() {
    const gradient = `linear-gradient(${gradientData.orientation}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`

    navigator.clipboard.writeText(gradient)

    if(lock) return
    lock = true
    copyButton.classList.add("active")

    setTimeout(() => {
        copyButton.classList.remove("active")
        lock = false
    }, 1500)
}

const randomGradientButton = document.querySelector(".random-btn")
randomGradientButton.addEventListener("click", createRandomGradient)

function createRandomGradient() {
    for (let i = 0; i < colorLabels.length; i++) {
        gradientData.colors[i] = `#${Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}`
    }
    gradientData.orientation = Math.floor(Math.random() * 360)
    rangeInput.value = gradientData.orientation

    populateUI()
}

createRandomGradient()
