"""HTML templates."""
TEMPLATES = dict()

# variables: books
TEMPLATES['body'] = r"""<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <link rel="shortcut icon" type="image/x-icon" href="icons/favicon.png">
    <link rel="stylesheet" href="./bootstrap.min.css">
    <link rel="stylesheet" href="style.css" type="text/css"/>
    <script src="script.js" type="text/javascript"></script>
    <script src="showdown.min.js" type="text/javascript"></script>
  </head>
  <body>
    <input id="user_search_input" onkeyup="filter_books()" oninput="filter_books()" type="search" placeholder="Search for books ...">
    <select id="user_search_category" onchange="filter_by_data_type(this.value)" onfocus="this.selectedIndex=-1;">
      <option>title</option>
      <option>author</option>
      <option>year</option>
      <option>genre</option>
    </select>
    <h1>Mes livres</h1>
    <div class="languages">
      <div class="language_box">
        <input type="checkbox" id="checkbox_french" onchange="filter_books()" checked>
        <label for="japanese" vertical-align:"top">Français
          <img src="icons/france-flag.png" alt="JP" width="25" height="25">
        </label>
      </div>
      <div class="language_box">
        <input type="checkbox" id="checkbox_japanese" onchange="filter_books()" checked>
        <label for="japanese" vertical-align:"top">日本語
          <img src="icons/japan-flag.png" alt="JP" width="25" height="25">
        </label>
      </div>
      <div class="language_box">
        <input type="checkbox" id="checkbox_bulgarian" onchange="filter_books()" checked>
        <label for="japanese" vertical-align:"top">Български
          <img src="icons/bulgaria-flag.png" alt="JP" width="25" height="25">
        </label>
      </div>
    </div>
    <div class="container">
      <div class="row">{books}
      </div>
    </div>
  </body>
</html>
"""

# variables: title, volume, author, year, genre, language
TEMPLATES['book'] = r"""
        <div class="col-md-4">
          <div class="book_box">
            <div class="book_box_header">{author}
              <div class="binder_hole"></div>
            </div>
            <div class="book_box_body">{title}
              <div class="volume">({volume})</div>
            </div>
            <a onclick="toggle_info(this)" href="#!">
              <div class="book_box_footer">
                <div class="book_genre"><i>genre:</i> {genre}</div>
                <div class="book_read_year"><i>year:</i> {year}</div>
                <div class="book_language hide_element">{language}</div>
                <div class="book_info_indicator hide_element">info</div>
              </div>
            </a>
            <div id="book_box_info_storage" class="hide_element">{info}</div>
          </div>
        </div>"""

TEMPLATES['info'] = r"""
<div id="info_block_template" class="hide_element">
  <div class="book_box">
    <div id="info_text" class="info_text_body">...</div>
  </div>
</div>"""
