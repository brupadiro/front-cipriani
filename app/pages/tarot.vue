<template>
  <div class="min-h-screen bg-gray-900 text-white p-4 sm:p-8 overflow-hidden">
    <h1 class="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-8">Tarot Card Selection</h1>
    
    <!-- Selected Cards List -->
    <transition-group 
      name="selected-list" 
      tag="div" 
      class="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-8"
    >
      <div 
        v-for="card in selectedCards" 
        :key="card.id"
        class="w-24 sm:w-32 md:w-40 lg:w-48 bg-gradient-to-br from-indigo-800 to-purple-800 rounded-lg p-2 sm:p-4 flex flex-col items-center shadow-lg"
      >
        <span class="text-sm sm:text-base font-semibold mb-1 sm:mb-2 truncate w-full text-center">{{ card.name }}</span>
        <span class="text-2xl sm:text-3xl mb-1 sm:mb-2">{{ card.symbol }}</span>
        <button 
          @click="deselectCard(card)" 
          class="text-gray-300 hover:text-white focus:outline-none mt-1 sm:mt-2"
        >
          <XIcon class="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>
    </transition-group>

    <!-- Circular or Semicircular Arrangement of Cards -->
    <div ref="cardContainer" class="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden">
      <transition-group name="card">
        <div 
          v-for="(card, index) in visibleCards" 
          :key="card.id" 
          @click="selectCard(card)"
          class="absolute card-wrapper"
          :style="getCardPosition(index)"
        >
          <div 
            class="w-20 h-32 sm:w-32 sm:h-48 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform origin-center"
            :class="{ 'ring-2 sm:ring-4 ring-purple-500': card.selected }"
            :style="getCardStyle(card)"
          >
            <div class="h-full w-full bg-gradient-to-br from-indigo-900 to-purple-900 p-2 sm:p-4 flex flex-col justify-between backface-hidden">
              <div class="text-xs sm:text-sm md:text-base font-semibold truncate">{{ card.name }}</div>
              <div class="text-2xl sm:text-3xl md:text-4xl text-center my-1 sm:my-2">{{ card.symbol }}</div>
              <div class="text-[8px] sm:text-xs text-gray-300 truncate">{{ card.meaning }}</div>
            </div>
            <div class="absolute inset-0 bg-indigo-800 backface-hidden" :style="{ transform: 'rotateY(180deg)' }"></div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { XIcon } from 'lucide-vue-next'

const tarotCards = ref([
  { id: 0, name: 'The Fool', symbol: '🃏', meaning: 'New beginnings, innocence', selected: false, flying: true },
  { id: 1, name: 'The Magician', symbol: '🎩', meaning: 'Manifestation, resourcefulness', selected: false, flying: true },
  { id: 2, name: 'The High Priestess', symbol: '🌙', meaning: 'Intuition, sacred knowledge', selected: false, flying: true },
  { id: 3, name: 'The Empress', symbol: '👑', meaning: 'Fertility, nurturing', selected: false, flying: true },
  { id: 4, name: 'The Emperor', symbol: '⚔️', meaning: 'Authority, structure', selected: false, flying: true },
  { id: 5, name: 'The Hierophant', symbol: '🔑', meaning: 'Tradition, conformity', selected: false, flying: true },
  { id: 6, name: 'The Lovers', symbol: '❤️', meaning: 'Partnerships, duality', selected: false, flying: true },
  { id: 7, name: 'The Chariot', symbol: '🏎️', meaning: 'Control, willpower', selected: false, flying: true },
  { id: 8, name: 'Strength', symbol: '🦁', meaning: 'Courage, compassion', selected: false, flying: true },
  { id: 9, name: 'The Hermit', symbol: '🏔️', meaning: 'Introspection, solitude', selected: false, flying: true },
  { id: 10, name: 'Wheel of Fortune', symbol: '🎡', meaning: 'Fate, cycles', selected: false, flying: true },
  { id: 11, name: 'Justice', symbol: '⚖️', meaning: 'Fairness, truth', selected: false, flying: true },
  { id: 12, name: 'The Hanged Man', symbol: '🙃', meaning: 'Surrender, new perspective', selected: false, flying: true },
  { id: 13, name: 'Death', symbol: '🦋', meaning: 'Endings, transformation', selected: false, flying: true },
  { id: 14, name: 'Temperance', symbol: '☯️', meaning: 'Balance, moderation', selected: false, flying: true },
  { id: 15, name: 'The Devil', symbol: '😈', meaning: 'Addiction, materialism', selected: false, flying: true },
  { id: 16, name: 'The Tower', symbol: '🗼', meaning: 'Sudden change, revelation', selected: false, flying: true },
  { id: 17, name: 'The Star', symbol: '⭐', meaning: 'Hope, inspiration', selected: false, flying: true },
  { id: 18, name: 'The Moon', symbol: '🌕', meaning: 'Illusion, intuition', selected: false, flying: true },
  { id: 19, name: 'The Sun', symbol: '☀️', meaning: 'Joy, success', selected: false, flying: true },
  { id: 20, name: 'Judgement', symbol: '🎺', meaning: 'Rebirth, inner calling', selected: false, flying: true },
  { id: 21, name: 'The World', symbol: '🌍', meaning: 'Completion, integration', selected: false, flying: true },
])

const cardContainer = ref(null)
const containerSize = ref({ width: 0, height: 0 })
const isMobile = ref(false)

const visibleCards = computed(() => tarotCards.value.filter(card => !card.selected))
const selectedCards = computed(() => tarotCards.value.filter(card => card.selected))

const maxVisibleCards = computed(() => {
  const containerWidth = containerSize.value.width
  const containerHeight = containerSize.value.height
  const cardWidth = isMobile.value ? 80 : 128 // 20px * 4 for mobile, 32px * 4 for desktop
  const cardHeight = isMobile.value ? 128 : 192 // 32px * 4 for mobile, 48px * 4 for desktop
  const visibleWidth = isMobile.value ? cardWidth : cardWidth / 3 // Full card visible on mobile

  // Calculate the number of cards that can fit in the circle or semicircle
  const circumference = isMobile.value ? Math.PI * 2 * Math.min(containerWidth, containerHeight) / 2 : Math.PI * Math.min(containerWidth, containerHeight)
  const maxCards = Math.floor(circumference / visibleWidth)

  // Limit the number of cards to the available unselected cards
  return Math.min(maxCards, visibleCards.value.length)
})

const selectCard = (card) => {
  card.selected = true
  card.flying = true
  setTimeout(() => {
    card.flying = false
  }, 500)
}

const deselectCard = (card) => {
  card.selected = false
  card.flying = true
  setTimeout(() => {
    card.flying = false
  }, 500)
}

const getCardPosition = (index) => {
  const totalCards = maxVisibleCards.value
  const angle = isMobile.value
    ? (index / totalCards) * 360
    : (index / (totalCards - 1)) * 180
  const radius = Math.min(containerSize.value.width, containerSize.value.height) / 2 - (isMobile.value ? 64 : 96)
  const x = Math.cos((angle - 90) * Math.PI / 180) * radius
  const y = Math.sin((angle - 90) * Math.PI / 180) * radius
  return {
    transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
    zIndex: totalCards - index
  }
}

const getCardStyle = (card) => {
  if (card.flying) {
    return card.selected
      ? { transform: 'translate(-50%, -200%) rotate(720deg)', opacity: 0 }
      : { transform: 'translate(100vw, 0) rotate(720deg)', opacity: 0 }
  }
  return {
    transform: 'rotateY(0deg)',
    opacity: 1,
  }
}

const updateContainerSize = () => {
  if (cardContainer.value) {
    const rect = cardContainer.value.getBoundingClientRect()
    containerSize.value = { width: rect.width, height: rect.height }
    isMobile.value = window.innerWidth < 640
  }
}

onMounted(() => {
  updateContainerSize()
  window.addEventListener('resize', updateContainerSize)

  setTimeout(() => {
    tarotCards.value.forEach((card, index) => {
      setTimeout(() => {
        card.flying = false
      }, index * 100)
    })
  }, 500)
})

watch(visibleCards, updateContainerSize)
</script>

<style scoped>
.card-wrapper {
  transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-style: preserve-3d;
}

.card-wrapper:hover {
  z-index: 100;
}

.selected-list-enter-active,
.selected-list-leave-active {
  transition: all 0.5s ease;
}

.selected-list-enter-from,
.selected-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.card-move {
  transition: all 0.5s ease;
}

.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(50px) scale(0.5);
}

.backface-hidden {
  backface-visibility: hidden;
}
</style>