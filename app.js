const { createApp, ref, onMounted } = Vue

createApp({
  setup() {
    const portfolio = {
      name: "Your Name",
      tagline: "Game Developer & Sound Designer",
      skills: [
        { name: "Programming", class: "programming" },
        { name: "Sound Design", class: "sound-design" },
        // Add more skills as needed
      ],
      projects: [
        {
          id: 1,
          title: "Awesome Game 1",
          description: "This is a detailed description of my first game project. I worked on the gameplay mechanics, level design, and implemented the core systems using Unity and C#.",
          skills: [
            { name: "Programming", class: "programming" }
          ],
          media: [
            { type: "image", url: "game1-screenshot1.jpg" },
            { type: "image", url: "game1-screenshot2.jpg" },
            { type: "video", url: "game1-gameplay.mp4" }
          ]
        },
        {
          id: 2,
          title: "Amazing Game 2",
          description: "For this project, I created all the sound effects and music. I collaborated with a team of three developers to bring this atmospheric experience to life.",
          skills: [
            { name: "Sound Design", class: "sound-design" }
          ],
          media: [
            { type: "image", url: "game2-screenshot1.jpg" },
            { type: "video", url: "game2-gameplay.mp4" },
            { type: "image", url: "game2-screenshot2.jpg" }
          ]
        },
        {
          id: 3,
          title: "Cool Game 3",
          description: "A solo project where I handled both development and sound design. This game was featured on itch.io's front page and received positive feedback for its innovative mechanics.",
          skills: [
            { name: "Programming", class: "programming" },
            { name: "Sound Design", class: "sound-design" }
          ],
          media: [
            { type: "image", url: "game3-screenshot1.jpg" },
            { type: "image", url: "game3-screenshot2.jpg" },
            { type: "video", url: "game3-gameplay.mp4" }
          ]
        },
        {
          id: 4,
          title: "Exciting Game 4",
          description: "My most recent project, still in development. I'm implementing advanced physics systems and procedural generation techniques.",
          skills: [
            { name: "Programming", class: "programming" }
          ],
          media: [
            { type: "image", url: "game4-screenshot1.jpg" },
            { type: "video", url: "game4-prototype.mp4" },
            { type: "image", url: "game4-screenshot2.jpg" }
          ]
        }
      ]
    }

    const activeProjectIndex = ref(0)
    const carouselPositions = ref({})

    // Initialize carousel positions for each project
    onMounted(() => {
      portfolio.projects.forEach((_, index) => {
        carouselPositions.value[index] = 0
      })
      
      // Initialize GSAP ScrollTrigger
      setupScrollTriggers()
    })

    const setupScrollTriggers = () => {
      gsap.registerPlugin(ScrollTrigger)
      
      // Create scroll triggers for each project
      portfolio.projects.forEach((_, index) => {
        const projectEl = document.getElementById(`project-${index}`)
        if (!projectEl) return
        
        ScrollTrigger.create({
          trigger: projectEl,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            activeProjectIndex.value = index
          },
          onEnterBack: () => {
            activeProjectIndex.value = index
          }
        })
      })
    }

    const nextSlide = (projectIndex) => {
      const project = portfolio.projects[projectIndex]
      const currentPos = carouselPositions.value[projectIndex] || 0
      const maxPos = (project.media.length - 1) * 100
      
      if (currentPos < maxPos) {
        carouselPositions.value[projectIndex] = currentPos + 100
      } else {
        carouselPositions.value[projectIndex] = 0
      }
    }

    const prevSlide = (projectIndex) => {
      const project = portfolio.projects[projectIndex]
      const currentPos = carouselPositions.value[projectIndex] || 0
      const maxPos = (project.media.length - 1) * 100
      
      if (currentPos > 0) {
        carouselPositions.value[projectIndex] = currentPos - 100
      } else {
        carouselPositions.value[projectIndex] = maxPos
      }
    }

    const scrollToProject = (index) => {
      const projectElement = document.getElementById(`project-${index}`)
      if (projectElement) {
        window.scrollTo({
          top: projectElement.offsetTop - 100,
          behavior: 'smooth'
        })
      }
    }

    return {
      portfolio,
      activeProjectIndex,
      carouselPositions,
      nextSlide,
      prevSlide,
      scrollToProject
    }
  }
}).mount('#app')