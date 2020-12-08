let filter_by_data_type = 'title';
window.onload = function() {
    hide_stuff();
};

function insert_after(new_node, reference_node) {
    reference_node.parentNode.insertBefore(new_node, reference_node.nextSibling);
}

function toggle_info(element) {
    let book = element.parentNode;
    let info = book.parentNode.querySelector('#instantiated_info_block');
    if (info) {
	info.remove();
    } else {
	let info_text = book.querySelector('#book_box_info_storage').innerHTML;
	let info_block_template = document.querySelector("#info_block_template");
	var new_item = info_block_template.cloneNode(true);
	new_item.classList.remove("hide_element");
	new_item.id = "instantiated_info_block";
	if (!(info_text === "None")) {
	    new_item.querySelector('#info_text').innerHTML = info_text;
	}
	insert_after(new_item, book);
    }
}

function filter_books() {
    let input = document.getElementById("user_search_input").value.toUpperCase();
    let books = document.querySelector(".container").firstElementChild.children;
    var language_checked = {
	"FRENCH": document.querySelector("#checkbox_french").checked,
	"BULGARIAN": document.querySelector("#checkbox_bulgarian").checked,
	"JAPANESE": document.querySelector("#checkbox_japanese").checked
    };

    for (let i=0; i<books.length; ++i) {
	let book = books[i];
	let box = book.firstElementChild;
	let book_lang = box.querySelector(".book_language").textContent.toUpperCase();
	let text;
	if (filter_by_data_type === "author") {
	    text = box.querySelector(".book_box_header").textContent.toUpperCase();
	} else if (filter_by_data_type === "title") {
	    text = box.querySelector(".book_box_body").textContent.toUpperCase();
	} else if (filter_by_data_type === "year") {
	    text = box.querySelector(".book_read_year").textContent.toUpperCase();
	} else if (filter_by_data_type === "genre") {
	    text = box.querySelector(".book_genre").textContent.toUpperCase();
	}
	if (!language_checked[book_lang]) {
	    book.classList.add("hide_element");
	} else {
            if (normalize_string(text).includes(normalize_string(input))) {
		book.classList.remove("hide_element");
	    } else {
		book.classList.add("hide_element");
	    }
	}
    }
}

// https://stackoverflow.com/a/51874002
function normalize_string(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function hide_stuff(genre) {
    let books = document.querySelector(".container").firstElementChild.children;
    for (let i=0; i<books.length; ++i) {
	let box = books[i].firstElementChild;
	let genre = box.querySelector(".book_genre");
	let text = genre.textContent.toUpperCase();
	if (genre.textContent === "genre: None") {
	    genre.classList.add("hide_element");
	}
	let volume = box.querySelector(".volume");
	text = genre.textContent.toUpperCase();
	if (volume.textContent === "(None)") {
	    volume.classList.add("hide_element");
	}
    }
}
