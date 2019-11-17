function updateCategories(id) {
	console.log("loc3");
	$.ajax({
		url: '/categories/' + id,
		type: 'PUT',
		data: $('#update-categories').serialize(),
		success: function (result) {
			window.location.replace("./");
		}
	})
};