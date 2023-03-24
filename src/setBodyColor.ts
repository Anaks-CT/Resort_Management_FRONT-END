export default function setBodyColor({color}: any) {
    document.documentElement.style.setProperty('--bodyColor', color)
}