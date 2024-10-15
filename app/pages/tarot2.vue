<template>
    <div class="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-gray-100 font-mystical">
      <header class="py-4 px-6 bg-black bg-opacity-50 fixed w-full z-50">
        <nav class="flex justify-between items-center">
          <div class="text-2xl font-bold text-purple-300">Mystic Insights</div>
          <button class="text-purple-300" @click="toggleMenu">
            <MenuIcon v-if="!isMenuOpen" class="h-6 w-6" />
            <XIcon v-else class="h-6 w-6" />
          </button>
        </nav>
        <transition name="fade">
          <ul v-if="isMenuOpen" class="mt-4 space-y-2">
            <li v-for="item in menuItems" :key="item.href">
              <a :href="item.href" class="block py-2 text-purple-300 hover:text-purple-100 transition-colors" @click="closeMenu">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </transition>
      </header>
  
      <main class="pt-16">
        <!-- Hero Section -->
        <section class="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
          <div class="absolute inset-0 bg-cover bg-center z-0 opacity-20" style="background-image: url('/placeholder.svg?height=1080&width=1920');"></div>
          <div class="relative z-10 text-center">
            <h1 class="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
              Unlock Your Destiny
            </h1>
            <p class="text-xl mb-8 text-purple-200">Discover the wisdom of the cards and the secrets of the stars</p>
            <button @click="scrollToContact" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 animate-float">
              Reveal Your Future
            </button>
          </div>
          <div class="absolute inset-0 pointer-events-none">
            <div v-for="star in stars" :key="star.id" :style="starStyle(star)" class="absolute rounded-full bg-white animate-twinkle"></div>
          </div>
          <div class="absolute bottom-8 left-0 right-0 flex justify-center">
            <ChevronDownIcon @click="scrollToServices" class="h-10 w-10 text-purple-300 animate-bounce cursor-pointer" />
          </div>
        </section>
  
        <!-- Services Section -->
        <section id="services" class="py-16 px-6 bg-black bg-opacity-50">
          <h2 class="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Mystical Services</h2>
          <div class="space-y-8">
            <div v-for="service in services" :key="service.title" class="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-6 transform transition duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50">
              <component :is="service.icon" class="h-12 w-12 text-purple-400 mb-4 mx-auto" />
              <h3 class="text-xl font-bold mb-2 text-center text-purple-300">{{ service.title }}</h3>
              <p class="text-purple-100 text-center">{{ service.description }}</p>
            </div>
          </div>
        </section>
  
        <!-- Testimonials Section -->
        <section id="testimonials" class="py-16 px-6 bg-black bg-opacity-30">
          <h2 class="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Ethereal Experiences</h2>
          <div class="max-w-4xl mx-auto">
            <swiper
              :slides-per-view="1"
              :loop="true"
              :effect="'cards'"
              :autoplay="{ delay: 5000, disableOnInteraction: false }"
              :pagination="{ clickable: true }"
            >
              <swiper-slide v-for="testimonial in testimonials" :key="testimonial.name">
                <div class="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-8 text-center shadow-lg">
                  <p class="text-lg mb-4 text-purple-100">"{{ testimonial.quote }}"</p>
                  <p class="font-bold text-purple-300">{{ testimonial.name }}</p>
                  <p class="text-purple-400">{{ testimonial.location }}</p>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </section>
  
        <!-- Contact Section -->
        <section id="contact" class="py-16 px-6 bg-black bg-opacity-50">
          <h2 class="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Connect with the Cosmos</h2>
          <form @submit.prevent="submitForm" class="max-w-lg mx-auto space-y-6">
            <div>
              <label for="name" class="block mb-2 text-purple-300">Your Name</label>
              <input v-model="form.name" type="text" id="name" required class="w-full px-4 py-2 bg-purple-900 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-100 placeholder-purple-300">
            </div>
            <div>
              <label for="email" class="block mb-2 text-purple-300">Your Email</label>
              <input v-model="form.email" type="email" id="email" required class="w-full px-4 py-2 bg-purple-900 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-100 placeholder-purple-300">
            </div>
            <div>
              <label for="message" class="block mb-2 text-purple-300">Your Message</label>
              <textarea v-model="form.message" id="message" required rows="4" class="w-full px-4 py-2 bg-purple-900 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-100 placeholder-purple-300"></textarea>
            </div>
            <button type="submit" class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              Send to the Stars
            </button>
          </form>
        </section>
      </main>
  
      <footer class="bg-black bg-opacity-50 py-6 px-6 text-center">
        <div class="flex justify-center space-x-6 mb-4">
          <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:text-purple-300 transition-colors">
            <component :is="social.icon" class="h-6 w-6" />
            <span class="sr-only">{{ social.name }}</span>
          </a>
        </div>
        <p class="text-purple-300">&copy; 2023 Mystic Insights. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, onUnmounted } from 'vue'
  import { MenuIcon, XIcon, ChevronDownIcon, StarIcon, FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-vue-next'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'
  import 'swiper/css/pagination'
  import 'swiper/css/effect-cards'
  
  const isMenuOpen = ref(false)
  const menuItems = [
    { href: '#services', text: 'Services' },
    { href: '#testimonials', text: 'Testimonials' },
    { href: '#contact', text: 'Contact' }
  ]
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }
  
  const closeMenu = () => {
    isMenuOpen.value = false
  }
  definePageMeta({
    layout:'empty'
  })
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
  }
  
  const scrollToServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' })
  }
  
  const services = [
    {
      title: 'Tarot Readings',
      description: 'Unveil the mysteries of your past, present, and future through the ancient wisdom of tarot.',
    },
    {
      title: 'Astrology Charts',
      description: 'Discover how celestial bodies influence your life path and personal growth.',
      icon: StarIcon
    },
    {
      title: 'Crystal Ball Gazing',
      description: 'Peer into the mists of time and space with our skilled seers.',
    },
    {
      title: 'Palm Reading',
      description: 'Uncover the secrets written in the lines of your hand and glimpse your destiny.',
    },
    {
      title: 'Aura Cleansing',
      description: 'Purify your energy field and restore balance to your spirit with our mystical techniques.',
    },
    {
      title: 'Spiritual Coaching',
      description: 'Embark on a transformative journey of self-discovery and spiritual awakening.',
    }
  ]
  
  const testimonials = [
    {
      quote: "The tarot reading I received was eerily accurate. It's as if the reader could see right through me!",
      name: "Sarah M.",
      location: "New York, NY"
    },
    {
      quote: "My astrology consultation was truly eye-opening. I now understand my life's purpose with crystal clarity.",
      name: "John D.",
      location: "Los Angeles, CA"
    },
    {
      quote: "The crystal ball session was otherworldly. I felt connected to energies beyond this realm.",
      name: "Emily R.",
      location: "London, UK"
    }
  ]
  
  const form = reactive({
    name: '',
    email: '',
    message: ''
  })
  
  const submitForm = () => {
    console.log('Form submitted:', form)
    form.name = ''
    form.email = ''
    form.message = ''
    alert('Your message has been sent to the cosmos. We will respond soon!')
  }
  
  const socials = [
    { name: 'Facebook', icon: FacebookIcon, url: 'https://facebook.com' },
    { name: 'Twitter', icon: TwitterIcon, url: 'https://twitter.com' },
    { name: 'Instagram', icon: InstagramIcon, url: 'https://instagram.com' }
  ]
  
  // Enhanced animations for the hero section
  const stars = ref([])
  const generateStars = () => {
    stars.value = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      animationDelay: Math.random() * 3
    }))
  }
  
  const starStyle = (star) => {
    return {
      left: `${star.x}%`,
      top: `${star.y}%`,
      width: `${star.size}px`,
      height: `${star.size}px`,
      animationDelay: `${star.animationDelay}s`
    }
  }
  
  onMounted(() => {
    generateStars()
    window.addEventListener('resize', generateStars)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', generateStars)
  })
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:wght@300;400;600&display=swap');
  
  .font-mystical {
    font-family: 'Cormorant Garamond', serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Cinzel', serif;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-twinkle {
    animation: twinkle 2s ease-in-out infinite;
  }
  
  .swiper-pagination-bullet {
    background-color: theme('colors.purple.400') !important;
  }
  
  .swiper-pagination-bullet-active {
    background-color: theme('colors.purple.300') !important;
  }
  </style>