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
      // add 'bomb' or 'valid' class to each field
      square.classList.add(shuffledArray[i])
      // place divs inside grid
      grid.appendChild(square)
      // push all squares into above defined squares array
      squares.push(square)
    }

    // add numbers (numbers show up on fields when there's bombs around it - represents number of bombs around that field)
    for (let i = 0; i < squares.length; i++) {
      let total = 0
      // edge cases would count in squares on the other side as 'around them' - we don't want that
      // define left edge e.g. number 10 if it's remainder of division through width (10) = 0 then it's on the left
      const isLeftEdge = (i % width === 0)
      const isRightEdge = (i % width === width - 1)

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
        if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++
        if (i > 10 && squares[i -width].classList.contains('bomb')) total++
        if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total++
        if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total++
        if (i < 99 && !isLeftEdge && squares[i -1 +width].classList.contains('bombs')) total++
        if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bombs')) total++
        if (i < 89 && squares[i +width].classList.contains('bombs')) total++
        squares[i].setAttribute('data', total)
        console.log(squares[i])
      }
    }







  }
  createBoard()

})