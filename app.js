document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  let width = 10
  let squares = []
  let bombAmount = 20

  // create Board
  function createBoard() {
    // get shuffled game array with random bombs
    // 20 squares contain 'bomb'
    const bombArray = Array(bombAmount).fill('bomb')
    // rest = 80 squares contain 'valid'
    const emptyArray = Array(width*width - bombAmount).fill('valid')
    // concat the 2 arrays from above
    const gameArray = emptyArray.concat(bombArray)
    // randomize the gameArray to shuffle bombs around the grid
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

    // create 100 square field divs
    for(let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      // add numbered id to them
      square.setAttribute('id', i)
      // add 'bomb' or 'valid' to each field
      square.classList.add(shuffledArray[i])
      // place divs inside grid
      grid.appendChild(square)
      // push all squares into above defined squares array
      squares.push(square)
    }
  }
  createBoard()

})