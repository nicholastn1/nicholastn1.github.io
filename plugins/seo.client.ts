// plugins/seo.client.ts
// Add JSON-LD structured data for SEO

export default defineNuxtPlugin(() => {
  // Add Person schema to homepage
  if (import.meta.client) {
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Nicholas Nogueira',
      jobTitle: 'Full Stack Software Engineer',
      url: 'https://nicholastn1.github.io',
      email: 'nicholastimbo2022@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Fortaleza',
        addressRegion: 'Ceará',
        addressCountry: 'Brasil',
      },
      sameAs: [
        'https://github.com/nicholastn1',
        'https://www.linkedin.com/in/nicholastn/',
        'https://www.instagram.com/nicholastn_/',
      ],
      knowsAbout: [
        'Ruby on Rails',
        'Vue.js',
        'React',
        'TypeScript',
        'PostgreSQL',
        'Docker',
        'Full Stack Development',
      ],
    }

    // Only add on homepage
    if (window.location.pathname === '/') {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(personSchema)
      document.head.appendChild(script)
    }
  }
})
