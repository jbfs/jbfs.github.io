let FILTER_CRITERION = 'title';
window.onload = function() {
    hide_stuff();
    document.querySelector("#checkbox_french").checked = true;
    document.querySelector("#checkbox_bulgarian").checked = true;
    document.querySelector("#checkbox_japanese").checked = true;
};

function filter_by_data_type(value) {
    FILTER_CRITERION = value;
    filter_books();
}

function toggle_info(element) {
    let book = element.parentNode;
    let info = book.parentNode.querySelector('#instantiated_info_block');
    if (info) {
	info.remove();
    } else {
	let info_text = book.querySelector('#book_box_info_storage').textContent;
	let conv = new showdown.Converter();
	info_text = conv.makeHtml(info_text);
	let info_block_template = document.querySelector("#info_block_template");
	let new_item = info_block_template.cloneNode(true);
	new_item.classList.remove("hide_element");
	new_item.id = "instantiated_info_block";
	if (!(info_text === "<p>None</p>")) {
	    new_item.querySelector('#info_text').innerHTML = info_text;
	}
	insert_after(new_item, book);
    }
}

function filter_books() {
    let input = document.getElementById("user_search_input").value.toUpperCase();
    let books = document.querySelector(".container").firstElementChild.children;
    let language_checked = {
	"FRENCH": document.querySelector("#checkbox_french").checked,
	"BULGARIAN": document.querySelector("#checkbox_bulgarian").checked,
	"JAPANESE": document.querySelector("#checkbox_japanese").checked
    };

    for (let i=0; i<books.length; ++i) {
	let book = books[i];
	let box = book.firstElementChild;
	let text;
	if      (FILTER_CRITERION === "author") {text = ".book_box_header"}
	else if (FILTER_CRITERION === "title")  {text = ".book_box_body"}
	else if (FILTER_CRITERION === "year")   {text = ".book_read_year"}
	else if (FILTER_CRITERION === "genre")  {text = ".book_genre"}
	text = box.querySelector(text).textContent.toUpperCase();

	let book_lang = box.querySelector(".book_language").textContent.toUpperCase();
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

function insert_after(new_node, reference_node) {
    reference_node.parentNode.insertBefore(new_node, reference_node.nextSibling);
}

// https://stackoverflow.com/a/51874002
function normalize_string(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
