import { characterData } from "./data.js"
import { Character } from "./Character.js"

let monstersArray = ["monster", "demon", "goblin"]
let isWaiting = false

const render = () => {
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
    document.getElementById("monster").innerHTML = monster.getCharacterHtml()
    isWaiting = false
}

const attack = () => {
    if (!isWaiting) {
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()

        if (wizard.dead) {
            endGame()
        } else if (monster.dead) {
            if (monstersArray.length > 0) {
                isWaiting = true
                setTimeout(() => {
                    monster = getNewMonster()
                    render()
                }, 1500)
            } else {
                endGame()
            }
        }
    }
}

const endGame = () => {
    const endMessage =
        wizard.dead && monster.dead
            ? "No victors - all creatures are dead"
            : monster.dead
            ? "The Wizard Wins"
            : "The monsters are Victorious"
    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
    isWaiting = true

    setTimeout(() => {
        document.body.innerHTML = `
        <div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>
    `
    }, 1500)
}

const getNewMonster = () => {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()

document.getElementById("attack-button").addEventListener("click", attack)
render()
