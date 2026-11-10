<script setup>
import { computed, ref } from 'vue'

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const board = ref(Array(9).fill(''))
const currentPlayer = ref('X')
const winner = ref('')
const isDraw = computed(() => board.value.every(Boolean) && !winner.value)
const isGameOver = computed(() => Boolean(winner.value) || isDraw.value)
const status = computed(() => {
  if (winner.value) return `${winner.value} wins!`
  if (isDraw.value) return "It's a draw!"
  return `${currentPlayer.value}'s turn`
})

function selectCell(index) {
  if (board.value[index] || isGameOver.value) return

  board.value[index] = currentPlayer.value
  const hasWon = winningCombinations.some((combination) =>
    combination.every((cellIndex) => board.value[cellIndex] === currentPlayer.value),
  )

  if (hasWon) {
    winner.value = currentPlayer.value
  } else if (!isDraw.value) {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

function startGame() {
  board.value = Array(9).fill('')
  currentPlayer.value = 'X'
  winner.value = ''
}
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
    <section class="w-full max-w-md text-center">
      <p class="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
        The classic game
      </p>
      <h1 class="text-4xl font-black tracking-tight sm:text-5xl">Tic Tac Toe</h1>
      <p class="mt-4 min-h-7 text-lg font-medium text-slate-300" aria-live="polite">
        {{ status }}
      </p>

      <div
        class="mx-auto mt-8 grid w-full max-w-xs grid-cols-3 gap-3"
        role="group"
        aria-label="Game board"
      >
        <button
          v-for="(cell, index) in board"
          :key="index"
          class="aspect-square rounded-2xl border border-slate-700 bg-slate-900 text-5xl font-bold transition hover:border-emerald-400 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:hover:border-slate-700 disabled:hover:bg-slate-900"
          :class="cell === 'X' ? 'text-emerald-400' : 'text-sky-400'"
          :aria-label="`Cell ${index + 1}${cell ? `: ${cell}` : ', empty'}`"
          :disabled="Boolean(cell) || isGameOver"
          @click="selectCell(index)"
        >
          {{ cell }}
        </button>
      </div>

      <button
        v-if="isGameOver"
        class="mt-8 rounded-full bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        @click="startGame"
      >
        Play again
      </button>
    </section>

    <a
      class="mt-12 text-sm text-slate-500 underline decoration-slate-700 underline-offset-4 transition hover:text-slate-300"
      href="https://fcortesnila.com/"
      target="_blank"
      rel="noreferrer"
    >
      by Fernando Cortes Nila
    </a>
  </main>
</template>
