document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  let width = 10
  let squares = []
  let bombAmount = 20
  let isGameOver = false

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

      // normal click
      square.addEventListener('click', function(e) {
        click(square)
      }) 
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
        if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total++
        if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total++
        if (i < 89 && squares[i +width].classList.contains('bomb')) total++
        squares[i].setAttribute('data', total)
      }
    }

  }
  createBoard()

  // click on square actions
  function click(square) {
    let currentId = square.id
    // if gameover nothing happens
    if (isGameOver) return
    // if square has already been checked or flagged nothing happens
    if (square.classList.contains('checked') || square.classList.contains('flag')) return
    // if bomb the game is over
    if (square.classList.contains('bomb')) {
      alert('Game over')
    // total over 0: show number & mark as checked
    } else {
      let total = square.getAttribute('data')
      if (total !=0) {
        square.classList.add('checked')
        square.innerHTML = total
        return
      }
      // anything else --> check neighbors
      checkSquare(square, currentId)
    }
    square.classList.add('checked')
  }

  // check 8 surrounding squares once square is clicked
  function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width -1)
    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1].id
        const newSquare = document.getElementById(newId)
        // go back to click function and do all checks again for the neighbors neighbor
        click(newSquare)
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1 -width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 10) {
        const newId = squares[parseInt(currentId) -width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1 -width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1 +width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1 +width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 89 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) +width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    }, 10)
  }



})