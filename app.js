const { ref, createApp } = Vue
createApp({
  setup() {
        const grid = ref([])
        const message = ref('')
        const x_turn = ref(true)
        const gameOver = ref(false)
        let i = 0
     
       const startGame = () => {
         message.value = " "
         gameOver.value = false
         grid.value = []
         for (i = 0; i < 9; i++) {
             grid.value.push({id:i,class:' ', used:false},)
           }
         }
     
       startGame()
     
     const winCombinations = [
       [0, 1, 2],[3, 4, 5],[6, 7, 8],
       [0, 3, 6],[1, 4, 7],[2, 5, 8],
       [0, 4, 8],[2, 4, 6]
     ]
     
     const selection = index => {
       if(!grid.value[index].used && !gameOver.value){
           grid.value[index].used = true
           hoverClass(index)
     
           if( checkWin( grid.value[index].class )){
              printMessage(grid.value[index].class) 
              gameOver.value = true
             }
           else if(isDraw()) {
               printMessage("Draw") 
               gameOver.value = true
           }
           else{
             swapTurns()
           }
       }
     }
     
     const swapTurns = () => {
       x_turn.value = !x_turn.value
     }
     
     const printMessage = ( result ) => {
       switch (result) {
         case 'x':
               message.value = 'The winner is X!'
           break;
         case 'circle':
               message.value = 'The winner is O!'
           break;
         default:
               message.value = 'It is a draw!'
           break;
       }
     }
     
     const hoverClass = el => {
         if(x_turn.value){ grid.value[el].class='x' }
           else{ grid.value[el].class = 'circle'}
     }
     
     const isDraw = () => {
       return [...grid.value].every(cell => {
       return cell.class == 'circle' || cell.class == 'x'
       })
     }
     
     const checkWin = (currentClass) => {
       return winCombinations.some(combination => {
         return combination.every(index => {
           return grid.value[index].class == currentClass
           })
         })
       }
     
     return{grid, selection, startGame, x_turn, message, gameOver}
    }
}).mount('#app')


