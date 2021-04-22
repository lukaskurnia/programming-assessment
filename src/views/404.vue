<template>
  <div :class="$style.container">
    <p :class="$style.text404">404</p>
    <p :class="$style.text">The page you requested was not found</p>
    <p @click="$router.push({ name: 'Home' })" :class="$style.ctaText">
      Go to Home page
    </p>
  </div>
</template>

<style lang="scss" module>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
}

.text404 {
  font-size: 10rem;
  font-weight: 900;
}

.text {
  font-size: 2rem;
  font-weight: 700;
}

.ctaText {
  cursor: pointer;
  font-size: 1rem;
  color: #01316d;
  text-decoration: underline;
  margin-top: 2rem;
}
</style>
