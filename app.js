// Movie Class
// Store Rating and Title
// Methods pertaining to each individual movie
class Movie {
	constructor() {
		this.title = this.getMovieTitle();
		this.rating = this.getMovieRating();

		this.ratingHTML = "<span class='fa fa-star text-warning'></span>\n";
		for (let i = 1; i < 5; i++) {
			if (i < parseInt(this.rating)) {
				this.ratingHTML += "<span class='fa fa-star text-warning'></span>\n";
			} else {
				this.ratingHTML += "<span class='fa fa-star'></span>\n";
			}
		}
	}

	createMovieCard() {
		this.checkFormCompletion();
		if (this.hasValidRating() && this.hasValidTitle()) {
			this.createCardHTML();
			$("#movie-title").val("");
			$("#no-title-alert").remove();
			$("#no-rating-alert").remove();
		}
	}

	checkFormCompletion() {
		if (!this.hasValidRating()) {
			$("#no-rating-alert").remove();
			$("<div id='no-rating-alert'>")
				.text("Select a movie rating!")
				.addClass("alert alert-danger text-center")
				.prependTo($("#movies"));
		}
		if (!this.hasValidTitle()) {
			$("#no-title-alert").remove();
			$("<div id='no-title-alert'>")
				.text("Include a movie title with more than two characters!")
				.addClass("alert alert-danger text-center")
				.prependTo($("#movies"));
		}
	}

	createCardHTML() {
		const newLi = $(`
			<li class="list-group-item d-flex justify-content-between align-items-center">
				<span>
					<button type="button" class="remove-movie btn btn-sm btn-outline-danger pt-0 pb-0 pl-1 pr-1">
						<i class="fa-solid fa-xmark"></i>
					</button>
					<span>&nbsp ${this.title}</span>
				</span>
				<span class="badge badge-pill">${this.ratingHTML}</span>
			</li>
		  	`);
		$("#movie-list").append(newLi);
	}

	getMovieTitle() {
		return $("#movie-title").val();
	}

	getMovieRating() {
		return $("input[type=radio][name=movie-rating]:checked").val();
	}

	hasValidTitle() {
		const array = [...this.title];
		return array.length > 2;
	}

	hasValidRating() {
		return this.rating !== undefined;
	}
}

function onFormSubmit(event) {}

// When the form is submitted
$("form").on("submit", (event) => {
	event.preventDefault();
	const newMovie = new Movie();
	newMovie.createMovieCard();
});

$("#movie-list").on("click", ".remove-movie", (event) => {
	$(event.currentTarget).parent().parent().remove();
});
