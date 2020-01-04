import "./index.scss";

function Slider(slider) {
	if (!(slider instanceof Element)) {
		throw new Error("No slider passsed in")
	}

	// create some variables for working with the slider 
	let prev
	let current
	let next

	// select elements needed for slider
	const slides = slider.querySelector(".slides")
	const prevButton = slider.querySelector(".goToPrev")
	const nextButton = slider.querySelector(".goToNext")

	function startSlider() {
		current = slider.querySelector(".current") || slides.firstElementChild
		prev = current.previousElementSibling || slides.lastElementChild
		next = current.nextElementSibling || slides.firstElementChild
		// console.log("prev, current, next: ", prev, current, next)
	}

	function applyClasses() {
		prev.classList.add("prev")
		current.classList.add("current")
		next.classList.add("next")
	}

	function move(direction) {
		// remove all the classes of the current slides
		const classesToRemove = ["prev", "current", "next"]
		prev.classList.remove(...classesToRemove)
		current.classList.remove(...classesToRemove)
		next.classList.remove(...classesToRemove)
		// OR [prev, current, next].forEach(el => el.classList.remove(...classesToRemove))

		if (direction === "back") {
			// make new arr of the new values and destructure them over and into the prev, current and next variables
			// 1st el in arr will be prev, 2nd = current, 3rd = next
			[prev, current, next] = [
				// get prev slide, if there is none, get the last slide from entire slider
				prev.previousElementSibling || slides.lastElementChild,
				prev,
				current
			]
		} else {
			[prev, current, next] = [
				current,
				next,
				// get the next slide or if it's at the end loop around and grab the first slide
				next.nextElementSibling || slides.firstElementChild
			]
		}

		applyClasses()
	}

	startSlider()
	applyClasses()

	// event listeners
	// if you need to pass arg to func, use arrow func
	prevButton.addEventListener("click", () => move("back"))
	nextButton.addEventListener("click", move)
}

const mySlider = Slider(document.querySelector(".slider"))
const dogSlider = Slider(document.querySelector(".dog-slider"))
