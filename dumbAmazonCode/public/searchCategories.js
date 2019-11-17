function searchCategories() {
	//get the search item 
	var category_name_search_string = document.getElementById('category_name_search_string').value
	//construct the URL and redirect to it
	window.location = '/category/search/' + encodeURI(category_name_search_string)
}