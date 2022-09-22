const getDiceRollArray = (diceCount) => {
    return new Array(diceCount).fill(0).map((num) => {
        return Math.floor(Math.random() * 6) + 1
    })
}

const getDicePlaceholderHtml = (diceCount) => {
    return new Array(diceCount)
        .fill(0)
        .map(() => {
            return `<div class="placeholder-dice"></div>`
        })
        .join("")
}

const getPercentage = (remainingHealth, maximumHealth) => {
    return (100 * remainingHealth) / maximumHealth
}

export { getDiceRollArray, getDicePlaceholderHtml, getPercentage }
