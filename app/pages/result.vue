<template>
    <div class="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-gray-100 font-mystical">
      <header class="py-4 px-6 bg-black bg-opacity-50 fixed w-full z-50">
        <nav class="flex justify-between items-center">
          <div class="text-2xl font-bold text-purple-300">Mystic Insights</div>
          <button @click="goBack" class="text-purple-300">
            <ArrowLeftIcon class="h-6 w-6" />
          </button>
        </nav>
      </header>
  
      <main class="pt-20 px-4 pb-12">
        <h1 class="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Your Tarot Reading
        </h1>
  
        <div class="space-y-8">
          <div v-for="(card, index) in selectedCards" :key="index" class="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-6 shadow-lg">
            <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div class="w-48 h-80 bg-purple-800 rounded-lg shadow-inner overflow-hidden transform transition-transform duration-500 hover:scale-105">
                <img :src="card.image" :alt="card.name" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold mb-2 text-purple-300">{{ card.name }}</h2>
                <p class="text-purple-100 mb-4">{{ card.meaning }}</p>
                <p class="text-sm text-purple-200 italic">{{ card.interpretation }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="mt-12 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-6 shadow-lg">
          <h2 class="text-2xl font-bold mb-4 text-center text-purple-300">Your Fortune</h2>
          <p class="text-purple-100 text-center">{{ fortune }}</p>
        </div>
  
        <button @click="newReading" class="mt-8 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
          Get a New Reading
        </button>
      </main>
  
      <footer class="bg-black bg-opacity-50 py-4 px-6 text-center">
        <p class="text-purple-300">&copy; 2023 Mystic Insights. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ArrowLeftIcon } from 'lucide-vue-next'
  
  const selectedCards = ref([
    {
      name: "The Fool",
      image: "/placeholder.svg?height=320&width=192",
      meaning: "New beginnings, innocence, spontaneity",
      interpretation: "You are at the start of a new journey. Embrace the unknown with an open heart."
    },
    {
      name: "The Magician",
      image: "/placeholder.svg?height=320&width=192",
      meaning: "Manifestation, resourcefulness, power",
      interpretation: "You have all the tools you need to succeed. Trust in your abilities."
    },
    {
      name: "The High Priestess",
      image: "/placeholder.svg?height=320&width=192",
      meaning: "Intuition, sacred knowledge, divine feminine",
      interpretation: "Listen to your inner voice. Your intuition will guide you to hidden truths."
    }
  ])
  
  const fortune = ref("The cards reveal a time of great potential and spiritual growth. You are embarking on a new journey with the innocence and excitement of The Fool. The Magician reminds you that you possess all the skills and resources needed to manifest your desires. The High Priestess urges you to trust your intuition and delve deeper into your subconscious. This combination suggests that by balancing your practical abilities with your inner wisdom, you will uncover profound insights and achieve remarkable success in your endeavors. Stay open to the mysteries of life, and let your inner light guide you through this transformative period.")
  
  const goBack = () => {
    // In a real application, this would navigate back to the previous page
    console.log("Navigating back...")
  }
  
  const newReading = () => {
    // In a real application, this would trigger a new tarot reading
    console.log("Starting a new reading...")
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:wght@300;400;600&display=swap');
  
  .font-mystical {
    font-family: 'Cormorant Garamond', serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Cinzel', serif;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  </style>