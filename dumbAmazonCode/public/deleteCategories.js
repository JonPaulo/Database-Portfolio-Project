function deleteCategories(id) {
	$.ajax({
		url: '/categories/' + id,
		type: 'DELETE',
		success: function (result) {
			window.location.reload(true);
		}
	})
};