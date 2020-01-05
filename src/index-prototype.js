import "./index.scss";

function Slider(slider) {
	if (!(slider instanceof Element)) {
		throw new Error("No slider passsed in")
	}

	// select elements needed for slider
	this.slides = slider.querySelector(".slides")
	this.slider = slider
	const prevButton = slider.querySelector(".goToPrev")
	const nextButton = slider.querySelector(".goToNext")

	this.startSlider()
	this.applyClasses()

	// event listeners
	// if you need to pass arg to func, use arrow func
	prevButton.addEventListener("click", () => this.move("back"))
	nextButton.addEventListener("click", () => this.move())
}

Slider.prototype.startSlider = function () {
	this.current = this.slider.querySelector(".current") || this.slides.firstElementChild
	this.prev = this.current.previousElementSibling || this.slides.lastElementChild
	this.next = this.current.nextElementSibling || this.slides.firstElementChild
	// console.log("prev, current, next: ", prev, current, next)
}

Slider.prototype.applyClasses = function () {
	this.prev.classList.add("prev")
	this.current.classList.add("current")
	this.next.classList.add("next")
}

Slider.prototype.move = function (direction) {
	// remove all the classes of the current slides
	const classesToRemove = ["prev", "current", "next"]
	this.prev.classList.remove(...classesToRemove)
	this.current.classList.remove(...classesToRemove)
	this.next.classList.remove(...classesToRemove)
	// OR [prev, current, next].forEach(el => el.classList.remove(...classesToRemove))

	if (direction === "back") {
		// make new arr of the new values and destructure them over and into the prev, current and next variables
		// 1st el in arr will be prev, 2nd = current, 3rd = next
		[this.prev, this.current, this.next] = [
			// get prev slide, if there is none, get the last slide from entire slider
			this.prev.previousElementSibling || this.slides.lastElementChild,
			this.prev,
			this.current
		]
	} else {
		[this.prev, this.current, this.next] = [
			this.current,
			this.next,
			// get the next slide or if it's at the end loop around and grab the first slide
			this.next.nextElementSibling || this.slides.firstElementChild
		]
	}

	this.applyClasses()
}

const mySlider = new Slider(document.querySelector(".slider"))
const dogSlider = new Slider(document.querySelector(".dog-slider"))
// console.log("mySlider: ", mySlider)
// console.log("dogSlider: ", dogSlider)

window.dogSlider = dogSlider

window.addEventListener("keyup", function (e) {
	if (e.key === "ArrowRight") {
		dogSlider.move()
	}
	if (e.key === "ArrowLeft") {
		dogSlider.move("back")
	}
})