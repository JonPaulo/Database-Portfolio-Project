function deleteCategories(id) {
	console.log("loc1");
	$.ajax({
		url: '/categories/' + id,
		type: 'DELETE',
		success: function (result) {
			window.location.reload(true);
		}
	})
};