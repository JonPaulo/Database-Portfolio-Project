function updateAccount(id) {
	$.ajax({
		url: '/account/',
		type: 'PUT',
		data: $('#update-account').serialize(),
		success: function (result) {
			window.location.replace("./account");
		}
	})
};
