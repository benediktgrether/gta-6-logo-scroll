import './style.css'
import { logoData } from './components/logo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const heroImgContainer = document.querySelector('.hero-img-container');
  const heroImgLogo = document.querySelector('.hero-img-logo');

  const faceOverlay = document.querySelector('.face-overlay');
  const svgOverlay = document.querySelector('.overlay');
  const overlayCopy = document.querySelector('h1');



  const initialOverlayScale = 350;
  const logoContainer = document.querySelector('.logo-container');
  const logoMask = document.getElementById('logo-mask');



  console.log(logoMask);

  logoMask.setAttribute('d', logoData);

  const logoDimensions = logoContainer.getBoundingClientRect();
  const logoBoundingBox = logoMask.getBBox();

  const horizontalScaleRotation = logoDimensions.width / logoBoundingBox.width;

  const verticalScaleRotation = logoDimensions.height / logoBoundingBox.height;

  const logoScaleFactor = Math.min(horizontalScaleRotation, verticalScaleRotation);

  const logoHorizontalPosition = logoDimensions.left + (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 - logoBoundingBox.x * logoScaleFactor;

  const logoVerticalPosition = logoDimensions.top + (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 - logoBoundingBox.y * logoScaleFactor;

  logoMask.setAttribute('transform', `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`);

  // https://youtu.be/lh5fQIlyOe0?si=WshI7krnNKUIN26v&t=651
});